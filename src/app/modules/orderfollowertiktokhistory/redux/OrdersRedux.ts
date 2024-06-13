import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel, OrderPost,OrderFormManual, OrderForm, Group, OrderUpdateForm } from '../models/Order'
import { getListOrder,getOrderFilter, updateOrder, addOrder, addGroup,addOrderManual, updateSetting, deleteChannel, addOrderMulti } from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrdersFollowersTiktokHistory] Filter',
  RequestOrders: '[OrdersFollowersTiktokHistory] Requested',
  OrdersLoadedSuccess: '[OrdersFollowersTiktokHistory] Loaded succcess',
  OrdersLoadedFail: '[OrdersFollowersTiktokHistory] load fail',
  AddOrderRequest: '[OrdersFollowersTiktokHistory] Add Order Request',
  AddOrderManualRequest: '[OrdersFollowersTiktokHistory] Add Order Manual Request',
  AddOrderSuccess: '[OrdersFollowersTiktokHistory] Add Order Success',
  AddOrdersSuccess: '[OrdersFollowersTiktokHistory] Add Orders Success',
  AddOrderFail: '[OrdersFollowersTiktokHistory] Add Order Fail',
  ShowcurrentOrder: '[OrdersFollowersTiktokHistory] Show Order',
  RequestUpdate: '[OrdersFollowersTiktokHistory] Requested Update',
  UpdateMultiOrderRequest: '[OrdersFollowersTiktokHistory] Update Multi Order Request',
  UpdateSuccess: '[OrdersFollowersTiktokHistory] Update Success',
  UpdateMultiSuccess: '[OrdersFollowersTiktokHistory] Update Multi Success',
  UpdateFail: '[OrdersFollowersTiktokHistory] Update Fail',
  ClearSelected: '[OrdersFollowersTiktokHistory] Clear selected account',
  GroupLoadedRequest: '[OrdersFollowersTiktokHistory] Group Loaded Request',
  GroupLoadedSuccess: '[OrdersFollowersTiktokHistory] Group Loaded Success',
  GroupLoadedFail: '[OrdersFollowersTiktokHistory] Group Loaded Fail',
  GroupAddRequest: '[OrdersFollowersTiktokHistory] GroupAddRequest',
  GroupAddSuccess: '[OrdersFollowersTiktokHistory] Group Add Success',
  GroupAddFail: '[OrdersFollowersTiktokHistory] Group Add Fail',
  GroupDeleteRequest: '[OrdersFollowersTiktokHistory] Group Delete Request',
  GroupDeleteSuccess: '[OrdersFollowersTiktokHistory] Group Delete Success',
  SelectGroup: '[OrdersFollowersTiktokHistory] Select Group',
  DeleteOrderRequest: '[OrdersFollowersTiktokHistory] Delete Order Request',
  DeleteOrderSuccess: '[OrdersFollowersTiktokHistory] Delete Order Success',
  CheckedChange: '[OrdersFollowersTiktokHistory] Checked Change',
  CheckedAllChange: '[OrdersFollowersTiktokHistory] Checked All Change',
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
      case actionTypes.UpdateMultiOrderRequest: {
        return {
          ...state,
          adding: true
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
  requestOrders: (user:string) => ({ type: actionTypes.RequestOrders ,payload:{user}}),
  showordersfilter: (key: string,user:string) => ({ type: actionTypes.ShowOrdersFilter ,payload: { key,user }} ),
  fulfillorders: (orders: OrderModel[]) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderRequest: (data: OrderForm) => ({ type: actionTypes.AddOrderRequest, payload: { data } }),
  addOrderManualRequest: (data: OrderFormManual) => ({ type: actionTypes.AddOrderManualRequest, payload: { data } }),
  editMultiOrderRequest: (data: OrderForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (channel_tiktok: OrderUpdateForm) => ({ type: actionTypes.RequestUpdate, payload: { channel_tiktok } }),
  updateSuccess: (channel_tiktok: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { channel_tiktok } }),
  updateMultiSuccess: (channel_tiktok: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { channel_tiktok } }),
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
  deleteOrderRequest: (videoid: string) => ({ type: actionTypes.DeleteOrderRequest, payload: { videoid } }),
  deleteOrderSuccess: (videoid: string) => ({ type: actionTypes.DeleteOrderSuccess, payload: { videoid } }),
  checkedChange: (data:{videoid:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
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

  http://localhost:8080/Fitnees/

  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.channel_tiktok)
    if (result && result.channel_tiktok) {
      yield put(actions.updateMultiSuccess(result.channel_tiktok))
    } else {
      yield put(actions.addOrderFail(result.message))
    }

  })
  
  yield takeLatest(actionTypes.AddOrderManualRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrderManual(payload)
        if (result && (result.channel_tiktok)) {
            yield put(actions.addOrderSuccess(result.channel_tiktok))
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
        if (result && result.channel_tiktok) {
          yield put(actions.updateMultiSuccess(result.channel_tiktok))
        } else {
          yield put(actions.addOrderFail(result.message))
        } 
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.GroupAddRequest, function* addOrderRequest(param: any) {
    try {
      const payload = param.payload.groupName
      const { data: result } = yield addGroup(payload)
      if (result && result.group) {
        yield put(actions.addGroupSuccess(result.group))
      } else {

      }
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.DeleteOrderRequest, function* DeleteOrderRequest(param: any) {
    try {
      const payload = param.payload.videoid
      const { data: result } = yield deleteChannel(payload)
      if (result&&result.channel_tiktok!==null) {
        yield put(actions.deleteOrderSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })


}
