import puppeteer from 'puppeteer-core';
import { CHROME_START, CHROME_FLAGS } from '../config/task-config'
import Whistle from '../utils/whistle';

export const getProxyFlagStr = (port: number, ip = '127.0.0.1') => `--proxy-server=${ip}:${port}`

export default async (cookie: string) => {

  const w2 = await new Whistle().start();
  w2.setRules(`# proxyID:  '# no proxy content`)

  const flags = CHROME_FLAGS;

  flags.push(getProxyFlagStr(w2.options.port))

  const browser = await puppeteer.launch({ ...CHROME_START, args: flags });

  const page = await browser.newPage();

  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
  await page.setUserAgent(userAgent);

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  const cookieString = cookie;

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

  // 注入登陆态
  await page.setCookie(...parsedCookies);
  return page;
}