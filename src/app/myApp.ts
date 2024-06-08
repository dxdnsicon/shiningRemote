import puppeteer from 'puppeteer-core';
import { CHROME_START, CHROME_FLAGS } from '../config/task-config'

class App {
    homeURL: '';
    debugPort: '';
    constructor(props) {
        this.homeURL = props.homeURL;
        this.debugPort = props.debugPort;
    }
    public async startPage(){
        const browser = false ? await puppeteer.connect({
            ...CHROME_START,
            browserURL: this.debugPort,
        }) : await puppeteer.launch({ ...CHROME_START, headless: true, args: CHROME_FLAGS });

        const page = await browser.newPage();

        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
        await page.setUserAgent(userAgent);

        const cookieString = 'abRequestId=e7f36198-67b4-56d7-8970-8947a7850c65; a1=18f23593a100vn9e3pdhqvmnmvbpe9np3suctw3iy50000353532; webId=a7da130a7bcd3dac41c0b4e16391c3d5; gid=yYiJq2j4YSqfyYiJq2jq0MEqy88hIjdqUfxA73vh6I6hDS28UdjIU9888q2q2qJ8248ySj8D; web_session=0400698ca709d4563c4f0a4951344b3285cf19; websectiga=f47eda31ec99545da40c2f731f0630efd2b0959e1dd10d5fedac3dce0bd1e04d; acw_tc=7a588498098a1d1633b47303190fdf55a0dd2af1fd94c3b72c217950677879ba; webBuild=4.20.1; xsecappid=xhs-pc-web; sec_poison_id=d241493b-7d29-429d-a9df-dc1c574a96b7; unread={%22ub%22:%2264250190000000001203fb2e%22%2C%22ue%22:%2264bcfcb2000000000a018270%22%2C%22uc%22:18}';

        // Parse the cookie string
        const parsedCookies = cookieString.split(';').map(cookie => {
            const [name, value] = cookie.split('=');
            return {
                name: name.trim(),
                value: value.trim(),
                domain: '.xiaohongshu.com', // Adjust the domain as needed
                path: '/'
            };
        });
    
        // Set cookies
        await page.setCookie(...parsedCookies);

        await page.goto('https://xiaohongshu.com');

        console.log('打开页面')
    }
}

export default App;