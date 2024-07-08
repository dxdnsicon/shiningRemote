/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-11-05 15:20:28
 * @--------------------------------------------------: 
 * @LastEditTime: 2024-07-08 19:44:16
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------: 
 * @Description: 
 */

export type DeviceInfo = {name: string, status: string, size: [number, number], realSize: [number, number]};

export interface MainProps {
  keyword: string; // 搜索关键字
}

export enum DOM_XPATH {
  SORT_HOT = '/html/body/div[4]/div/li[3]',
  INPUT_FIRST = '//*[@id="noteContainer"]/div[4]/div[3]/div/div/div[1]/div[1]/div/div',
  INPUT_P = '//*[@id="content-textarea"]',
  SEND_BTN = '//*[@id="noteContainer"]/div[4]/div[3]/div/div/div[2]/div/div[2]/button[1]'
}