import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost,} from '../models/Order'



export async function getListOrder(user:string) {
  const res:any = await getFunciton("videocomment/getorderview?user="+user)
  return res
}

export async function getOrderFilter(key:string,user:string) {
  const res:any = await getFunciton("videocomment/getorderfilterbuffh?key="+key+'&user='+user)
  return res
}

export async function getOrderPercentFilter(key:number,user:string) {
  const res:any = await getFunciton("videocomment/getorderbypercentbuffh?key="+key+"&user="+user)
  return res
}
export async function addorderv2( videoid:string,
                                  note:string,
                                  maxthreads:number,
                                  vieworder:number,
                                  service:number,
                                  user:string) {
  const res = await postWithoutTokenFunciton("videocomment/orderview", {
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
  const res = await postWithoutTokenFunciton("videocomment/bhview", {
    videoid:videoid
  })
  return res
}

export async function updateOrder(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("videocomment/update",order)
  return res
}
export async function updateThread(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("videocomment/updatethread",order)
  return res
}

export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}
export async function addOrderManual(order:OrderFormManual) {
  const res:any = await postWithoutTokenFunciton("videocomment/orderbuffh",order)
  return res
}

export async function addOrderMulti(order:OrderPost) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}




export async function deleteChannel(videoid:string,cancel:number) {
  const res:any = await deleteFunciton("/videocomment/delete?videoid="+videoid+'&cancel='+cancel)
  return res
}
