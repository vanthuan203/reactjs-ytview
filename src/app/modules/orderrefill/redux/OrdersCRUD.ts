import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost,} from '../models/Order'



export async function getListOrder(user:string) {
  const res:any = await getFunciton("order_running/get_Order_Refill?user="+user)
  return res
}

export async function getOrderFilter(key:string,user:string) {
  const res:any = await getFunciton("order_running/getorderfilterbuffh?key="+key+'&user='+user)
  return res
}

export async function getOrderPercentFilter(key:number,user:string) {
  const res:any = await getFunciton("order_running/getorderbypercentbuffh?key="+key+"&user="+user)
  return res
}
export async function addorderv2( link:string,
                                  quantity:number,
                                  service:number,
                                  list:string,
                                  thread:number,
                                  note:string
                                  ) {
  const res = await postWithoutTokenFunciton("api/web", {
    link:link,
    quantity:quantity,
    service:service,
    list:list,
    thread:thread,
    note:note
  })
  return res
}

export async function addorderbychannelv2( videoid:string,
                                  note:string,
                                  maxthreads:number,
                                  vieworder:number,
                                  service:number,
                                  user:string) {
  const res = await postWithoutTokenFunciton("order_running/orderchannelview", {
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
  const res = await postWithoutTokenFunciton("order_running/bhview", {
    videoid:videoid
  })
  return res
}

export async function updateOrder(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("order_running/update",order)
  return res
}
export async function updateThread(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("order_running/updatethread",order)
  return res
}

export async function addOrder(order:OrderForm) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}
export async function addOrderManual(order:OrderFormManual) {
  const res:any = await postWithoutTokenFunciton("order_running/orderbuffh",order)
  return res
}

export async function addOrderMulti(order:OrderPost) {
  const res:any = await postWithoutTokenFunciton("",order)
  return res
}




export async function deleteChannel(order_id:string,cancel:number) {
  const res:any = await deleteFunciton("/order_running/delete_Order_Running?order_id="+order_id+'&cancel='+cancel)
  return res
}
