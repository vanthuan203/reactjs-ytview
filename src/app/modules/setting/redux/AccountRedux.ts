import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { AccountModel,AccountForm,AccountLimitModel,AccountLimitForm,ProxySettingModel,ProxySettingForm } from '../models/Account'
import {
  getListAccount,
  updateAccount,
  deleteVps,
  updateResetVPS,
  getListLimitService,
  updateAccountLimit,getListProxySetting,updateProxySetting
} from './AccountCRUD'
import {OrderForm, OrderModel} from "../../orders/models/Order";
import {deleteChannel, updateOrder} from "../../orders/redux/OrdersCRUD";
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  RequestAccounts: '[Setting] Requested',
  RequestAccountLimit: '[Setting] Requested Limit',
  RequestProxySetting: '[Proxy] Requested Setting',
  AccountsLoadedSuccess: '[Setting] Loaded succcess',
  AccountLimitLoadedSuccess: '[Setting] Loaded Limit succcess',
  ProxySettingLoadedSuccess: '[Proxy] Loaded Setting succcess',
  AccountsLoadedFail: '[Setting] load fail',
  AccountLimitLoadedFail: '[Setting] load Limit fail',
  ProxySettingLoadedFail: '[Proxy] load Setting fail',
  ShowCurrentAccount: '[Setting] Show Account',
  ShowCurrentAccountLimit: '[Setting] Show Account Limit',
  ShowCurrentProxySetting: '[Proxy] Show Setting Limit',
  RequestUpdate: '[Setting] Requested Update',
  RequestUpdateLimit: '[Setting] Requested Update Limit',
  RequestUpdateProxySetting: '[Proxy] Requested Update Setting',
  UpdateSuccess: '[Setting] Update Success',
  UpdateLimitSuccess: '[Setting] Update Limit Success',
  UpdateProxySettingSuccess: '[Proxy] Update Setting Success',
  UpdateFail: '[Setting] Update Fail',
  ClearSelected:'[Setting] Clear selected account',
  ClearSelectedLimit:'[Setting] Clear selected account limit',
  ClearSelectedProxySetting:'[Proxy] Clear selected account Setting',
  DeleteVpsRequest: '[Setting] Delete Account Request',
  DeleteVpsSuccess: '[Setting] Delete Account Success',
  DeleteMultiVpsRequest: '[Setting] Delete Account Request',
  DeleteMultiVpsSuccess: '[Setting] Delete Account Success',
  CheckedChange: '[Setting] Checked Change',
  CheckedAllChange: '[Setting] Checked All Change',
  UpdateMultiOrderRequest: '[Setting] Update Multi Account Request',
  UpdateRestartMultiOrderRequest: '[Users] Update Restart Multi Account Request',
  UpdateMultiSuccess: '[Setting] Update Multi Success',
}

const initialAccountState: IAccountState = {
  accounts: [],
  accountlimit: [],
  proxysetting: [],
  loading: false,
  adding:false,
  currentAccount:undefined,
  currentAccountLimit:undefined,
  currentProxySetting:undefined
}

export interface IAccountState {
  accounts: AccountModel[]
  accountlimit: AccountLimitModel[]
  proxysetting: ProxySettingModel[]
  loading: boolean
  adding:boolean
  currentAccount?:AccountModel
  currentAccountLimit?:AccountLimitModel
  currentProxySetting?:ProxySettingModel
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
      case actionTypes.RequestAccountLimit: {
        return {
          ...state,
          accountlimit: [],
          loading: true
        }
      }
            case actionTypes.RequestProxySetting: {
        return {
          ...state,
          proxysetting: [],
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
      case actionTypes.AccountLimitLoadedSuccess: {
        return {
          ...state,
          accountlimit: action.payload?.accountlimit || [],
          loading: false
        }
      }
      case actionTypes.ProxySettingLoadedSuccess: {
        return {
          ...state,
          proxysetting: action.payload?.proxysetting || [],
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
      case actionTypes.AccountLimitLoadedFail: {
        return {
          ...state,
          accountlimit: [],
          loading: false
        }
      }
      case actionTypes.ProxySettingLoadedFail: {
        return {
          ...state,
          proxysetting: [],
          loading: false
        }
      }

      case actionTypes.RequestUpdate: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestAccountLimit: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestProxySetting: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.UpdateSuccess: {

        const remapAccounts = state.accounts.map((item: AccountModel)=>{
          if(item.id===action.payload?.account?.id){
            return action.payload?.account
          }else {
            return item
          }
        })
        return {
          ...state,
          accounts: remapAccounts,
          loading: false,
          currentAccount: undefined
        }
      }
      case actionTypes.UpdateLimitSuccess: {

        const remapAccounts = state.accountlimit.map((item: AccountLimitModel)=>{
          if(item.id===action.payload?.accountlimit?.id){
            return action.payload?.accountlimit
          }else {
            return item
          }
        })
        return {
          ...state,
          accountlimit: remapAccounts,
          loading: false,
          currentAccountLimit: undefined
        }
      }
      case actionTypes.UpdateProxySettingSuccess: {

        const remapAccounts = state.proxysetting.map((item: ProxySettingModel)=>{
          if(item.id===action.payload?.proxysetting?.id){
            return action.payload?.proxysetting
          }else {
            return item
          }
        })
        return {
          ...state,
          proxysetting: remapAccounts,
          loading: false,
          currentProxySetting: undefined
        }
      }
      case actionTypes.DeleteVpsSuccess: {
        return {
          ...state,
          accounts: state.accounts.filter((item: AccountModel) => {
            if (action.payload?.id===item.id)  {
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
      case actionTypes.ShowCurrentAccountLimit: {
        return {
          ...state,
          currentAccountLimit: action.payload?.currentAccountLimit
        }
      }
      case actionTypes.ShowCurrentProxySetting: {
        return {
          ...state,
          currentProxySetting: action.payload?.currentProxySetting
        }
      }
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentAccount: action.payload?.currentAccount
        }
      }
      case actionTypes.ClearSelectedLimit: {
        return {
          ...state,
          currentAccountLimit: action.payload?.currentAccountLimit
        }
      }
      case actionTypes.ClearSelectedProxySetting: {
        return {
          ...state,
          currentProxySetting: action.payload?.currentProxySetting
        }
      }
      case actionTypes.CheckedChange: {
        return {
          ...state,
          accounts:  state.accounts.map(item=>{
            if(item.id===action.payload?.data?.id){
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
        const remaporders = state.accounts.map((item:AccountForm) => {
          const findItem = action.payload?.accounts.find((_item:AccountForm)=>{
            if(_item.id ===item.id){
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
  requestAccountLimit: () => ({ type: actionTypes.RequestAccountLimit }),
  requestProxySetting: () => ({ type: actionTypes.RequestProxySetting }),
  fulfillAccounts: (accounts: AccountModel[]) => ({ type: actionTypes.AccountsLoadedSuccess, payload: { accounts } }),
  fulfillAccountLimit: (accountlimit: AccountLimitModel[]) => ({ type: actionTypes.AccountLimitLoadedSuccess, payload: { accountlimit } }),
  fulfillProxySetting: (proxysetting: ProxySettingModel[]) => ({ type: actionTypes.ProxySettingLoadedSuccess, payload: { proxysetting } }),
  loadAccountsFail: (message: string) => ({ type: actionTypes.AccountsLoadedFail, payload: { message } }),
  requestUpdate: (account: AccountModel) => ({ type: actionTypes.RequestUpdate, payload: { account } }),
  requestUpdateLimit: (accountlimit: AccountLimitModel) => ({ type: actionTypes.RequestUpdateLimit, payload: { accountlimit } }),
  requestUpdateProxySetting: (proxysetting: ProxySettingModel) => ({ type: actionTypes.RequestUpdateProxySetting, payload: { proxysetting } }),
  updateSuccess: (account: AccountModel) => ({ type: actionTypes.UpdateSuccess, payload: { account } }),
  updateLimitSuccess: (accountlimit: AccountLimitModel) => ({ type: actionTypes.UpdateLimitSuccess, payload: { accountlimit } }),
  updateProxySettingSuccess: (proxysetting: ProxySettingModel) => ({ type: actionTypes.UpdateProxySettingSuccess, payload: { proxysetting } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showCurrentAccount: (currentAccount: AccountModel) => ({ type: actionTypes.ShowCurrentAccount, payload: { currentAccount } }),
  showCurrentAccountLimit: (currentAccountLimit: AccountLimitModel) => ({ type: actionTypes.ShowCurrentAccountLimit, payload: { currentAccountLimit } }),
  showCurrentProxySetting: (currentProxySetting: ProxySettingModel) => ({ type: actionTypes.ShowCurrentProxySetting, payload: { currentProxySetting } }),
  clearCurrentAccount: () => ({ type: actionTypes.ClearSelected}),
  clearCurrentAccountLimit: () => ({ type: actionTypes.ClearSelectedLimit}),
  clearCurrentProxySetting: () => ({ type: actionTypes.ClearSelectedProxySetting}),
  deleteVpsRequest: (vps: string) => ({ type: actionTypes.DeleteVpsRequest, payload: { vps } }),
  deleteVpsSuccess: (vps: string) => ({ type: actionTypes.DeleteVpsSuccess, payload: { vps } }),
  checkedChange: (data:{username:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  editMultiOrderRequest: (data: AccountForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  editRestartMultiOrderRequest: (data: AccountForm) => ({ type: actionTypes.UpdateRestartMultiOrderRequest, payload: { data } }),
  updateMultiSuccess: (accounts: AccountForm[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { accounts } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestAccounts, function* userRequested(param: any) {
    const {data: accounts} = yield getListAccount()
    yield put(actions.fulfillAccounts(accounts.accounts))
  })
  yield takeLatest(actionTypes.RequestAccountLimit, function* userRequested(param: any) {
    const {data: accountlimit} = yield getListLimitService()
    yield put(actions.fulfillAccountLimit(accountlimit.accountlimit))
  })
  yield takeLatest(actionTypes.RequestProxySetting, function* userRequested(param: any) {
    const {data: proxysetting} = yield getListProxySetting()
    yield put(actions.fulfillProxySetting(proxysetting.proxysetting))
  })
  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    //console.log("------update account param-----",param.payload.account)
    const {data: account} = yield updateAccount(param.payload.account)
    console.log("------update account res-----",account.account)
    yield put(actions.updateSuccess(account.account))
  })
  yield takeLatest(actionTypes.RequestUpdateLimit, function* updateUserRequested(param: any) {
    //console.log("------update account param-----",param.payload.account)
    const {data: accountlimit} = yield updateAccountLimit(param.payload.accountlimit)
    console.log("------update account res-----",accountlimit.accountlimit)
    yield put(actions.updateLimitSuccess(accountlimit.accountlimit))
  })
  yield takeLatest(actionTypes.RequestUpdateProxySetting, function* updateUserRequested(param: any) {
    //console.log("------update account param-----",param.payload.account)
    const {data: proxysetting} = yield updateProxySetting(param.payload.proxysetting)
    console.log("------update account res-----",proxysetting.proxysetting)
    yield put(actions.updateProxySettingSuccess(proxysetting.proxysetting))
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
