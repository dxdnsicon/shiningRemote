import puppeteer from 'puppeteer-core';
import { CHROME_START, CHROME_FLAGS } from '../config/task-config'

export default async (cookie: string) => {
  const browser = await puppeteer.launch({ ...CHROME_START, args: CHROME_FLAGS });

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