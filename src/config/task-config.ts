/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-04-20 11:34:33
 * @--------------------------------------------------:
 * @LastEditTime: 2024-07-08 19:36:51
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------:
 * @Description:  一些配置项目
 */
import { resolve, join } from 'path';
import fs from 'fs';
import { platform } from 'os';

export const baseDir = process.env.BASE_DIR || join(process.cwd(), "dist");
// ENV
export const CHROME_ENV = process.env.CHROME_ENV;
export const DISABLE_STATIC_SERVER = process.env.DISABLE_STATIC_SERVER
export const DISABLE_CRON_TASK = process.env.DISABLE_CRON_TASK
export const IS_MACOS = platform() === 'darwin';


export const WHISTLE_PATH = join(baseDir, 'whistle')
export const IMAGES_PATH = resolve('../../dist');

export const AUTO_CLOSE_TIMESTAMPS = 60000;  // 自动关闭测试客户端时间

export const CHROME_START = {
  headless: !IS_MACOS,
  executablePath: IS_MACOS ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/usr/bin/google-chrome'
}

export const HOME_DOMAIN = `https://www.xiaohongshu.com`;

export const CHROME_FLAGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--proxy-server=127.0.0.1:8090'
  // '--remote-debugging-port=8020',  
  // '--remote-debugging-address=0.0.0.0'
]

export const initPath = (path) => {
  fs.exists(path, async (exists) => {
    if (!exists) {
      fs.mkdirSync(path);
    }
  });
};
