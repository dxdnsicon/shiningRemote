/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-11-05 15:20:28
 * @--------------------------------------------------: 
 * @LastEditTime: 2024-04-02 16:20:08
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------: 
 * @Description: 
 */

export type DeviceInfo = {name: string, status: string, size: [number, number], realSize: [number, number]};

export interface MainProps {
  picDir: string; // 图片路径
  content: string; // 文本内容
  task?: string;
  account: {
    password: string;
    account: string;
  }[]
}
