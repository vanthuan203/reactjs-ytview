import axios from 'axios'
import {deleteFunciton, getFunciton} from 'utils/ApiHelper'

export async function getList() {
  const res:any = await getFunciton("history/list")
  return res
}

export async function getComputer() {
  const res:any = await getFunciton("historyview/vpsrunning")
  return res
}

export async function getProxy() {
  const res:any = await getFunciton("/proxy/list_v4")
  return res
}
export async function getAuthen() {
  const res:any = await getFunciton("/proxy/list_authen")
  return res
}
export async function getSock() {
  const res:any = await getFunciton("/proxy/list_sock")
  return res
}
export async function getProxySub() {
  const res:any = await getFunciton("/proxysub/list_v4")
  return res
}
export async function deleteProxy(ipv4:string) {
  const res:any = await deleteFunciton("/proxy/delete?ipv4="+ipv4)
  return res
}

export async function resetComputer(computer_name:string) {
  const res:any = await getFunciton("history/reset_com?computer_name="+computer_name)
  return res
}

export async function getStatics(user:string) {
  const res:any = await getFunciton("auth/getbalance7day?user="+user)
  return res
}