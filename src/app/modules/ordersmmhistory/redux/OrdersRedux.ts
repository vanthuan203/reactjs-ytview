import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel,  } from '../models/Order'
import { getListOrder,getOrderFilter, updateOrder, addGroup, updateSetting, deleteChannel} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrderSmmhistory] Filter',
  RequestOrders: '[OrderSmmhistory] Requested',
  OrdersLoadedSuccess: '[OrderSmmhistory] Loaded succcess',
  OrdersLoadedFail: '[OrderSmmhistory] load fail',
  AddOrderRequest: '[OrderSmmhistory] Add Order Request',
  AddOrderManualRequest: '[OrderSmmhistory] Add Order Manual Request',
  AddOrderSuccess: '[OrderSmmhistory] Add Order Success',
  AddOrdersSuccess: '[OrderSmmhistory] Add Orders Success',
  AddOrderFail: '[OrderSmmhistory] Add Order Fail',
  ShowcurrentOrder: '[OrderSmmhistory] Show Order',
  RequestUpdate: '[OrderSmmhistory] Requested Update',
  UpdateMultiOrderRequest: '[OrderSmmhistory] Update Multi Order Request',
  UpdateSuccess: '[OrderSmmhistory] Update Success',
  UpdateMultiSuccess: '[OrderSmmhistory] Update Multi Success',
  UpdateFail: '[OrderSmmhistory] Update Fail',
  ClearSelected: '[OrderSmmhistory] Clear selected account',
  GroupLoadedRequest: '[OrderSmmhistory] Group Loaded Request',
  GroupLoadedSuccess: '[OrderSmmhistory] Group Loaded Success',
  GroupLoadedFail: '[OrderSmmhistory] Group Loaded Fail',
  GroupAddRequest: '[OrderSmmhistory] GroupAddRequest',
  GroupAddSuccess: '[OrderSmmhistory] Group Add Success',
  GroupAddFail: '[OrderSmmhistory] Group Add Fail',
  GroupDeleteRequest: '[OrderSmmhistory] Group Delete Request',
  GroupDeleteSuccess: '[OrderSmmhistory] Group Delete Success',
  SelectGroup: '[OrderSmmhistory] Select Group',
  DeleteOrderRequest: '[OrderSmmhistory] Delete Order Request',
  DeleteOrderSuccess: '[OrderSmmhistory] Delete Order Success',
  CheckedChange: '[OrderSmmhistory] Checked Change',
  CheckedAllChange: '[OrderSmmhistory] Checked All Change',
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
            if (item.order_id == action.payload?.order_id) {
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
      case actionTypes.UpdateSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          if (item.order_id === action.payload?.order_history?.order_id) {
            return action.payload?.order_history
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
          const findItem = action.payload?.order_history.find((_item:OrderModel)=>{
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
  requestOrders: (user:string) => ({ type: actionTypes.RequestOrders ,payload:{user}}),
  showordersfilter: (key: string,user:string) => ({ type: actionTypes.ShowOrdersFilter ,payload: { key,user }} ),
  fulfillorders: (orders: OrderModel[]) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  updateSuccess: (order_history: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { order_history } }),
  updateMultiSuccess: (order_history: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { order_history } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showcurrentOrder: (currentOrder: OrderModel) => ({ type: actionTypes.ShowcurrentOrder, payload: { currentOrder } }),
  clearcurrentOrder: () => ({ type: actionTypes.ClearSelected }),
  requestGroups: () => ({ type: actionTypes.GroupLoadedRequest }),
  addGroupRequest: (groupName: string) => ({ type: actionTypes.GroupAddRequest, payload: { groupName } }),
  deleteGroupRequest: (id: number) => ({ type: actionTypes.GroupDeleteRequest, payload: { id } }),
  deleteGroupSuccess: (id: number) => ({ type: actionTypes.GroupDeleteSuccess, payload: { id } }),
  deleteOrderRequest: (videoid: string) => ({ type: actionTypes.DeleteOrderRequest, payload: { videoid } }),
  deleteOrderSuccess: (videoid: string) => ({ type: actionTypes.DeleteOrderSuccess, payload: { videoid } }),
  checkedChange: (data:{order_id:number,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrder(payload)
    yield put(actions.fulfillorders(orders.order_history))
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.order_history))
  })

  http://localhost:8080/Fitnees/

  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.order_history)
    if (result && result.order_history) {
      yield put(actions.updateMultiSuccess(result.order_history))
    } else {
      yield put(actions.addOrderFail(result.message))
    }

  })
  



  yield takeLatest(actionTypes.UpdateMultiOrderRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield updateOrder(payload)
        if (result && result.videoview) {
          yield put(actions.updateMultiSuccess(result.order_history))
        } else {
          yield put(actions.addOrderFail(result.message))
        } 
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })

  yield takeLatest(actionTypes.DeleteOrderRequest, function* DeleteOrderRequest(param: any) {
    try {
      const payload = param.payload.order_id
      const { data: result } = yield deleteChannel(payload)
      if (result&&result.order_history!==null) {
        yield put(actions.deleteOrderSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })


}
