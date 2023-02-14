import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost} from '../models/Order'



export async function getListOrder() {
  const res:any = await getFunciton("channel/getorder")
  return res
}



export async function updateSetting(channel_prior:number) {
  console.log("api/updateSetting?channel_prior="+channel_prior)
  const res:any = await getFunciton("api/updateSetting?channel_prior="+channel_prior)
  return res
}

export async function updateOrder(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("channel/updatesingle",order)
  return res
}

export async function addorderv2( channel_id:string,
                                  list_video:string,
                                  home_rate:number,
                                  direct_rate:number,
                                  search_rate:number,
                                  enabled:number,
                                  max_thread:number,
                                  suggest_rate:number,
                                  view_percent:number) {
  const res = await postWithoutTokenFunciton("channel/orderbuffh", {
    channel_id:channel_id,
    list_video:list_video,
    direct_rate:direct_rate,
    search_rate:search_rate,
    enabled:enabled,
    max_thread:max_thread,
    suggest_rate:suggest_rate,
    view_percent:view_percent
  })
  return res
}


export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("channel/orderbuffh",order)
  return res
}
export async function addOrderManual(order:OrderFormManual) {
  const res:any = await postWithoutTokenFunciton("channel/orderbuffh",order)
  return res
}

export async function addOrderMulti(order:OrderPost) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}

export async function deleteChannel(channel_id:string) {
  const res:any = await deleteFunciton("/channel/delete?channelid="+channel_id)
  return res
}
