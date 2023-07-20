import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import {ComputerModel, HistoryModel, ChannelStaticModel, ProxyModel} from '../models/Account'
import { getList,getComputer,getStatics,getProxy,getProxySub,deleteProxy} from './AccountCRUD'
import {deleteChannel} from "../../orderdone/redux/OrdersCRUD";
import {OrderModel} from "../../orderdone/models/Order";
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  RequestHistories: '[Histories] Requested',
  HistoryLoadedSuccess: '[Histories] Loaded succcess',
  HistoryLoadedFail: '[Histories] load fail',
  ProxyLoadedFail: '[Proxy] load fail',
  RequestComputers: '[Computers] Requested',
  ComputersLoadedSuccess: '[Computers] Loaded succcess',
  ProxyLoadedSuccess: '[Proxy] Loaded succcess',
  RequestStatic: '[Static] Requested',
  RequestProxy: '[Proxy] Requested',
  RequestProxySub: '[Proxy] Sub Requested',
  StaticLoadedSuccess: '[Static] Loaded succcess',
  CheckedChange: '[Proxy] Checked Change',
  CheckedAllChange: '[Proxy] Checked All Change',
  DeleteIpv4Request: '[Proxy] Delete Proxy Request',
}


const initialAccountState: IAccountState = {
  histories: [],
  loading: false,
  computers:[],
  statics:[],
  proxies:[],
}

export interface IAccountState {
  histories: HistoryModel[]
  loading: boolean
  computers : ComputerModel[],
  statics : ChannelStaticModel[]
  proxies:ProxyModel[]
}

export const reducer = persistReducer(
    { storage, key: 'v1-histories', whitelist: [] },
    (state: IAccountState = initialAccountState, action: ActionWithPayload<IAccountState>) => {
      switch (action.type) {
        case actionTypes.RequestHistories: {
          return {
            ...state,
            histories: [],
            loading: true
          }
        }
        case actionTypes.RequestProxy: {
          return {
            ...state,
            proxies: [],
            loading: true
          }
        }
        case actionTypes.RequestProxySub: {
          return {
            ...state,
            proxies: [],
            loading: true
          }
        }
        case actionTypes.RequestComputers: {
          return {
            ...state,
            computers: []
          }
        }
        case actionTypes.ComputersLoadedSuccess: {
          return {
            ...state,
            computers: action.payload?.computers || [],
          }
        }
        case actionTypes.RequestStatic: {
          return {
            ...state,
            statics: []
          }
        }
        case actionTypes.StaticLoadedSuccess: {
          return {
            ...state,
            statics: action.payload?.statics || [],
          }
        }
        case actionTypes.ProxyLoadedSuccess: {
          return {
            ...state,
            proxies: action.payload?.proxies || [],
          }
        }

        case actionTypes.HistoryLoadedSuccess: {
          return {
            ...state,
            histories: action.payload?.histories || [],
            loading: false
          }
        }
        case actionTypes.HistoryLoadedFail: {
          return {
            ...state,
            histories: [],
            loading: false
          }
        }
        case actionTypes.ProxyLoadedFail: {
          return {
            ...state,
            proxies: [],
            loading: false
          }
        }

        default:
          return state
      }
    }
)

export const actions = {
  requestHistories: (user_id: number) => ({ type: actionTypes.RequestHistories, payload: { user_id } }),
  fulfillHistories: (histories: HistoryModel[]) => ({ type: actionTypes.HistoryLoadedSuccess, payload: { histories } }),
  fulfillProxy: (proxies: ProxyModel[]) => ({ type: actionTypes.ProxyLoadedSuccess, payload: { proxies } }),
  loadAccountsFail: (message: string) => ({ type: actionTypes.HistoryLoadedFail, payload: { message } }),
  requestComputers: () => ({ type: actionTypes.RequestComputers}),
  requestProxies: () => ({ type: actionTypes.RequestProxy}),
  requestProxiesSub: () => ({ type: actionTypes.RequestProxySub}),
  fulfillComputers: (computers: ComputerModel[]) => ({ type: actionTypes.ComputersLoadedSuccess, payload: { computers } }),
  requestStatics: (user:string) => ({ type: actionTypes.RequestStatic,payload:{user}}),
  fulfillStatics: (statics: ChannelStaticModel[]) => ({ type: actionTypes.StaticLoadedSuccess, payload: { statics } }),
  checkedChange: (data:{vps:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  deleteIpv4Request: (ipv4: string) => ({ type: actionTypes.DeleteIpv4Request, payload: { ipv4} }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestHistories, function* userRequested(param: any) {
    const {data: resutl} = yield getList()
    console.log(resutl)
    yield put(actions.fulfillHistories(resutl.histories))
  })
  yield takeLatest(actionTypes.RequestProxy, function* userRequested(param: any) {
    const {data: resutl} = yield getProxy()
    console.log(resutl)
    yield put(actions.fulfillProxy(resutl.proxies))
  })
  yield takeLatest(actionTypes.RequestProxySub, function* userRequested(param: any) {
    const {data: resutl} = yield getProxySub()
    console.log(resutl)
    yield put(actions.fulfillProxy(resutl.proxies))
  })
  yield takeLatest(actionTypes.RequestComputers, function* userRequested(param: any) {
    const {data: resutl} = yield getComputer()
    console.log(resutl)
    yield put(actions.fulfillComputers(resutl.computers))
  })
  yield takeLatest(actionTypes.RequestStatic, function* userRequested(param: any) {
    const payload = param.payload.user
    const {data: resutl} = yield getStatics(payload)
    console.log(resutl)
    yield put(actions.fulfillStatics(resutl.view7day))
  })
  yield takeLatest(actionTypes.DeleteIpv4Request, function* DeleteIpv4Request(param: any) {
    try {
      const payload = param.payload
      const { data: result } = yield deleteProxy(payload.ipv4)
    } catch (error) {

    }
  })
}