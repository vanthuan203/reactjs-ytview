import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderForm, OrderFormManual, OrderModel, OrderPost} from '../models/Order'



export async function getListOrder(videoid:string) {
  const res:any = await getFunciton("videoview/findorder?videoid="+videoid)
  return res
}
export async function getListOrderCmt(videoid:string) {
  const res:any = await getFunciton("videocomment/findorder?videoid="+videoid)
  return res
}

export async function getListOrderFollowerTiktok(tiktok_id:string) {
  const res:any = await getFunciton("channel_tiktok/findorder?tiktok_id="+tiktok_id)
  return res
}

export async function getOrderFilter(key:string,user:string) {
  const res:any = await getFunciton("videobuffh/getorderfilterbuffhhistory?key="+key+'&user='+user)
  return res
}

export async function updateSetting(channel_prior:number) {
  console.log("api/updateSetting?channel_prior="+channel_prior)
  const res:any = await getFunciton("api/updateSetting?channel_prior="+channel_prior)
  return res
}

export async function updateOrder(orderid:string,mode:number,check:number) {
  if(mode==0){
    const res:any = await getFunciton("videoview/updateRefundHis?orderid="+orderid+"&checkview="+check)
    return res
  }else{
    const res:any = await getFunciton("videoview/updateRefillHis?orderid="+orderid+"&check_time="+check)
    return res
  }

}

export async function updateOrderCmt(orderid:string) {
  const res:any = await getFunciton("videocomment/updateRefundHis?orderid="+orderid)
  return res
}
export async function updateOrderCmt100(orderid:string) {
  const res:any = await getFunciton("videocomment/updateRefund100His?orderid="+orderid)
  return res
}

export async function updateOrderFollwer(orderid:string) {
  const res:any = await getFunciton("channel_tiktok/updateRefundHis?orderid="+orderid)
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
export async function bhorderv2( videoid:string) {
  const res = await postWithoutTokenFunciton("videoview/findorder", {
    videoid:videoid
  })
  return res
}

export async function findorder( videoid:string) {
  const res = await postWithoutTokenFunciton("videoview/findorder", {
    videoid:videoid
  })
  return res
}



export async function addGroup(groupName:string) {
  const res:any = await postWithoutTokenFunciton("/group/insert",{
    name: groupName
  })
  return res
}

export async function deleteGroup(id:number) {
  const res:any = await deleteFunciton("/group/delete?id="+id)
  return res
}

export async function deleteChannel(videoid:string) {
  const res:any = await deleteFunciton("/videoview/delete?videoid="+videoid)
  return res
}
