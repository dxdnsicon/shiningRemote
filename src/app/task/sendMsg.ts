// 发送评论信息

import { DOM_XPATH } from '../../typings/global';
import { HOME_DOMAIN } from '../../config/task-config';
import BaseTask from './base';

type HotItem = { title: string, href: string }

class SendMsg extends BaseTask {
  hotList: HotItem[] = [];
	constructor(props) {
		super({
      page: props.page,
      process: props.process
    });
	}
  // 获取热门列表前N位
  public async getHotList(): Promise<HotItem[]> {
    const list = await this.page.evaluate(() => {
      const sectionList = document.querySelector('.feeds-container').querySelectorAll('section')
      const data = Array.from(sectionList)?.map(x => {
        return {
            title: x.querySelector('a.title > span')?.textContent,
            href: x.querySelector('a[href]')?.getAttribute('href')
        }
      })
      return data.filter(x => !!x.title)
    })
    console.log('list', list)
    this.hotList = list;
    return list
  }

  public async getMsg(item: HotItem) {
    return '牛';
  }

  public async sendMsg(item: HotItem) {
    await this.page.goto(`${HOME_DOMAIN}${item.href}`)
    await this.sleep(5000);
    await this.click(DOM_XPATH.INPUT_FIRST);
    await this.sleep(1000);
    const msg = await this.getMsg(item);
    await this.page.evaluate((INPUT_DOM, msg) => {
      const dom = document.evaluate(INPUT_DOM, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      dom.textContent = msg;
    }, DOM_XPATH.INPUT_P, msg)
    await this.page.evaluate((INPUT_DOM, msg) => {
      const dom = document.evaluate(INPUT_DOM, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      // @ts-ignore
      dom.removeAttribute('disabled');
    }, DOM_XPATH.SEND_BTN, msg)
    await this.sleep(2000);
    await this.click(DOM_XPATH.SEND_BTN);
    await this.sleep(2000);
  }

  // 依次点击各个列表
  public async openHotList() {
    const list = this.hotList || [];
    for (let i in list) {
      await this.sendMsg(list[i])
    }
    await this.sleep(3000);
  }

	public async main() {
    await this.sleep(3000);
		this.log(`sendMsg mainTask start`)
		await this.getHotList();

    await this.openHotList();
		this.log(`sendMsg mainTask over`)
	}
}

export default SendMsg;