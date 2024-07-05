import { sleep } from '../../utils/index';

class BaseTask {
	page = null;
	process = [];
	constructor(props) {
		this.page = props.page;
		this.process = props.process;
	}

	public log(text: string) {
		this.process.push(text);
		console.log(text);
	}

	public async sleep(num) {
		await sleep(num)
	}

	// 触发点击事件
	public async click(xpath: string) {
		try {
			await this.page.evaluate((xpath) => {
				const dom = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (dom) {
					// @ts-ignore
					dom.click();
				} else {
					throw `${xpath} Button not found!`
				}
			}, (xpath))
		} catch(e) {
			this.log(e);
			throw e;
		}
	}
}

export default BaseTask;