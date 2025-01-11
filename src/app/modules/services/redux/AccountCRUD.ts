import axios from 'axios'
import {postWithoutTokenFunciton, getFunciton, deleteFunciton} from 'utils/ApiHelper'
import {AccountModel} from '../models/Account'


export async function getListAccount() {
    const res: any = await getFunciton("service/list")
    return res
}

export async function addorderv2(service: number,
                                 category: string,
                                 name: number,
                                 rate: number,
                                 min: string,
                                 max: number,
                                 geo: string,
                                 enabled: number,
                                 maxorder: number,
                                 search: number,
                                 suggest: number,
                                 dtn: number,
                                 mintime: number,
                                 maxtime: number,
                                 maxtimerefill: number,
                                 refill: number,
                                 thread: number,
                                 type: string,
                                 checktime: number) {
    const res = await postWithoutTokenFunciton("service/addservice", {
        service: service,
        category: category,
        name: name,
        rate: rate,
        min: min,
        max: max,
        geo: geo,
        enabled: enabled,
        maxorder: maxorder,
        search: search,
        suggest: suggest,
        dtn: dtn,
        mintime: mintime,
        maxtime: maxtime,
        maxtimerefill: maxtimerefill,
        refill: refill,
        thread: thread,
        type: type,
        checktime: checktime
    })
    return res
}

export async function updateAccount(account: AccountModel) {
    const res: any = await postWithoutTokenFunciton("service/update", account)
    return res
}

export async function updateResetVPS(account: AccountModel) {
    const res: any = await postWithoutTokenFunciton("service/updaterestart", account)
    return res
}

export async function deleteVps(vps: string) {
    const res: any = await deleteFunciton("service/delete?username=" + vps)
    return res
}

export async function allAccount() {
    const res: any = await getFunciton("service/gmails/countgmails")
    return res
}