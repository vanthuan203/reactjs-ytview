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
  getOrderPercentFilter, updateOrderCheck
} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrderCheckCancel] Filter',
  ShowOrdersPercentFilter:'[OrderCheckCancel] Percent Filter',
  RequestOrders: '[OrderCheckCancel] Requested',
  OrdersLoadedSuccess: '[OrderCheckCancel] Loaded succcess',
  OrdersLoadedFail: '[OrderCheckCancel] load fail',
  AddOrderRequest: '[OrderCheckCancel] Add Order Request',
  AddOrderManualRequest: '[OrderCheckCancel] Add Order Manual Request',
  AddOrderSuccess: '[OrderCheckCancel] Add Order Success',
  AddOrdersSuccess: '[OrderCheckCancel] Add Orders Success',
  AddOrderFail: '[OrderCheckCancel] Add Order Fail',
  ShowcurrentOrder: '[OrderCheckCancel] Show Order',
  RequestUpdate: '[OrderCheckCancel] Requested Update',
  RequestUpdateThread: '[OrderCheckCancel] Requested UpdateThread',
  UpdateMultiOrderRequest: '[OrderCheckCancel] Update Multi Order Request',
  UpdateMultiThreadRequest: '[OrderCheckCancel] Update Multi Thread Request',
  UpdateSuccess: '[OrderCheckCancel] Update Success',
  UpdateMultiSuccess: '[OrderCheckCancel] Update Multi Success',
  UpdateFail: '[OrderCheckCancel] Update Fail',
  ClearSelected: '[OrderCheckCancel] Clear selected account',
  GroupLoadedRequest: '[OrderCheckCancel] Group Loaded Request',
  GroupLoadedSuccess: '[OrderCheckCancel] Group Loaded Success',
  GroupLoadedFail: '[OrderCheckCancel] Group Loaded Fail',
  GroupAddRequest: '[OrderCheckCancel] GroupAddRequest',
  GroupAddSuccess: '[OrderCheckCancel] Group Add Success',
  GroupAddFail: '[OrderCheckCancel] Group Add Fail',
  GroupDeleteRequest: '[OrderCheckCancel] Group Delete Request',
  GroupDeleteSuccess: '[OrderCheckCancel] Group Delete Success',
  SelectGroup: '[OrderCheckCancel] Select Group',
  DeleteOrderRequest: '[OrderCheckCancel] Delete Order Request',
  DeleteOrderSuccess: '[OrderCheckCancel] Delete Order Success',
  UpdateOrderCheckRequest: '[OrderCheckCancel] Update OrderCheck Request',
  UpdateOrderCheckSuccess: '[OrderCheckCancel] Update OrderCheck Success',
  CheckedChange: '[OrderCheckCancel] Checked Change',
  CheckedAllChange: '[OrderCheckCancel] Checked All Change',
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
            if (action.payload?.videoid.indexOf(item.videoid)>=0) {
              return false
            }
            return true
          })
        }
      }
      case actionTypes.UpdateOrderCheckSuccess: {
        return {
          ...state,
          orders: state.orders.filter((item: OrderModel) => {
            if (action.payload?.videoid.indexOf(item.videoid)>=0) {
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
          if (item.videoid === action.payload?.videoview?.videoid) {
            return action.payload?.videoview
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
          const findItem = action.payload?.videoview.find((_item:OrderModel)=>{
            if(_item.videoid===item.videoid){
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
            if(item.videoid===action.payload?.data?.videoid){
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
  requestUpdate: (videoview: OrderUpdateForm) => ({ type: actionTypes.RequestUpdate, payload: { videoview } }),
  requestUpdateThread: (videoview: OrderUpdateForm) => ({ type: actionTypes.RequestUpdateThread, payload: { videoview } }),
  updateSuccess: (videoview: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { videoview } }),
  updateMultiSuccess: (videoview: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { videoview } }),
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
  deleteOrderRequest: (videoid: string,cancel:number) => ({ type: actionTypes.DeleteOrderRequest, payload: { videoid,cancel } }),
  updateOrderCheckRequest: (videoid: string) => ({ type: actionTypes.UpdateOrderCheckRequest, payload: { videoid } }),
  updateOrderCheckSuccess: (videoid: string) => ({ type: actionTypes.UpdateOrderCheckSuccess, payload: { videoid} }),
  deleteOrderSuccess: (videoid: string,cancel:number) => ({ type: actionTypes.DeleteOrderSuccess, payload: { videoid,cancel } }),
  checkedChange: (data:{videoid:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrder(payload)
    yield put(actions.fulfillorders(orders.videoview))
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.videoview))
  })

  yield takeLatest(actionTypes.ShowOrdersPercentFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderPercentFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.videoview))
  })


  http://localhost:8080/Fitnees/






  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.videoview)
    if (result && result.videoview) {
      yield put(actions.updateMultiSuccess(result.videoview))
    } else {
      alert(result.message)
      yield put(actions.addOrderFail(result.message))
    }

  })

  yield takeLatest(actionTypes.RequestUpdateThread, function* updateUserRequested(param: any) {
    const { data: result } = yield updateThread(param.payload.videoview)
    if (result && result.videoview) {
      yield put(actions.updateMultiSuccess(result.videoview))
    } else {
      alert(result.message)
      yield put(actions.addOrderFail(result.message))
    }

  })
  
  yield takeLatest(actionTypes.AddOrderManualRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrderManual(payload)
        if (result && (result.videoview)) {
            yield put(actions.addOrderSuccess(result.videoview))
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
        if (result && result.videoview) {
          yield put(actions.updateMultiSuccess(result.videoview))
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
      if (result && result.videoview) {
        yield put(actions.updateMultiSuccess(result.videoview))
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
      const { data: result } = yield deleteChannel(payload.videoid,payload.cancel)
      if (result&&result.videoview!==null) {
        yield put(actions.deleteOrderSuccess(payload.videoid,payload.cancel))
      } else {

      }
    } catch (error) {

    }
  })
  yield takeLatest(actionTypes.UpdateOrderCheckRequest, function* UpdateOrderCheckRequest(param: any) {
    try {
      const payload = param.payload
      const { data: result } = yield updateOrderCheck(payload.videoid)
      if (result&&result.videoview!==null) {
        yield put(actions.updateOrderCheckSuccess(payload.videoid))
      } else {

      }
    } catch (error) {

    }
  })


}
