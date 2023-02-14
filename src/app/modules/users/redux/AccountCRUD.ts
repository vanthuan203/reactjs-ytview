import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("auth/list")
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("auth/update",account)
  return res
}

export async function updateResetVPS(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("auth/updaterestart",account)
  return res
}

export async function deleteVps(vps:string) {
  const res:any = await deleteFunciton("auth/delete?username="+vps)
  return res
}

export async function allAccount() {
  const res:any = await getFunciton("auth/gmails/countgmails")
  return res
}