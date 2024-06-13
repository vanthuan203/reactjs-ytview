import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("vps_tiktok/listVPS")
  return res
}
export async function getListDevicesByVPS(vps:string) {
  const res:any = await getFunciton("vps_tiktok/getListDevicesByVPS?vps="+vps.trim())
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("vps_tiktok/update",account)
  return res
}

export async function updateResetVPS(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("vps_tiktok/updaterestart",account)
  return res
}

export async function deleteVps(vps:string) {
  const res:any = await deleteFunciton("/vps_tiktok/delete?vps="+vps)
  return res
}

export async function allAccount() {
  const res:any = await getFunciton("/gmails/countgmails")
  return res
}