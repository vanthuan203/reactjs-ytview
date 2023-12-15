import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost,} from '../models/Order'



export async function getListOrder(user:string) {
  const res:any = await getFunciton("webtraffic/getordertraffic?user="+user)
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
export async function addorderv2( link:string,
                                  note:string,
                                  maxthreads:number,
                                  trafficorder:number,
                                  keywords:string,
                                  service:number,
                                  user:string) {
  const res = await postWithoutTokenFunciton("webtraffic/ordertraffic", {
    link:link,
    maxthreads:maxthreads,
    trafficorder:trafficorder,
    keywords:keywords,
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
  const res:any = await postWithoutTokenFunciton("webtraffic/update",order)
  return res
}
export async function updateThread(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("webtraffic/updatethread",order)
  return res
}

export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}
export async function addOrderManual(order:OrderFormManual) {
  const res:any = await postWithoutTokenFunciton("webtraffic/orderbuffh",order)
  return res
}

export async function addOrderMulti(order:OrderPost) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}




export async function deleteChannel(orderid:string,cancel:number) {
  const res:any = await deleteFunciton("/webtraffic/delete?orderid="+orderid+'&cancel='+cancel)
  return res
}
