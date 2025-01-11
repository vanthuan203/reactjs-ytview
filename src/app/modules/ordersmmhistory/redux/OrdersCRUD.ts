import axios from 'axios'
import { postWithoutTokenFunciton,getFunciton,deleteFunciton } from 'utils/ApiHelper'
import {OrderModel} from '../models/Order'



export async function getListOrder(user:string) {
  const res:any = await getFunciton("order_history/get_Order_History?user="+user)
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

export async function updateOrder(order:OrderModel) {
  const res:any = await postWithoutTokenFunciton("videobuffh/update",order)
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
  const res:any = await deleteFunciton("/order_history/delete?videoid="+videoid)
  return res
}
