import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel, OrderPost,OrderFormManual, OrderForm, Group, OrderUpdateForm } from '../models/Order'
import {
  getListOrder,
  getOrderFilter,
  updateOrder,
  updateThread,
  addOrder,
  addOrderManual,
  deleteChannel,
  addOrderMulti,
  getOrderPercentFilter
} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrderRefill] Filter',
  ShowOrdersPercentFilter:'[OrderRefill] Percent Filter',
  RequestOrders: '[OrderRefill] Requested',
  OrdersLoadedSuccess: '[OrderRefill] Loaded succcess',
  OrdersLoadedFail: '[OrderRefill] load fail',
  AddOrderRequest: '[OrderRefill] Add Order Request',
  AddOrderManualRequest: '[OrderRefill] Add Order Manual Request',
  AddOrderSuccess: '[OrderRefill] Add Order Success',
  AddOrdersSuccess: '[OrderRefill] Add Orders Success',
  AddOrderFail: '[OrderRefill] Add Order Fail',
  ShowcurrentOrder: '[OrderRefill] Show Order',
  RequestUpdate: '[OrderRefill] Requested Update',
  RequestUpdateThread: '[OrderRefill] Requested UpdateThread',
  UpdateMultiOrderRequest: '[OrderRefill] Update Multi Order Request',
  UpdateMultiThreadRequest: '[OrderRefill] Update Multi Thread Request',
  UpdateSuccess: '[OrderRefill] Update Success',
  UpdateMultiSuccess: '[OrderRefill] Update Multi Success',
  UpdateFail: '[OrderRefill] Update Fail',
  ClearSelected: '[OrderRefill] Clear selected account',
  GroupLoadedRequest: '[OrderRefill] Group Loaded Request',
  GroupLoadedSuccess: '[OrderRefill] Group Loaded Success',
  GroupLoadedFail: '[OrderRefill] Group Loaded Fail',
  GroupAddRequest: '[OrderRefill] GroupAddRequest',
  GroupAddSuccess: '[OrderRefill] Group Add Success',
  GroupAddFail: '[OrderRefill] Group Add Fail',
  GroupDeleteRequest: '[OrderRefill] Group Delete Request',
  GroupDeleteSuccess: '[OrderRefill] Group Delete Success',
  SelectGroup: '[OrderRefill] Select Group',
  DeleteOrderRequest: '[OrderRefill] Delete Order Request',
  DeleteOrderSuccess: '[OrderRefill] Delete Order Success',
  CheckedChange: '[OrderRefill] Checked Change',
  CheckedAllChange: '[OrderRefill] Checked All Change',
}

const initialorderstate: Iorderstate = {
  orders: [],
  loading: false,
  adding: false,
  groups: [],
  currentOrder: undefined,
  currentGroup: undefined,
  channel_prior: 0,
  
}

export interface Iorderstate {
  orders: OrderModel[]
  loading: boolean
  adding: boolean
  currentOrder?: OrderModel
  groups: Group[]
  currentGroup?: Group
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
      case actionTypes.GroupDeleteSuccess: {
        return {
          ...state,
          currentGroup: undefined,
          groups: state.groups.filter((item: Group) => {
            if (item.id === action.payload?.id) {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.DeleteOrderSuccess: {
        return {
          ...state,
          orders: state.orders.filter((item: OrderModel) => {
            if (action.payload?.order_id.indexOf(item.order_id)>=0) {
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
          if (item.order_id == action.payload?.order_running?.order_id) {
            return action.payload?.order_running
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
          const findItem = action.payload?.order_running.find((_item:OrderModel)=>{
            if(_item.order_id==item.order_id){
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
      case actionTypes.AddOrderManualRequest: {
        return {
          ...state,
          adding: true
        }
      }
      case actionTypes.GroupAddSuccess: {
        return {
          ...state,
          groups: state.groups.concat(action.payload?.group)
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
            if(item.order_id==action.payload?.data?.order_id){
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
  addOrderManualRequest: (data: OrderFormManual) => ({ type: actionTypes.AddOrderManualRequest, payload: { data } }),
  editMultiOrderRequest: (data: OrderForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  editMultiThreadRequest: (data: OrderForm) => ({ type: actionTypes.UpdateMultiThreadRequest, payload: { data } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (order_running: OrderUpdateForm) => ({ type: actionTypes.RequestUpdate, payload: { order_running } }),
  requestUpdateThread: (order_running: OrderUpdateForm) => ({ type: actionTypes.RequestUpdateThread, payload: { order_running } }),
  updateSuccess: (order_running: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { order_running } }),
  updateMultiSuccess: (order_running: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { order_running } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showcurrentOrder: (currentOrder: OrderModel) => ({ type: actionTypes.ShowcurrentOrder, payload: { currentOrder } }),
  clearcurrentOrder: () => ({ type: actionTypes.ClearSelected }),
  requestGroups: () => ({ type: actionTypes.GroupLoadedRequest }),
  fulfillGroups: (groups: Group[]) => ({ type: actionTypes.GroupLoadedSuccess, payload: { groups } }),
  addGroupRequest: (groupName: string) => ({ type: actionTypes.GroupAddRequest, payload: { groupName } }),
  addGroupSuccess: (group: Group) => ({ type: actionTypes.GroupAddSuccess, payload: { group } }),
  deleteGroupRequest: (id: number) => ({ type: actionTypes.GroupDeleteRequest, payload: { id } }),
  deleteGroupSuccess: (id: number) => ({ type: actionTypes.GroupDeleteSuccess, payload: { id } }),
  selectGroup: (group: Group) => ({ type: actionTypes.SelectGroup, payload: { group } }),
  deleteOrderRequest: (order_id: string,cancel:number) => ({ type: actionTypes.DeleteOrderRequest, payload: { order_id,cancel } }),
  deleteOrderSuccess: (order_id: string,cancel:number) => ({ type: actionTypes.DeleteOrderSuccess, payload: { order_id,cancel } }),
  checkedChange: (data:{order_id:number,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrder(payload)
    yield put(actions.fulfillorders(orders.order_running))
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.order_running))
  })

  yield takeLatest(actionTypes.ShowOrdersPercentFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderPercentFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.order_running))
  })


  http://localhost:8080/Fitnees/






  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.order_running)
    if (result && result.order_running) {
      yield put(actions.updateMultiSuccess(result.order_running))
    } else {
      alert(result.message)
      yield put(actions.addOrderFail(result.message))
    }

  })

  yield takeLatest(actionTypes.RequestUpdateThread, function* updateUserRequested(param: any) {
    const { data: result } = yield updateThread(param.payload.order_running)
    if (result && result.order_running) {
      yield put(actions.updateMultiSuccess(result.order_running))
    } else {
      alert(result.message)
      yield put(actions.addOrderFail(result.message))
    }

  })
  
  yield takeLatest(actionTypes.AddOrderManualRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrderManual(payload)
        if (result && (result.order_running)) {
            yield put(actions.addOrderSuccess(result.order_running))
        } else {
          yield put(actions.addOrderFail(result.message))
        }
      
    } catch (error) {
      yield put(actions.addOrderFail(""))
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
        if (result && result.order_running) {
          yield put(actions.updateMultiSuccess(result.order_running))
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
      if (result && result.order_running) {
        yield put(actions.updateMultiSuccess(result.order_running))
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
      const { data: result } = yield deleteChannel(payload.order_id,payload.cancel)
      if (result&&result.order_running!==null) {
        yield put(actions.deleteOrderSuccess(payload.order_id,payload.cancel))
      } else {

      }
    } catch (error) {

    }
  })


}
