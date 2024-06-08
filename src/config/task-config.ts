/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-04-20 11:34:33
 * @--------------------------------------------------:
 * @LastEditTime: 2024-04-02 16:35:34
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------:
 * @Description:  一些配置项目
 */
import { resolve } from 'path';
import fs from 'fs';
import { platform } from 'os';

// ENV
export const CHROME_ENV = process.env.CHROME_ENV;
export const DISABLE_STATIC_SERVER = process.env.DISABLE_STATIC_SERVER
export const DISABLE_CRON_TASK = process.env.DISABLE_CRON_TASK
export const IS_MACOS = platform() === 'darwin';

export const AUTO_CLOSE_TIMESTAMPS = 60000;  // 自动关闭测试客户端时间

export const IMAGES_PATH = resolve(__dirname, '..', '..', 'dist');

export const SDK_PATH = resolve(__dirname, '..', '..', 'sdk', IS_MACOS ? 'mac' : 'linux', 'platform-tools/adb');

export const MAIN_APK_NAME = 'com.xingin.xhs';

export const ANDROID_OS_PERMISSION = 'com.android.permissioncontroller';

export const APP_PATH = resolve(__dirname, '..', '..', 'public', 'main.apk');

// app的activitys
export const ActivitysMap = {
  'INDEX': 'com.xingin.xhs.index.v2.IndexActivityV2', // 安装后协议的页面
  'WELCOME': 'com.xingin.login.activity.WelcomeActivity', // 欢迎登录页面
  'LOGIN_FLASH': 'com.xingin.xhs.index.v2.splash.logindelay.LoginDelaySplashActivity', // 登录界面闪屏
  'LOGIN': 'com.xingin.login.activity.LoginActivity', // 登录页面
  'HOME': 'com.xingin.xhs.index.v2.IndexActivityV2', // HOME页面
  'PERMISSION': 'com.android.packageinstaller.permission.ui.GrantPermissionsActivity', // 授权页
  'CAPAENTRANCE': 'com.xingin.capa.lib.entrance.CapaEntranceActivity', // 选择内容页面
  'INFOEDIT': 'com.xingin.capa.v2.feature.post.lcb.activity.CapaLCBPostNoteActivity' // 内容编辑页面
}

export enum MAIN_BTN_POSITION {
  INDEX_OK = 'INDEX_OK',
  MORE_LOGIN_BTN = 'MORE_LOGIN_BTN',
  IPHEON_LOGIN_BTN = 'IPHEON_LOGIN_BTN',
  PASS_LOGIN_BTN = 'PASS_LOGIN_BTN',
  INPUT_ACCOUNT = 'INPUT_ACCOUNT',
  INPUT_PASSWORD = 'INPUT_PASSWORD',
  LOGIN_PROTOCAL = 'LOGIN_PROTOCAL',
  LOGIN_BTN = 'LOGIN_BTN',

  PUSH = 'PUSH',
  EDIT_NEXT = 'EDIT_NEXT',
  HOME_ADD = 'HOME_ADD',
  PIC_1 = 'PIC_1', 
  EDIT_PICCHOSE_NEXT = 'EDIT_PICCHOSE_NEXT',
  PERMISSION_OK = 'PERMISSION_OK',
  FIRST_TAB = 'FIRST_TAB'
}

export const baseSize: [number, number] = [1080, 2400];

export const yOffset = 0; // Y轴因为通顶，可能会有一定的偏移

export const baseBtnPosition = {
  [MAIN_BTN_POSITION.INDEX_OK]: [520, 1602],
  [MAIN_BTN_POSITION.MORE_LOGIN_BTN]: [524, 1850],  // 换一个登录方式
  [MAIN_BTN_POSITION.IPHEON_LOGIN_BTN]: [220, 2050], // 选择手机号登录
  [MAIN_BTN_POSITION.PASS_LOGIN_BTN]: [250, 600], // 选择密码登录
  [MAIN_BTN_POSITION.INPUT_ACCOUNT]: [480, 488], // 登录界面输入账号
  [MAIN_BTN_POSITION.INPUT_PASSWORD]: [350, 640], // 密码输入框
  [MAIN_BTN_POSITION.LOGIN_PROTOCAL]: [153, 970],
  [MAIN_BTN_POSITION.LOGIN_BTN]: [500, 860], // 登录弹窗
  [MAIN_BTN_POSITION.PUSH]: [590, 2220],
  [MAIN_BTN_POSITION.EDIT_NEXT]: [920, 164],
  [MAIN_BTN_POSITION.HOME_ADD]: [544, 2266],
  [MAIN_BTN_POSITION.PIC_1]: [307,461],
  [MAIN_BTN_POSITION.EDIT_PICCHOSE_NEXT]: [905,2266],
  [MAIN_BTN_POSITION.PERMISSION_OK]: [768, 2192],
  [MAIN_BTN_POSITION.FIRST_TAB]: [116, 2306]
};

type BTN_NAME = keyof typeof baseBtnPosition;

export const getRealPositionSize = (clientSize: [number, number], keyName: BTN_NAME): [number, number] => {
  const baseSizeBtn = baseBtnPosition[keyName];
  console.log('baseSizeBtn', keyName, baseSizeBtn, baseSize, clientSize )
  return [(baseSizeBtn[0] / baseSize[0]) * clientSize[0], (baseSizeBtn[1] / baseSize[1]) * clientSize[1] + yOffset]
};

export const initPath = (path) => {
  fs.exists(path, async (exists) => {
    if (!exists) {
      fs.mkdirSync(path);
    }
  });
};

// 目录初始化，如果没有这些目录就先创建这些目录
initPath(IMAGES_PATH);