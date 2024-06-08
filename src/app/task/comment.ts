// 评论模块

import { ActivitysMap, MAIN_BTN_POSITION } from '../../config/task-config';
import { awaitActivity, passAndroidPermission, tapBtn } from '../../adb/adb';
import { DeviceInfo } from '../../typings/global';
import { sleep } from '../../utils';

const Comment = async (item: DeviceInfo) => {
  await tapBtn(MAIN_BTN_POSITION.FIRST_TAB, item);
  if (await awaitActivity(ActivitysMap.HOME, item.name)) {
    // 如果是HOME洁面就开始主任务
    await tapBtn(MAIN_BTN_POSITION.HOME_ADD, item);
    await passAndroidPermission(item.name);
    await awaitActivity(ActivitysMap.CAPAENTRANCE, item.name)
    await tapBtn(MAIN_BTN_POSITION.PIC_1, item);
    await tapBtn(MAIN_BTN_POSITION.EDIT_PICCHOSE_NEXT, item);
    await sleep(2000);
    await tapBtn(MAIN_BTN_POSITION.EDIT_NEXT, item);
    await awaitActivity(ActivitysMap.INFOEDIT, item.name)
    await tapBtn(MAIN_BTN_POSITION.PUSH, item);
  } else {
    console.log('not home page')
  }
}

export default Comment