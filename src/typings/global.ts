/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-11-05 15:20:28
 * @--------------------------------------------------: 
 * @LastEditTime: 2024-07-03 16:16:34
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------: 
 * @Description: 
 */

export type DeviceInfo = {name: string, status: string, size: [number, number], realSize: [number, number]};

export interface MainProps {
  keyword: string; // 搜索关键字
}

export enum DOM_XPATH {
  SORT_HOT = '/html/body/div[4]/div/li[3]'
}