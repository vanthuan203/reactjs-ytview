import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import { AccountModel } from '../models/Account'



export async function getListAccount() {
  const res:any = await getFunciton("vpssub/list")
  return res
}


export async function updateAccount(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("vpssub/update",account)
  return res
}

export async function updateResetVPS(account:AccountModel) {
  const res:any = await postWithoutTokenFunciton("vpssub/updaterestart",account)
  return res
}

export async function deleteVps(vps:string) {
  const res:any = await deleteFunciton("/vpssub/delete?vps="+vps)
  return res
}

export async function allAccount() {
  const res:any = await getFunciton("/gmails/countgmails")
  return res
}