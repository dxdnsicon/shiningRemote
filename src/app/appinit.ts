// 连接app
import MyAppBridge from './myApp';
import { AUTO_CLOSE_TIMESTAMPS } from '../config/task-config';
import { MainProps } from '../typings/global';


const startApp = async (props: MainProps) => {
  const client = new MyAppBridge({
    homeURL: 'https://www.xiaohongshu.com/explore'
  });
  try {
    await client.startPage();
    return client;
  } catch(e) {
    console.error('error:', e?.toString?.())
    throw null;
  }
}

export default startApp;