import fs from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import log from './log';
import crypto from 'crypto';
import { SDK_PATH, IS_MACOS } from '../config/task-config';

export const writeFile = (dir, fileName, content) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(join(dir + '/' + fileName), JSON.stringify(content));
}

export const execCmd = async (cmd: string): Promise<string> => {
  return new Promise((resolve) => {
    if (cmd.indexOf('adb -s') === 0) {
      // adb命令
      cmd = cmd.replace('adb', SDK_PATH);
    }
    console.log('cmd', cmd)
    exec (cmd, (error, stdout, stderr) => {
      if (error) {
        log ('error:' + stderr);
        resolve (null);
      } else {
        try {
          resolve (stdout);
        } catch (e) {
          log (e);
          resolve (null);
        }
      }
    });
  })
}

if (IS_MACOS) {
  // 授权
  execCmd(`chmod 777 ${SDK_PATH}`);
}

export const formateTime = (time, fmt) => {
  const date = new Date(time);
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
    }
  }
  return fmt;
};

// 判断链接是否可能是PC链接
export const checkIsPc = (link: string) => {
  if (/device\=pc/.test(link)) {
    return true;
  }
  if (/device\=mobile/.test(link)) {
    return false;
  }
  if (/\/m\//.test(link)) {
    return false;
  } else if (/\/jzt\//.test(link)) {
    return false;
  } else {
    return true;
  }
}

// 生成md5
export const createMd5 = (str: string) => {
  return crypto.createHash('md5').update(str).digest('hex');
}

// 转换资源size
export const computeSize = (size: number) => {
  let res = '';
  if (size > 1000000) {
    res = `${(size / 1024 / 1024).toFixed(1)}Mb`; 
  } else if (size > 1000) {
    res = `${(size / 1024).toFixed(1)}Kb`; 
  }
  return res;
}

export const sleep = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}