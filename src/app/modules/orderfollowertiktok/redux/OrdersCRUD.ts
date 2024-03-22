import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderModel} from '../models/Order'



export async function getListOrder(user:string) {
  const res:any = await getFunciton("channel_tiktok/getOrderFollower?user="+user)
  return res
}

export async function getOrderFilter(key:string,user:string) {
  const res:any = await getFunciton("webtraffic/getorderfilterbuffh?key="+key+'&user='+user)
  return res
}

export async function getOrderPercentFilter(key:number,user:string) {
  const res:any = await getFunciton("webtraffic/getorderbypercentbuffh?key="+key+"&user="+user)
  return res
}
export async function addorderv2( tiktok_id:string,
                                  note:string,
                                  max_threads:number,
                                  follower_order:number,
                                  service:number,
                                  user:string) {
  const res = await postWithoutTokenFunciton("channel_tiktok/orderFollower", {
    tiktok_id:tiktok_id,
    max_threads:max_threads,
    follower_order:follower_order,
    note:note,
    user:user,
    service:service
  })
  return res
}

export async function addorderbychannelv2( videoid:string,
                                  note:string,
                                  maxthreads:number,
                                  vieworder:number,
                                  service:number,
                                  user:string) {
  const res = await postWithoutTokenFunciton("webtraffic/orderchannelview", {
    videoid:videoid,
    maxthreads:maxthreads,
    vieworder:vieworder,
    note:note,
    user:user,
    service:service
  })
  return res
}

export async function bhorderv2( videoid:string) {
  const res = await postWithoutTokenFunciton("webtraffic/bhview", {
    videoid:videoid
  })
  return res
}

export async function updateOrder(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("channel_tiktok/update",order)
  return res
}
export async function updateThread(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("channel_tiktok/updatethread",order)
  return res
}

export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}




export async function deleteChannel(orderid:string,cancel:number) {
  const res:any = await deleteFunciton("/channel_tiktok/delete?tiktok_id="+orderid+'&cancel='+cancel)
  return res
}
