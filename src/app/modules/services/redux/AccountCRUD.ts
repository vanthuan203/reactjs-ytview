import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("servive/list")
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("servive/update",account)
  return res
}

export async function updateResetVPS(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("servive/updaterestart",account)
  return res
}

export async function deleteVps(vps:string) {
  const res:any = await deleteFunciton("servive/delete?username="+vps)
  return res
}

export async function allAccount() {
  const res:any = await getFunciton("servive/gmails/countgmails")
  return res
}