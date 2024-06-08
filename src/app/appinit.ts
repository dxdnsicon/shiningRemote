// 连接app
import MyAppBridge from './myApp';
import { APP_PATH, AUTO_CLOSE_TIMESTAMPS, MAIN_APK_NAME } from '../config/task-config';
import { MainProps } from '../typings/global';

const startApp = async (props: MainProps) => {
  const client = new MyAppBridge({
    apk: APP_PATH,
    apkName: MAIN_APK_NAME,
    props,
  });
  try {
    await client.initDevices();
    // await client.uploadPic();
    await client.installApp();
    await client.startApp();
    await client.loginApp();
    await client.mainTask(props.task);
    return client;
  } catch(e) {
    console.error('error:', e?.toString?.())
    throw null;
  }
}

export default startApp;