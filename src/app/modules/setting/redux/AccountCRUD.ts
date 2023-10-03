import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel,AccountLimitModel } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("auth/setting")
  return res
}

export async function getListLimitService() {
  const res:any = await getFunciton("auth/limitservice")
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("auth/updatesetting",account)
  return res
}

export async function updateAccountLimit(accountlimit:AccountLimitModel) {
  const res:any = await postWithoutTokenFunciton("auth/updatelimit",accountlimit)
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