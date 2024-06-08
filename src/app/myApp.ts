import { checkHasInstall, launchApp, passAndroidPermission, awaitActivity, tapBtn, getClientSize, inputText, checkActivity, setWmSize, grantApp } from "../adb/adb";
import { uploadPic } from '../adb/photo';
import { execCmd, formateTime, sleep } from "../utils/index";
import { ActivitysMap, MAIN_BTN_POSITION, getRealPositionSize, baseSize } from '../config/task-config';
import { DeviceInfo, MainProps } from '../typings/global'

class MyAppBridge {
  apk = '';
  apkName = '';
  devices: DeviceInfo[] = [];
  Activitys: string[] = [];
  props: MainProps;
  constructor(props: {
    apk: string;
    apkName: string;
    props: MainProps
  }) {
    this.apk = props.apk;
    this.apkName = props.apkName;
    console.log('props', props)
    this.props = props.props;
  };
  public async initDevices() {
    const excRsp = await execCmd('adb devices');
    const list = excRsp.split('\n');
    let devices: DeviceInfo[] = [];
    if (list.length > 1) {
      // 表示有设备信息
      devices = list.map((x) => {
        if (x.indexOf('\t') > -1) {
          const item = x.split('\t');
          return {
            name: item[0],
            status: item[1],
            size: null,
            realSize: null
          }
        }
      })?.filter(x => !!x && x.status === 'device')
    }
    
    for (let i in devices) {
      const item = devices[i];
      await setWmSize(item.name)
      const size = await getClientSize(item.name);
      devices[i].size = baseSize;
      devices[i].realSize = size;
    }
    console.log('list', devices);
    this.devices = devices;
  };
  // 安装App
  public installApp() {
    return new Promise(async (resolve, reject) => {
      let successList = [];
      let timeoutFlag = true;

      let timer = setTimeout(() => {
        if (timeoutFlag) {
          console.log('App install timeout')
          reject('App install timeout')
        }
      }, 60000)

      const installCallback = (index) => {
        successList.push(index);
        if (index.length >= this.devices.length) {
          // 全部安装成功
          console.log('all installed')
          timeoutFlag = false;
          clearTimeout(timer);
          resolve(true);
        }
      }

      for (let i in this.devices) {
        const item = this.devices[i];
        const existRsp = await checkHasInstall(this.apkName, item.name);
        if (existRsp) {
          console.log(`${this.apkName} has Installed`)
          return resolve(true);
        }
        await execCmd(`adb -s ${item.name} install ${this.apk}`);
        let timer = setInterval(async () => {
          const excRsp = await checkHasInstall(this.apkName, item.name);
          if (excRsp) {
            // 安装成功
            await grantApp(item.name);
            console.log('install success')
            installCallback(i);
            clearInterval(timer);
            timer = null;
          }
        }, 1000)
      }
    })
  };

  public async startApp() {
    console.log('startApp...')
    for (let i in this.devices) {
      const item = this.devices[i];
      await launchApp(`${this.apkName}/${ActivitysMap.HOME}`, item.name);
      await passAndroidPermission(item);
      if (await checkActivity(ActivitysMap.INDEX, item.name)) {
        await tapBtn(MAIN_BTN_POSITION.INDEX_OK, item);
      }
    }
    return null;
  };
  // 登录
  public async loginApp() {
    try {
      console.log('check login...')
      for (let i in this.devices) {
        const item = this.devices[i];
        if (await checkActivity([ActivitysMap.LOGIN_FLASH, ActivitysMap.WELCOME], item.name)) {
          // 如果是登录界面需要触发登录
          console.log('need login...', this.props.account?.[i])
          await awaitActivity(ActivitysMap.WELCOME, item.name)
          await tapBtn(MAIN_BTN_POSITION.MORE_LOGIN_BTN, item);
          await tapBtn(MAIN_BTN_POSITION.IPHEON_LOGIN_BTN, item);
          await tapBtn(MAIN_BTN_POSITION.PASS_LOGIN_BTN, item);
          await tapBtn(MAIN_BTN_POSITION.INPUT_ACCOUNT, item);
          await inputText(this.props.account?.[i]?.account, item.name)
          await tapBtn(MAIN_BTN_POSITION.INPUT_PASSWORD, item);
          await inputText(this.props.account?.[i]?.password, item.name)
          await tapBtn(MAIN_BTN_POSITION.LOGIN_PROTOCAL, item);
          await tapBtn(MAIN_BTN_POSITION.LOGIN_BTN, item);
        } else {
          console.log('not login page')
        }
      }
      return null;
    } catch (e) {
      console.log('main Task error:', e)
    }
  };

  // 执行主要任务Task
  public async mainTask(taskName: string) {
    try {
      console.log('run Task...')
      for (let i in this.devices) {
        const item = this.devices[i];
        const task = require(`./task/${taskName}`);
        if (task?.default) {
          await task.default(item);
        }
      }
      return null;
    } catch (e) {
      console.log('main Task error:', e)
    }
  }

  // 上传图片
  public async uploadPic() {
    try {
      console.log('upload pic')
      for (let i in this.devices) {
        const item = this.devices[i];
        await uploadPic(item.name, this.props.picDir)
      }
      return null;
    } catch (e) {
      console.log('upload pic error:', e)
    }
  }
}

export default MyAppBridge;