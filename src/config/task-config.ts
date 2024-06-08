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

export const IMAGES_PATH = resolve('../../dist');

export const AUTO_CLOSE_TIMESTAMPS = 60000;  // 自动关闭测试客户端时间

export const CHROME_START = {
  executablePath: '/usr/bin/google-chrome'
}

export const CHROME_FLAGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--remote-debugging-port=8020',  
  '--remote-debugging-address=0.0.0.0'
]

export const initPath = (path) => {
  fs.exists(path, async (exists) => {
    if (!exists) {
      fs.mkdirSync(path);
    }
  });
};
