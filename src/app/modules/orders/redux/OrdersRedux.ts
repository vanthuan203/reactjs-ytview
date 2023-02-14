import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel, OrderPost,OrderFormManual, OrderForm, Group, OrderUpdateForm } from '../models/Order'
import { getListOrder, updateOrder, addOrder, addOrderManual,  updateSetting, deleteChannel, addOrderMulti } from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  RequestOrders: '[Orders] Requested',
  OrdersLoadedSuccess: '[Orders] Loaded succcess',
  OrdersLoadedFail: '[Orders] load fail',
  AddOrderRequest: '[Orders] Add Order Request',
  AddOrderManualRequest: '[Orders] Add Order Manual Request',
  AddOrderSuccess: '[Orders] Add Order Success',
  AddOrdersSuccess: '[Orders] Add Orders Success',
  AddOrderFail: '[Orders] Add Order Fail',
  ShowcurrentOrder: '[orders] Show Account',
  RequestUpdate: '[orders] Requested Update',
  UpdateMultiOrderRequest: '[orders] Update Multi Order Request',
  UpdateSuccess: '[orders] Update Success',
  UpdateMultiSuccess: '[orders] Update Multi Success',
  UpdateFail: '[orders] Update Fail',
  ClearSelected: '[orders] Clear selected account',
  GroupLoadedRequest: '[orders] Group Loaded Request',
  GroupLoadedSuccess: '[orders] Group Loaded Success',
  GroupLoadedFail: '[orders] Group Loaded Fail',
  GroupAddRequest: '[orders] GroupAddRequest',
  GroupAddSuccess: '[orders] Group Add Success',
  GroupAddFail: '[orders] Group Add Fail',
  GroupDeleteRequest: '[orders] Group Delete Request',
  GroupDeleteSuccess: '[orders] Group Delete Success',
  SelectGroup: '[orders] Select Group',
  DeleteOrderRequest: '[orders] Delete Order Request',
  DeleteOrderSuccess: '[orders] Delete Order Success',
  CheckedChange: '[orders] Checked Change',
  CheckedAllChange: '[orders] Checked All Change',
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
            if (item.channel_id === action.payload?.channel_id) {
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
        const remaporders = state.orders.map((item: OrderUpdateForm) => {
          if (item.channel_id === action.payload?.order?.channel_id) {
            return action.payload?.order
          } else {
            return item
          }
        })
        return {
          ...state,
          orders: remaporders,
          loading: false,
          currentOrder: undefined
        }
      }
      case actionTypes.UpdateMultiSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          const findItem = action.payload?.channels.find((_item:OrderModel)=>{
            if(_item.channel_id===item.channel_id){
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
            if(item.channel_id===action.payload?.data?.channel_id){
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
  requestOrders: () => ({ type: actionTypes.RequestOrders }),
  fulfillorders: (orders: OrderModel[]) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderRequest: (data: OrderForm) => ({ type: actionTypes.AddOrderRequest, payload: { data } }),
  addOrderManualRequest: (data: OrderFormManual) => ({ type: actionTypes.AddOrderManualRequest, payload: { data } }),
  editMultiOrderRequest: (data: OrderForm) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { data } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (order: OrderUpdateForm) => ({ type: actionTypes.RequestUpdate, payload: { order } }),
  updateSuccess: (order: OrderUpdateForm) => ({ type: actionTypes.UpdateSuccess, payload: { order } }),
  updateMultiSuccess: (channels: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { channels } }),
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
  deleteOrderRequest: (channel_id: string) => ({ type: actionTypes.DeleteOrderRequest, payload: { channel_id } }),
  deleteOrderSuccess: (channel_id: string) => ({ type: actionTypes.DeleteOrderSuccess, payload: { channel_id } }),
  checkedChange: (data:{channel_id:string,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const { data: orders } = yield getListOrder()
    yield put(actions.fulfillorders(orders.channels))
  })



  http://localhost:8080/Fitnees/





  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.order)
    if (result && result.channel) {
      yield put(actions.updateSuccess(result.channel))
    } else {
      yield put(actions.addOrderFail(result.message))
    }

  })
  
  yield takeLatest(actionTypes.AddOrderManualRequest, function* addOrderRequest(param: any) {
    const payload = param.payload.data
    try {
        const { data: result } = yield addOrderManual(payload)
        if (result && (result.channel)) {
            yield put(actions.addOrderSuccess(result.status))
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
        if (result && result.channels) {
          yield put(actions.updateMultiSuccess(result.channels))
        } else {
          yield put(actions.addOrderFail(result.message))
        } 
    } catch (error) {
      yield put(actions.addOrderFail(""))
    }
  })


  yield takeLatest(actionTypes.DeleteOrderRequest, function* DeleteOrderRequest(param: any) {
    try {
      const payload = param.payload.channel_id
      const { data: result } = yield deleteChannel(payload)
      if (result&&result.channel!==null) {
        yield put(actions.deleteOrderSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })


}
