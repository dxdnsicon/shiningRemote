// 发送评论信息

import { DOM_XPATH } from '../../typings/global';
import BaseTask from './base';

class SendMsg extends BaseTask {
	constructor(props) {
		super({
      page: props.page,
      process: props.process
    });
	}
  // 获取热门列表前N位
  public async getHotList() {
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
  }

	public async main() {
    await this.sleep(3000);
		this.log(`sendMsg mainTask start`)
		await this.getHotList();
		this.log(`sendMsg mainTask over`)
	}
}

export default SendMsg;