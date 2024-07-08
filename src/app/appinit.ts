// 连接app
import MyAppBridge from './myApp';
import { MainProps } from '../typings/global';
import { HOME_DOMAIN } from '../config/task-config';

const startApp = async (props: MainProps) => {
  const { keyword } = props;
  const homeUrl = `${HOME_DOMAIN}/search_result?keyword=${encodeURIComponent(encodeURIComponent(keyword))}&source=web_explore_feed`
  const client = new MyAppBridge({
    homeURL: homeUrl,
    // debugPort: 'http://192.168.1.2:9222'
  });
  try {
    await client.startPage();
    await client.main();
    console.log('client process', client.process)
    return client;
  } catch(e) {
    console.error('error:', e?.toString?.())
    console.log('client process', client.process)
    throw null;
  }
}

export default startApp;