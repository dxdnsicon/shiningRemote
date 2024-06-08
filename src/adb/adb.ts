import { execCmd, sleep } from "../utils/index";
import { ActivitysMap, MAIN_BTN_POSITION, getRealPositionSize, baseSize, MAIN_APK_NAME } from '../config/task-config';
import { DeviceInfo } from "../typings/global";

// 设置设备尺寸
export const setWmSize = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell wm size ${baseSize[0]}x${baseSize[1]}`);
  return !!excRsp;
}

// 获取android打开App拉起指定页面的adb命令
export const getAndroidOpenUrl = (url: string): string => {
  const qqmusicParams = encodeURIComponent(`{"url":"${url}"}`);
  return `adb shell am start -W -a android.intent.action.VIEW -d "qqmusic://qq.com/ui/openUrl?p=${qqmusicParams}"`
}
// 获取打开链接的scheme协议
export const getSchemeOpenUrl = (url: string): string => {
  const qqmusicScheme = `qqmusic://qq.com/ui/openUrl?p=${encodeURIComponent(`{"url":"${url}"}`)}`
  return qqmusicScheme;
}

// 关闭webview
export const closeWebview = async (client: any) => {
  return await client.executeAsyncScript('Music.client.open("ui", "closeWebview")', [])
}


export const getClientSize = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell wm size`);
  let list = null;
  if (excRsp) {
    list = excRsp.match(/\d+/g);
    return list.map(x => +x);
  } else {
    throw 'get devices size error' + excRsp
  }
}

export const grantApp = async (deviceName: string) => {
  await execCmd(`adb -s ${deviceName} shell appops set ${MAIN_APK_NAME} android:read_external_storage allow`)
  const GrantList = [
    'android.permission.WRITE_EXTERNAL_STORAGE',
    'android.permission.ACCESS_FINE_LOCATION',
    'android.permission.ACCESS_MEDIA_LOCATION',
    'android.permission.RECORD_AUDIO'
  ]
  GrantList.forEach(async (item) => {
    console.log('Now grantApp:', item)
    await execCmd(`adb -s ${deviceName} shell pm grant ${MAIN_APK_NAME} ${item}`);
  })
  return true;
}

// 输入指定文本
export const inputText = async (text: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input text ${text}`);
  await sleep(1000);
  return !!excRsp;
}

// 判断App是否已安装
export const checkHasInstall = async (apkName: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell pm -l | grep ${apkName}`);
  return !!excRsp;
}

// 查看当前在哪个activity
export const findActivitysNow = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell dumpsys window | grep mCurrentFocus`);
  console.log('Now Activitys:', excRsp)
  return excRsp;
}

export const launchApp = async (AppPath: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell am start ${AppPath}`);
  return !!excRsp;
}

// 模拟键盘输入
export const inputKeyDown = async (str: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input keyboard text "${str}"`)
  return excRsp;
}

// 按下HOME键
export const inputHome = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input keyevent 3`)
  return excRsp;
}

// 滑动
export const inputSwipe = async (start: [number, number], end: [number, number], deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input swipe ${start[0]} ${start[1]} ${end[0]} ${end[1]}`)
  return excRsp;
}

// 后退键盘
export const inputBack = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input keyevent 4`)
  return excRsp;
}

// 点击指定位置
export const inputTap = async (start: [number, number], deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input tap ${start[0]} ${start[1]}`)
  return excRsp;
}

// 点击按钮
export const tapBtn = async (name: MAIN_BTN_POSITION, device: DeviceInfo) => {
  await sleep(1000);
  const position = getRealPositionSize(device.size, name);
  console.log(`excute tap ${name}, position: ${position}`)
  const excRsp = await inputTap(position, device.name);
  return excRsp;
}

// 判断是否是授权，如果是就点击允许
export const passAndroidPermission = async (device) => {
  await sleep(1000);
  const excRsp = await findActivitysNow(device.name);
  if (excRsp?.indexOf(ActivitysMap.PERMISSION) > -1) {
    await tapBtn(MAIN_BTN_POSITION.PERMISSION_OK, device);
  }
  return !!excRsp;
}

// 判断是否是某个activitys
export const checkActivity = async (activityName: string | string[], deviceName: string, flg = 3) => {
  await sleep(1000);
  const excRsp = await findActivitysNow(deviceName);
  if (excRsp.indexOf('mCurrentFocus=null') > -1) {
    // 暂时没有找到mainactivitys
    return await checkActivity(activityName, deviceName, flg)
  }
  if (typeof activityName === 'string') {
    if (excRsp?.indexOf(activityName) > -1) {
      return true;
    }
  } else {
    for (let i in activityName) {
      if (excRsp?.indexOf(activityName[i]) > -1) {
        return true;
      }
    }
  }
  return false;
}

// 等待某个activity出现
export const awaitActivity = (activityName: string, deviceName: string) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let timer = setInterval(async () => {
      count ++;
      const isActivity = await checkActivity(activityName, deviceName);
      if (isActivity) {
        resolve(true);
        clearInterval(timer);
        timer = null;
      } else if (count >= 30) {
        reject(`${activityName} await timeout！`);
      }
    }, 1000)
  })
}