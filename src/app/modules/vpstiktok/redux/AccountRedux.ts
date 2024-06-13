import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { AccountModel,AccountForm,DeviceModel } from '../models/Account'
import {getListAccount,getListDevicesByVPS, updateAccount, deleteVps, updateResetVPS} from './AccountCRUD'
import {OrderForm, OrderModel} from "../../orders/models/Order";
import {deleteChannel, updateOrder} from "../../orders/redux/OrdersCRUD";
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  RequestAccounts: '[VpsTikTok] Requested',
  RequestDevicesByVPS: '[VpsTikTok] Requested Devices',
  DevicesByVPSLoadedSuccess: '[VpsTikTok] Loaded Devices succcess',
  AccountsLoadedSuccess: '[VpsTikTok] Loaded succcess',
  DevicesByVPSLoadedFail: '[VpsTikTok] load Devices fail',
  AccountsLoadedFail: '[VpsTikTok] load fail',
  ShowCurrentAccount: '[VpsTikTok] Show Account',
  ShowCurrentEditAccount: '[VpsTikTok] Show Edits Accounts',
  RequestUpdate: '[VpsTikTok] Requested Update',
  UpdateSuccess: '[VpsTikTok] Update Success',
  UpdateFail: '[VpsTikTok] Update Fail',
  ClearSelected:'[VpsTikTok] Clear selected account',
  ClearSelectedEdit:'[VpsTikTok] Clear selected edit accounts',
  DeleteVpsRequest: '[VpsTikTok] Delete Account Request',
  DeleteVpsSuccess: '[VpsTikTok] Delete Account Success',
  DeleteMultiVpsRequest: '[VpsTikTok] Delete Account Request',
  DeleteMultiVpsSuccess: '[VpsTikTok] Delete Account Success',
  CheckedChange: '[VpsTikTok] Checked Change',
  CheckedDeviceChange: '[VpsTikTok] Checked Device Change',
  CheckedAllChange: '[VpsTikTok] Checked All Change',
  CheckedDevicesAllChange: '[VpsTikTok] Checked Devices All Change',
  UpdateMultiOrderRequest: '[VpsTikTok] Update Multi Account Request',
  UpdateRestartMultiOrderRequest: '[VpsTikTok] Update Restart Multi Account Request',
  UpdateMultiSuccess: '[VpsTikTok] Update Multi Success',
}

const initialAccountState: IAccountState = {
  accounts: [],
  devices: [],
  loading: false,
  adding:false,
  currentAccount:undefined,
  currentEditAccount:undefined,
  currentDevice:undefined
}

export interface IAccountState {
  devices:DeviceModel[]
  accounts: AccountModel[]
  loading: boolean
  adding:boolean
  currentAccount?:AccountModel
  currentEditAccount?:AccountModel
  currentDevice?:DeviceModel
}

export const reducer = persistReducer(
  { storage, key: 'v1-accounts', whitelist: [] },
  (state: IAccountState = initialAccountState, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.RequestAccounts: {
        return {
          ...state,
          accounts: [],
          loading: true
        }
      }
      case actionTypes.RequestDevicesByVPS: {
        return {
          ...state,
          devices: [],
          loading: true
        }
      }
      case actionTypes.AccountsLoadedSuccess: {
        return {
          ...state,
          accounts: action.payload?.accounts || [],
          loading: false
        }
      }
      case actionTypes.AccountsLoadedFail: {
        return {
          ...state,
          accounts: [],
          loading: false
        }
      }
      case actionTypes.DevicesByVPSLoadedSuccess: {
        return {
          ...state,
          devices: action.payload?.devices || [],
          loading: false
        }
      }
      case actionTypes.DevicesByVPSLoadedFail: {
        return {
          ...state,
          devices: [],
          loading: false
        }
      }
      case actionTypes.RequestUpdate: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.UpdateSuccess: {

        const remapAccounts = state.accounts.map((item: AccountModel)=>{
          if(item.vps===action.payload?.account?.vps){
            return action.payload?.account
          }else {
            return item
          }
        })
        return {
          ...state,
          accounts: remapAccounts,
          loading: false,
          currentEditAccount: undefined
        }
      }
      case actionTypes.DeleteVpsSuccess: {
        return {
          ...state,
          accounts: state.accounts.filter((item: AccountModel) => {
            if (action.payload?.vps.indexOf(item.vps)>=0)  {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.UpdateFail: {
        return {
          ...state,
          loading: false
        }
      }
      case actionTypes.ShowCurrentAccount: {
        return {
          ...state,
          currentAccount: action.payload?.currentAccount
        }
      }
      case actionTypes.ShowCurrentEditAccount: {
        return {
          ...state,
          currentEditAccount: action.payload?.currentEditAccount
        }
      }
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentAccount: action.payload?.currentAccount
        }
      }
    case actionTypes.ClearSelectedEdit: {
        return {
          ...state,
          currentEditAccount: action.payload?.currentEditAccount
        }
      }

      case actionTypes.CheckedChange: {
        return {
          ...state,
          accounts:  state.accounts.map(item=>{
            if(item.vps===action.payload?.data?.vps){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }
      case actionTypes.CheckedDeviceChange: {
        return {
          ...state,
          devices:  state.devices.map(item=>{
            if(item.device_id===action.payload?.data?.device_id){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }
      case actionTypes.CheckedAllChange: {
        return {
          ...state,
          accounts:  state.accounts.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
      case actionTypes.CheckedDevicesAllChange: {
        return {
          ...state,
          devices:  state.devices.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
      case actionTypes.UpdateMultiOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateRestartMultiOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateMultiSuccess: {
        const remaporders = state.accounts.map((item: AccountForm) => {
          const findItem = action.payload?.accounts.find((_item:AccountForm)=>{
            if(_item.vps===item.vps){
              return true
            }
            return false
          })
          if(findItem){
            return findItem
          }
          return item
        })
        return {
          ...state,
          accounts: remaporders,
          loading: false,
          adding: false,
          currentAccount: undefined
        }
      }
      default:
        return state
    }
  }
)

export const actions = {
  requestAccounts: () => ({ type: actionTypes.RequestAccounts }),
  requestDevicesByVPS: (vps:string) => ({ type: actionTypes.RequestDevicesByVPS,payload:{vps} }),
  fulfillAccounts: (accounts: AccountModel[]) => ({ type: actionTypes.AccountsLoadedSuccess, payload: { accounts } }),
  fulfillDevicesByVPS: (devices: DeviceModel[]) => ({ type: actionTypes.DevicesByVPSLoadedSuccess, payload: { devices } }),
  loadAccountsFail: (message: string) => ({ type: actionTypes.AccountsLoadedFail, payload: { message } }),
  requestUpdate: (account: AccountModel) => ({ type: actionTypes.RequestUpdate, payload: { account } }),
  updateSuccess: (account: AccountModel) => ({ type: actionTypes.UpdateSuccess, payload: { account } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showCurrentAccount: (currentAccount: AccountModel) => ({ type: actionTypes.ShowCurrentAccount, payload: { currentAccount } }),
  showCurrentEditAccount: (currentEditAccount: AccountModel) => ({ type: actionTypes.ShowCurrentEditAccount, payload: { currentEditAccount } }),
  clearCurrentAccount: () => ({ type: actionTypes.ClearSelected}),
  clearCurrentAccountEdit: () => ({ type: actionTypes.ClearSelectedEdit}),
  deleteVpsRequest: (vps: string) => ({ type: actionTypes.DeleteVpsRequest, payload: { vps } }),
  deleteVpsSuccess: (vps: string) => ({ type: actionTypes.DeleteVpsSuccess, payload: { vps } }),
  checkedChange: (data:{vps:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedDeviceChange: (data:{device_id:string,checked:boolean}) => ({ type: actionTypes.CheckedDeviceChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  checkedDevicesAllChange: (checked:boolean) => ({ type: actionTypes.CheckedDevicesAllChange, payload: { checked } }),
  editMultiOrderRequest: (data: AccountForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  editRestartMultiOrderRequest: (data: AccountForm) => ({ type: actionTypes.UpdateRestartMultiOrderRequest, payload: { data } }),
  updateMultiSuccess: (accounts: AccountForm[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { accounts } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestAccounts, function* userRequested(param: any) {
    const {data: accounts} = yield getListAccount()
    yield put(actions.fulfillAccounts(accounts.accounts))
  })
  yield takeLatest(actionTypes.RequestDevicesByVPS, function* userRequested(param: any) {
    const payload = param.payload.vps
    const {data: devices} = yield getListDevicesByVPS(payload)
    yield put(actions.fulfillDevicesByVPS(devices.devices))
  })
  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    console.log("------update account param-----",param.payload.account)
    const {data: account} = yield updateAccount(param.payload.account)
    console.log("------update account res-----",account.account)
    yield put(actions.updateSuccess(account.account))
  })
  yield takeLatest(actionTypes.DeleteVpsRequest, function* DeleteVpsRequest(param: any) {
    try {
      const payload = param.payload.vps
      const { data: result } = yield deleteVps(payload)
      if (result&&result.vps!==null) {
        yield put(actions.deleteVpsSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })
  yield takeLatest(actionTypes.UpdateMultiOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
      const { data: result } = yield updateAccount(payload)
      if (result && result.accounts) {
        yield put(actions.updateMultiSuccess(result.accounts))
      } else {
        yield put(actions.updateFail(result.message))
      }
    } catch (error) {
      yield put(actions.updateFail(""))
    }
  })

  yield takeLatest(actionTypes.UpdateRestartMultiOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
      const { data: result } = yield updateResetVPS(payload)
      if (result && result.accounts) {
        yield put(actions.updateMultiSuccess(result.accounts))
      } else {
        yield put(actions.updateFail(result.message))
      }
    } catch (error) {
      yield put(actions.updateFail(""))
    }
  })

}
