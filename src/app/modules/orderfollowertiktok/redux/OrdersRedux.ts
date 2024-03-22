import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel,  OrderForm, OrderUpdateForm } from '../models/Order'
import {
  getListOrder,
  getOrderFilter,
  updateOrder,
  updateThread,
  addOrder,
  deleteChannel,
  getOrderPercentFilter
} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrderFollowerTikTok] Filter',
  ShowOrdersPercentFilter:'[OrderFollowerTikTok] Percent Filter',
  RequestOrders: '[OrderFollowerTikTok] Requested',
  OrdersLoadedSuccess: '[OrderFollowerTikTok] Loaded succcess',
  OrdersLoadedFail: '[OrderFollowerTikTok] load fail',
  AddOrderRequest: '[OrderFollowerTikTok] Add Order Request',
  AddOrderManualRequest: '[OrderFollowerTikTok] Add Order Manual Request',
  AddOrderSuccess: '[OrderFollowerTikTok] Add Order Success',
  AddOrdersSuccess: '[OrderFollowerTikTok] Add Orders Success',
  AddOrderFail: '[OrderFollowerTikTok] Add Order Fail',
  ShowcurrentOrder: '[OrderFollowerTikTok] Show Order',
  RequestUpdate: '[OrderFollowerTikTok] Requested Update',
  RequestUpdateThread: '[OrderFollowerTikTok] Requested UpdateThread',
  UpdateMultiOrderRequest: '[OrderFollowerTikTok] Update Multi Order Request',
  UpdateMultiThreadRequest: '[OrderFollowerTikTok] Update Multi Thread Request',
  UpdateSuccess: '[OrderFollowerTikTok] Update Success',
  UpdateMultiSuccess: '[OrderFollowerTikTok] Update Multi Success',
  UpdateFail: '[OrderFollowerTikTok] Update Fail',
  ClearSelected: '[OrderFollowerTikTok] Clear selected account',
  GroupLoadedRequest: '[OrderFollowerTikTok] Group Loaded Request',
  GroupLoadedSuccess: '[OrderFollowerTikTok] Group Loaded Success',
  GroupLoadedFail: '[OrderFollowerTikTok] Group Loaded Fail',
  GroupAddRequest: '[OrderFollowerTikTok] GroupAddRequest',
  GroupAddSuccess: '[OrderFollowerTikTok] Group Add Success',
  GroupAddFail: '[OrderFollowerTikTok] Group Add Fail',
  GroupDeleteRequest: '[OrderFollowerTikTok] Group Delete Request',
  GroupDeleteSuccess: '[OrderFollowerTikTok] Group Delete Success',
  SelectGroup: '[OrderFollowerTikTok] Select Group',
  DeleteOrderRequest: '[OrderFollowerTikTok] Delete Order Request',
  DeleteOrderSuccess: '[OrderFollowerTikTok] Delete Order Success',
  CheckedChange: '[OrderFollowerTikTok] Checked Change',
  CheckedAllChange: '[OrderFollowerTikTok] Checked All Change',
}

const initialorderstate: Iorderstate = {
  orders: [],
  loading: false,
  adding: false,
  currentOrder: undefined,
  channel_prior: 0,
  
}

export interface Iorderstate {
  orders: OrderModel[]
  loading: boolean
  adding: boolean
  currentOrder?: OrderModel
  channel_prior: number
}

export const reducer = persistReducer(
  { storage, key: 'v1-orders', whitelist: [] },
  (state: Iorderstate = initialorderstate, action: ActionWithPayload<any>) => {
    switch (action.type) {
      case actionTypes.RequestOrders: {
        return {
          ...state,
          orders: [],
          loading: true
        }
      }
      case actionTypes.ShowOrdersFilter: {
        return {
          ...state,
          orders: [],
          loading: true
        }
      }
      case actionTypes.ShowOrdersPercentFilter: {
        return {
          ...state,
          orders: [],
          loading: true
        }
      }

      case actionTypes.OrdersLoadedSuccess: {
        return {
          ...state,
          orders: action.payload?.orders || [],
          loading: false
        }
      }
      case actionTypes.GroupLoadedSuccess: {
        return {
          ...state,
          groups: action.payload?.groups
        }
      }
      case actionTypes.SelectGroup: {
        return {
          ...state,
          currentGroup: action.payload?.group
        }
      }
   
      case actionTypes.DeleteOrderSuccess: {
        return {
          ...state,
          orders: state.orders.filter((item: OrderModel) => {
            if (action.payload?.tiktok_id==item.tiktok_id) {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.OrdersLoadedFail: {
        return {
          ...state,
          orders: [],
          loading: false
        }
      }
      case actionTypes.RequestUpdate: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestUpdateThread: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.UpdateMultiOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateMultiThreadRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.UpdateSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          if (item.tiktok_id == action.payload?.channel_tiktok?.tiktok_id) {
            return action.payload?.channel_tiktok
          } else {
            return item
          }
        })
        return {
          ...state,
          orders: remaporders,
          loading: true,
          currentOrder: undefined
        }
      }
      case actionTypes.UpdateMultiSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          const findItem = action.payload?.channel_tiktok.find((_item:OrderModel)=>{
            if(_item.tiktok_id===item.tiktok_id){
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
          orders: remaporders,
          loading: false,
          adding: false,
          currentOrder: undefined
        }
      }
      case actionTypes.UpdateFail: {
        return {
          ...state,
          loading: false
        }
      }
      case actionTypes.AddOrderRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.AddOrderSuccess: {
        return {
          ...state,
          adding: false,
          orders: state.orders.concat(action.payload?.order)
        }
      }
      case actionTypes.AddOrdersSuccess: {
        return {
          ...state,
          adding: false,
          orders: state.orders.concat(action.payload?.orders)
        }
      }

      case actionTypes.AddOrderFail: {
        return {
          ...state,
          adding: false,
          message: action.payload?.message
        }
      }
      case actionTypes.ShowcurrentOrder: {
        return {
          ...state,
          currentOrder: action.payload?.currentOrder
        }
      }
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentOrder: action.payload?.currentOrder
        }
      }
      case actionTypes.CheckedChange: {
        return {
          ...state,
          orders:  state.orders.map(item=>{
            if(item.tiktok_id===action.payload?.data?.tiktok_id){
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
          orders:  state.orders.map(item=>{
            return {
              ...item,
              checked:action?.payload?.checked
            }
          })
        }
      }
      
      

      default:
        return state
    }
  }
)

export const actions = {
  requestOrders: (user:string) => ({ type: actionTypes.RequestOrders,payload: { user } }),
  showordersfilter: (key: string,user:string) => ({ type: actionTypes.ShowOrdersFilter ,payload: { key,user }} ),
  showorderspercentfilter: (key: number,user:string) => ({ type: actionTypes.ShowOrdersPercentFilter ,payload: { key ,user}} ),
  fulfillorders: (orders: OrderModel[]) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderRequest: (data: OrderForm) => ({ type: actionTypes.AddOrderRequest, payload: { data } }),
  editMultiOrderRequest: (data: OrderForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  editMultiThreadRequest: (data: OrderForm) => ({ type: actionTypes.UpdateMultiThreadRequest, payload: { data } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (channel_tiktok: OrderUpdateForm) => ({ type: actionTypes.RequestUpdate, payload: { channel_tiktok } }),
  requestUpdateThread: (channel_tiktok: OrderUpdateForm) => ({ type: actionTypes.RequestUpdateThread, payload: { channel_tiktok } }),
  updateSuccess: (channel_tiktok: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { channel_tiktok } }),
  updateMultiSuccess: (channel_tiktok: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { channel_tiktok } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showcurrentOrder: (currentOrder: OrderModel) => ({ type: actionTypes.ShowcurrentOrder, payload: { currentOrder } }),
  clearcurrentOrder: () => ({ type: actionTypes.ClearSelected }),
  requestGroups: () => ({ type: actionTypes.GroupLoadedRequest }),
  addGroupRequest: (groupName: string) => ({ type: actionTypes.GroupAddRequest, payload: { groupName } }),
  deleteGroupRequest: (id: number) => ({ type: actionTypes.GroupDeleteRequest, payload: { id } }),
  deleteGroupSuccess: (id: number) => ({ type: actionTypes.GroupDeleteSuccess, payload: { id } }),
  deleteOrderRequest: (tiktok_id: string,cancel:number) => ({ type: actionTypes.DeleteOrderRequest, payload: { tiktok_id,cancel } }),
  deleteOrderSuccess: (tiktok_id: string,cancel:number) => ({ type: actionTypes.DeleteOrderSuccess, payload: { tiktok_id,cancel } }),
  checkedChange: (data:{tiktok_id: string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrder(payload)
    yield put(actions.fulfillorders(orders.channel_tiktok))
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.channel_tiktok))
  })

  yield takeLatest(actionTypes.ShowOrdersPercentFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderPercentFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.channel_tiktok))
  })


  http://localhost:8080/Fitnees/






  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.channel_tiktok)
    if (result && result.channel_tiktok) {
      yield put(actions.updateMultiSuccess(result.channel_tiktok))
    } else {
      alert(result.message)
      yield put(actions.addOrderFail(result.message))
    }

  })

  yield takeLatest(actionTypes.RequestUpdateThread, function* updateUserRequested(param: any) {
    const { data: result } = yield updateThread(param.payload.channel_tiktok)
    if (result && result.channel_tiktok) {
      yield put(actions.updateMultiSuccess(result.channel_tiktok))
    } else {
      alert(result.message)
      yield put(actions.addOrderFail(result.message))
    }

  })

  yield takeLatest(actionTypes.AddOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrder(payload)
        if (result && (result.channel||result.channels)) {
          if(payload.channel_id.includes("\n")){
            console.log("------channels------",result.channels)
            yield put(actions.addOrdersSuccess(result.channels))
          }else{
            yield put(actions.addOrderSuccess(result.channel))
          }
        } else {
          yield put(actions.addOrderFail(result.message))
        }
      
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.UpdateMultiOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield updateOrder(payload)
        if (result && result.channel_tiktok) {
          yield put(actions.updateMultiSuccess(result.channel_tiktok))
        } else {
          yield put(actions.addOrderFail(result.message))
        } 
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.UpdateMultiThreadRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
      const { data: result } = yield updateThread(payload)
      if (result && result.channel_tiktok) {
        yield put(actions.updateMultiSuccess(result.channel_tiktok))
      } else {
        yield put(actions.addOrderFail(result.message))
      }
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.DeleteOrderRequest, function* DeleteOrderRequest(param: any) {
    try {
      const payload = param.payload
      const { data: result } = yield deleteChannel(payload.tiktok_id,payload.cancel)
      if (result&&result.channel_tiktok!==null) {
        console.log("OKE")
        yield put(actions.deleteOrderSuccess(payload.tiktok_id,payload.cancel))
      } else {

      }
    } catch (error) {

    }
  })


}
