// 操作base64图片

import * as fs from 'fs';
import * as path from 'path';
import { IMAGES_PATH } from '../config/task-config';

export const save_base64 = (dataurl: string, pageItem) => {
  const imagePath = path.resolve(IMAGES_PATH, `${pageItem.pageName}.png`);
  // const base64 = dataurl.replace(//)
  const buffer = Buffer.from(dataurl, 'base64');
  fs.writeFile(imagePath, buffer, (err) => {
    if (err) {
      console.log('writefile error', err);
    } else {
      console.log('success');
    }
  })
}