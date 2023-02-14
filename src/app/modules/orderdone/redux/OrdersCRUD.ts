import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost,} from '../models/Order'



export async function getListOrder(user:string) {
  const res:any = await getFunciton("videobuffh/getorderbuffh?user="+user)
  return res
}

export async function getOrderFilter(key:string,user:string) {
  const res:any = await getFunciton("videobuffh/getorderfilterbuffh?key="+key+'&user='+user)
  return res
}

export async function getOrderPercentFilter(key:number,user:string) {
  const res:any = await getFunciton("videobuffh/getorderbypercentbuffh?key="+key+"&user="+user)
  return res
}
export async function addorderv2( videoid:string,
                                  homerate:number,
                                  note:string,
                                  directrate:number,
                                  commentrate:number,
                                  mobilerate:number,
                                  searchrate:number,
                                  enabled:number,
                                  maxthreads:number,
                                  viewstart:number,
                                  likerate:number,
                                  suggestrate:number,
                                  timebuff:number,
                                  optionbuff:number,
                                  user:string) {
  const res = await postWithoutTokenFunciton("videobuffh/orderbuffh", {
    videoid:videoid,
    homerate:homerate,
    note:note,
    directrate:directrate,
    commentrate:commentrate,
    mobilerate:mobilerate,
    searchrate:searchrate,
    enabled:enabled,
    maxthreads:maxthreads,
    viewstart:viewstart,
    likerate:likerate,
    suggestrate:suggestrate,
    timebuff:timebuff,
    optionbuff:optionbuff,
    user:user
  })
  return res
}

export async function bhorderv2( videoid:string) {
  const res = await postWithoutTokenFunciton("videobuffh/bhbuffh", {
    videoid:videoid
  })
  return res
}

export async function updateOrder(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("videobuffh/update",order)
  return res
}
export async function updateThread(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("videobuffh/updatethread",order)
  return res
}

export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}
export async function addOrderManual(order:OrderFormManual) {
  const res:any = await postWithoutTokenFunciton("videobuffh/orderbuffh",order)
  return res
}

export async function addOrderMulti(order:OrderPost) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}




export async function deleteChannel(videoid:string,cancel:number) {
  const res:any = await deleteFunciton("/videobuffh/delete?videoid="+videoid+'&cancel='+cancel)
  return res
}
