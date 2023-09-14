import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel,OrderModelCmt, OrderPost,OrderFormManual, OrderForm, Group, OrderUpdateForm } from '../models/Order'
import {
  getListOrderCmt,
  getListOrder,
  getOrderFilter,
  updateOrder,
  updateOrderCmt,
  addOrder,
  addGroup,
  addOrderManual,
  updateSetting,
  deleteChannel,
  addOrderMulti,
} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrderhistoryFind] Filter',
  RequestOrders: '[OrderhistoryFind] Requested',
  RequestOrderCmt: '[OrderhistoryFind] Requested Cmt',
  OrdersLoadedSuccess: '[OrderhistoryFind] Loaded succcess',
  OrdersLoadedCmtSuccess: '[OrderhistoryFind] Loaded Cmt succcess',
  OrdersLoadedFail: '[OrderhistoryFind] load fail',
  AddOrderRequest: '[OrderhistoryFind] Add Order Request',
  AddOrderManualRequest: '[OrderhistoryFind] Add Order Manual Request',
  AddOrderSuccess: '[OrderhistoryFind] Add Order Success',
  AddOrdersSuccess: '[OrderhistoryFind] Add Orders Success',
  AddOrderFail: '[OrderhistoryFind] Add Order Fail',
  ShowcurrentOrder: '[OrderhistoryFind] Show Order',
  ShowcurrentOrderCmt: '[OrderhistoryFind] Show Order Cmt',
  RequestUpdate: '[OrderhistoryFind] Requested Update',
  RequestUpdateCmt: '[OrderhistoryFind] Requested Cmt Update',
  UpdateMultiOrderRequest: '[OrderhistoryFind] Update Multi Order Request',
  UpdateSuccess: '[OrderhistoryFind] Update Success',
  UpdateMultiSuccess: '[OrderhistoryFind] Update Multi Success',
  UpdateMultiCmtSuccess: '[OrderhistoryFind] Update  Multi Cmt Success',
  UpdateFail: '[OrderhistoryFind] Update Fail',
  ClearSelected: '[OrderhistoryFind] Clear selected account',
  GroupLoadedRequest: '[OrderhistoryFind] Group Loaded Request',
  GroupLoadedSuccess: '[OrderhistoryFind] Group Loaded Success',
  GroupLoadedFail: '[OrderhistoryFind] Group Loaded Fail',
  GroupAddRequest: '[OrderhistoryFind] GroupAddRequest',
  GroupAddSuccess: '[OrderhistoryFind] Group Add Success',
  GroupAddFail: '[OrderhistoryFind] Group Add Fail',
  GroupDeleteRequest: '[OrderhistoryFind] Group Delete Request',
  GroupDeleteSuccess: '[OrderhistoryFind] Group Delete Success',
  SelectGroup: '[OrderhistoryFind] Select Group',
  DeleteOrderRequest: '[OrderhistoryFind] Delete Order Request',
  DeleteOrderSuccess: '[OrderhistoryFind] Delete Order Success',
  CheckedChange: '[OrderhistoryFind] Checked Change',
  CheckedChangeCmt: '[OrderhistoryFind] Checked Change Cmt',
  CheckedAllChange: '[OrderhistoryFind] Checked All Change',
  CheckedAllChangeCmt: '[OrderhistoryFind] Checked All Change Cmt',
}

const initialorderstate: Iorderstate = {
  orders: [],
  ordersCmt: [],
  loading: false,
  adding: false,
  groups: [],
  currentOrder: undefined,
  currentOrderCmt: undefined,
  currentGroup: undefined,
  channel_prior: 0,
  
}

export interface Iorderstate {
  orders: OrderModel[]
  ordersCmt: OrderModelCmt[]
  loading: boolean
  adding: boolean
  currentOrder?: OrderModel
  currentOrderCmt?: OrderModelCmt
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
      case actionTypes.RequestOrderCmt: {
        return {
          ...state,
          ordersCmt: [],
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
      case actionTypes.OrdersLoadedCmtSuccess: {
        return {
          ...state,
          ordersCmt: action.payload?.orders || [],
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
            if (item.videoid === action.payload?.videoid) {
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
      case actionTypes.RequestUpdateCmt: {
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
          if (item.videoid === action.payload?.videoview?.videoid) {
            return action.payload?.videoview
          } else {
            return item
          }
        })
        return {
          ...state,
          orders: remaporders,
          adding: true,
          loading: true,
          currentOrder: undefined
        }
      }
      case actionTypes.UpdateMultiSuccess: {
        const remaporders = state.orders.map((item: OrderModel) => {
          const findItem = action.payload?.videoview.find((_item:OrderModel)=>{
            if(_item.orderid==item.orderid){
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
      case actionTypes.UpdateMultiCmtSuccess: {
        const remaporders = state.ordersCmt.map((item: OrderModelCmt) => {
          const findItem = action.payload?.videocomment.find((_item:OrderModelCmt)=>{
            if(_item.orderid==item.orderid){
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
          ordersCmt: remaporders,
          loading: false,
          adding: false,
          currentOrderCmt: undefined
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
      case actionTypes.ShowcurrentOrderCmt: {
        return {
          ...state,
          currentOrderCmt: action.payload?.currentOrderCmt
        }
      }
      case actionTypes.ClearSelected: {
        return {
          ...state,
          currentOrder: action.payload?.currentOrder,
          currentOrderCmt: action.payload?.currentOrderCmt
        }
      }
      case actionTypes.CheckedChange: {
        return {
          ...state,
          orders:  state.orders.map(item=>{
            if(item.orderid===action.payload?.data?.orderid){
              return {
                ...item,
                checked:action?.payload?.data?.checked
              }
            }
            return item
          })
        }
      }
      case actionTypes.CheckedChangeCmt: {
        return {
          ...state,
          ordersCmt:  state.ordersCmt.map(item=>{
            if(item.orderid===action.payload?.data?.orderid){
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
      case actionTypes.CheckedAllChangeCmt: {
        return {
          ...state,
          ordersCmt:  state.ordersCmt.map(item=>{
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
  requestOrderCmt: (user:string) => ({ type: actionTypes.RequestOrderCmt ,payload:{user}}),
  showordersfilter: (key: string,user:string) => ({ type: actionTypes.ShowOrdersFilter ,payload: { key,user }} ),
  fulfillorders: (orders: OrderModel[]) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders } }),
  fulfillorderCmt: (orders: OrderModelCmt[]) => ({ type: actionTypes.OrdersLoadedCmtSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderRequest: (data: OrderForm) => ({ type: actionTypes.AddOrderRequest, payload: { data } }),
  addOrderManualRequest: (data: OrderFormManual) => ({ type: actionTypes.AddOrderManualRequest, payload: { data } }),
  editMultiOrderRequest: (orderid: string) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { orderid } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (orderid: string) => ({ type: actionTypes.RequestUpdate, payload: { orderid } }),
  requestUpdateCmt: (orderid: string) => ({ type: actionTypes.RequestUpdateCmt, payload: { orderid } }),
  updateSuccess: (videoview: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { videoview } }),
  updateMultiSuccess: (videoview: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { videoview } }),
  updateMultiCmtSuccess: (videocomment: OrderModelCmt[]) => ({ type: actionTypes.UpdateMultiCmtSuccess, payload: { videocomment } }),
  updateFail: (message: string) => ({ type: actionTypes.UpdateFail, payload: { message } }),
  showcurrentOrder: (currentOrder: OrderModel) => ({ type: actionTypes.ShowcurrentOrder, payload: { currentOrder } }),
  showcurrentOrderCmt: (currentOrderCmt: OrderModelCmt) => ({ type: actionTypes.ShowcurrentOrderCmt, payload: { currentOrderCmt } }),
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
  checkedChange: (data:{orderid:number,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedChangeCmt: (data:{orderid:number,checked:boolean}) => ({ type: actionTypes.CheckedChangeCmt, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  checkedAllChangeCmt: (checked:boolean) => ({ type: actionTypes.CheckedAllChangeCmt, payload: { checked } }),
}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrder(payload)
    yield put(actions.fulfillorders(orders.videoview))
  })
  yield takeLatest(actionTypes.RequestOrderCmt, function* userRequestedcmt(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrderCmt(payload)
    yield put(actions.fulfillorderCmt(orders.videocomment))
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.videoview))
  })

  http://localhost:8080/Fitnees/

  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.orderid)
    if (result && result.videoview) {
      yield put(actions.updateMultiSuccess(result.videoview))
    } else {
      yield put(actions.updateFail(result.message))
    }

  })

  yield takeLatest(actionTypes.RequestUpdateCmt, function* updateUserRequestedCmt(param: any) {
    const { data: result } = yield updateOrderCmt(param.payload.orderid)
    if (result && result.videocomment) {
      yield put(actions.updateMultiCmtSuccess(result.videocomment))
      console.log(actions.updateMultiCmtSuccess(result.videocomment))
    } else {
      yield put(actions.updateFail(result.message))
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

  yield takeLatest(actionTypes.UpdateMultiOrderRequest, function* updateUserRequested(param: any) {
    try {
      const { data: result } = yield updateOrder(param.payload.orderid)
        if (result && result.videoview) {
          yield put(actions.updateMultiSuccess(result.videoview))
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
      if (result&&result.videoview!==null) {
        yield put(actions.deleteOrderSuccess(payload))
      } else {

      }
    } catch (error) {

    }
  })


}
