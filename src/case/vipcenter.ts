// 会员中心测试用例，
import log from '../utils/log';
import { sleep } from '../utils/index';
import { closeWebview } from '../adb/adb';

// 测试底部按钮跳转链接是否是集权页
const checkBottomBarJump = async (client: any): Promise<boolean> => {
  try {
    // 点击会员中心底部开通按钮
    await client.$('.bottom_bar__btn').click()
    // 获取跳转之后的title
    const windows = await client.getWindowHandles();
    await client.switchToWindow(windows[1]);
    const url = await client.getUrl();
    await closeWebview(client);
    return url.indexOf(' https://i.y.qq.com/n2/m/myservice/v3/index.html') >= -1;
  } catch(e) {
    log('checkBottomBarJump error', e)
    return false
  }
}

// 检测权益tab是否可点击
const checkPrivilegeTabClickAviable = async (client: any): Promise<boolean> => {
  try {
    // 权益子tab点击按钮
    const tab = await client.$('.tab__box').$$('a.tab_item')[1];
    await client.touchClick(tab.elementId);
    await sleep(2000);
    const targetDom = await client.$('#js_slider_huge').getCSSProperty('display');
    return targetDom?.value === 'block'; // 判断指定元素是否存在
  } catch(e) {
    log('checkPrivilegeTabClickAviable error', e)
    return false
  }
}

export default {
  pageName: '会员中心',
  pageUrl: 'https://i.y.qq.com/n2/m/myvip/v9/index.html?_hidehd=1&_hdct=2&_miniplayer=1',
  pageCase: [
    {
      describe: '测试底部开通按钮跳转链接是否是集权页',
      methods: checkBottomBarJump
    },
    {
      describe: '检测权益tab是否可点击',
      methods: checkPrivilegeTabClickAviable
    }
  ]
}