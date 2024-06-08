// adb操作图片
import { execCmd, sleep } from "../utils/index";

// 上传某个目录下的全部图片
export const uploadPic = async (deviceName: string, dir: string) => {
  const lscmd = `ls '${dir}'`
  const rsp = await execCmd(lscmd);
  if (rsp) {
    const picList = rsp.split('\n')?.filter(x => !!x);
    console.log('pic', picList, picList.length)
    const nowTime = Date.now();
    const promiseAll = picList.map(x => {
      return async () => {
        const uploadCmd = `adb -s ${deviceName} push '${dir}/${x}' '/sdcard/DCIM/Camera/'`;
        const scannerCmd = `adb -s ${deviceName} shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d 'file:///sdcard/DCIM/Camera/${x}'`
        console.log('uploadCmd', uploadCmd);
        console.log('scannerCmd', scannerCmd);
        const uploadRsp = await execCmd(uploadCmd)
        const scannerRsp = await execCmd(scannerCmd)
        console.log(`upload pic ${x} success`, uploadRsp, scannerRsp)
      }
    })
    console.log('promiseAll', promiseAll)
    Promise.all(promiseAll?.map(x => x?.())).then(rs => {
      console.log('uploadPic success', deviceName)
      Promise.resolve(true);
    })
  } else {
    Promise.reject('上传目录下为空');
  }
}
