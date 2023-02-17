import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { AccountModel,AccountForm } from '../models/Account'
import {getListAccount, updateAccount, deleteVps, updateResetVPS} from './AccountCRUD'
import {OrderForm, OrderModel} from "../../orders/models/Order";
import {deleteChannel, updateOrder} from "../../orders/redux/OrdersCRUD";
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  RequestAccounts: '[Services] Requested',
  AccountsLoadedSuccess: '[Services] Loaded succcess',
  AccountsLoadedFail: '[Services] load fail',
  ShowCurrentAccount: '[Services] Show services',
  RequestUpdate: '[Services] Requested Update',
  UpdateSuccess: '[Services] Update Success',
  UpdateFail: '[Services] Update Fail',
  ClearSelected:'[Services] Clear selected services',
  DeleteVpsRequest: '[Services] Delete services Request',
  DeleteVpsSuccess: '[Services] Delete services Success',
  DeleteMultiVpsRequest: '[Services] Delete services Request',
  DeleteMultiVpsSuccess: '[Services] Delete services Success',
  CheckedChange: '[Services] Checked Change',
  CheckedAllChange: '[Services] Checked All Change',
  UpdateMultiOrderRequest: '[Services] Update Multi services Request',
  UpdateRestartMultiOrderRequest: '[Services] Update Restart Multi services Request',
  UpdateMultiSuccess: '[Services] Update Multi Success',
}

const initialAccountState: IAccountState = {
  accounts: [],
  loading: false,
  adding:false,
  currentAccount:undefined
}

export interface IAccountState {
  accounts: AccountModel[]
  loading: boolean
  adding:boolean
  currentAccount?:AccountModel
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
      case actionTypes.RequestUpdate: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.UpdateSuccess: {

        const remapAccounts = state.accounts.map((item: AccountModel)=>{
          if(item.service===action.payload?.account?.service){
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
      case actionTypes.DeleteVpsSuccess: {
        return {
          ...state,
          accounts: state.accounts.filter((item: AccountModel) => {
            if (action.payload?.service.indexOf(item.service)>=0)  {
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
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentAccount: action.payload?.currentAccount
        }
      }

      case actionTypes.CheckedChange: {
        return {
          ...state,
          accounts:  state.accounts.map(item=>{
            if(item.service===action.payload?.data?.service){
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
            if(_item.service===item.service){
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
  fulfillAccounts: (accounts: AccountModel[]) => ({ type: actionTypes.AccountsLoadedSuccess, payload: { accounts } }),
  loadAccountsFail: (message: string) => ({ type: actionTypes.AccountsLoadedFail, payload: { message } }),
  requestUpdate: (account: AccountModel) => ({ type: actionTypes.RequestUpdate, payload: { account } }),
  updateSuccess: (account: AccountModel) => ({ type: actionTypes.UpdateSuccess, payload: { account } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showCurrentAccount: (currentAccount: AccountModel) => ({ type: actionTypes.ShowCurrentAccount, payload: { currentAccount } }),
  clearCurrentAccount: () => ({ type: actionTypes.ClearSelected}),
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
  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    //console.log("------update account param-----",param.payload.account)
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
