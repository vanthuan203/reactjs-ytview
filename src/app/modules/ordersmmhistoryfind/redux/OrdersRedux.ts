import { Action } from '@reduxjs/toolkit'
import { App } from 'app/App'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { OrderModel,OrderModelCmt,OrderModelFollower, OrderPost,OrderFormManual, OrderForm, Group, OrderUpdateForm } from '../models/Order'
import {
  getListOrderCmt,
  getListOrder,
  getOrderFilter,
  updateOrder,
  updateOrderRefill,
  updateOrderFollwer,
  addOrder,
  addGroup,
  addOrderManual,
  updateSetting,
  deleteChannel,
  addOrderMulti, getListOrderFollowerTiktok,
} from './OrdersCRUD'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  ShowOrdersFilter:'[OrderSmmhistoryFind] Filter',
  RequestOrders: '[OrderSmmhistoryFind] Requested',
  RequestOrderCmt: '[OrderSmmhistoryFind] Requested Cmt',
  RequestOrderFollowerTiktok: '[OrderSmmhistoryFind] Requested Follower Tiktok',
  OrdersLoadedSuccess: '[OrderSmmhistoryFind] Loaded succcess',
  OrdersLoadedCmtSuccess: '[OrderSmmhistoryFind] Loaded Cmt succcess',
  OrdersLoadedFollowerTiktokSuccess: '[OrderhistoryFind] Loaded Follower Tiktok succcess',
  OrdersLoadedFail: '[OrderSmmhistoryFind] load fail',
  AddOrderRequest: '[OrderSmmhistoryFind] Add Order Request',
  AddOrderManualRequest: '[OrderSmmhistoryFind] Add Order Manual Request',
  AddOrderSuccess: '[OrderSmmhistoryFind] Add Order Success',
  AddOrdersSuccess: '[OrderSmmhistoryFind] Add Orders Success',
  AddOrderFail: '[OrderSmmhistoryFind] Add Order Fail',
  ShowcurrentOrder: '[OrderSmmhistoryFind] Show Order',
  ShowcurrentOrderCmt: '[OrderSmmhistoryFind] Show Order Cmt',
  RequestUpdate: '[OrderSmmhistoryFind] Requested Update',
  RequestUpdateRefill: '[OrderSmmhistoryFind] Requested Refill Update',
  RequestUpdateFollower: '[OrderSmmhistoryFind] Requested Follower Update',
  UpdateMultiOrderRequest: '[OrderSmmhistoryFind] Update Multi Order Request',
  UpdateSuccess: '[OrderSmmhistoryFind] Update Success',
  UpdateMultiSuccess: '[OrderSmmhistoryFind] Update Multi Success',
  UpdateMultiefRefillSuccess: '[OrderSmmhistoryFind] Update  Multi Refill Success',
  UpdateMultiFollowerSuccess: '[OrderSmmhistoryFind] Update  Multi Follower Success',
  UpdateFail: '[OrderSmmhistoryFind] Update Fail',
  ClearSelected: '[OrderSmmhistoryFind] Clear selected account',
  GroupLoadedRequest: '[OrderSmmhistoryFind] Group Loaded Request',
  GroupLoadedSuccess: '[OrderSmmhistoryFind] Group Loaded Success',
  GroupLoadedFail: '[OrderSmmhistoryFind] Group Loaded Fail',
  GroupAddRequest: '[OrderSmmhistoryFind] GroupAddRequest',
  GroupAddSuccess: '[OrderSmmhistoryFind] Group Add Success',
  GroupAddFail: '[OrderSmmhistoryFind] Group Add Fail',
  GroupDeleteRequest: '[OrderSmmhistoryFind] Group Delete Request',
  GroupDeleteSuccess: '[OrderSmmhistoryFind] Group Delete Success',
  SelectGroup: '[OrderSmmhistoryFind] Select Group',
  DeleteOrderRequest: '[OrderSmmhistoryFind] Delete Order Request',
  DeleteOrderSuccess: '[OrderSmmhistoryFind] Delete Order Success',
  CheckedChange: '[OrderSmmhistoryFind] Checked Change',
  CheckedChangeCmt: '[OrderSmmhistoryFind] Checked Change Cmt',
  CheckedChangeFollower: '[OrderSmmhistoryFind] Checked Change Follower',
  CheckedAllChange: '[OrderSmmhistoryFind] Checked All Change',
  CheckedAllChangeCmt: '[OrderSmmhistoryFind] Checked All Change Cmt',
  CheckedAllChangeFollower: '[OrderSmmhistoryFind] Checked All Change Follower',
}

const initialorderstate: Iorderstate = {
  orders: [],
  ordersCmt: [],
  ordersFollowerTiktok: [],
  loading: false,
  adding: false,
  groups: [],
  currentOrder: undefined,
  currentOrderCmt: undefined,
  currentOrderFollowerTiktok: undefined,
  currentGroup: undefined,
  channel_prior: 0,
  
}

export interface Iorderstate {
  orders: OrderModel[]
  ordersCmt: OrderModelCmt[]
  ordersFollowerTiktok: OrderModelFollower[]
  loading: boolean
  adding: boolean
  currentOrder?: OrderModel
  currentOrderCmt?: OrderModelCmt
  currentOrderFollowerTiktok?: OrderModelFollower
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
      case actionTypes.RequestOrderFollowerTiktok: {
        return {
          ...state,
          ordersFollowerTiktok: [],
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
      case actionTypes.OrdersLoadedFollowerTiktokSuccess: {
        return {
          ...state,
          ordersFollowerTiktok: action.payload?.orders || [],
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
            if (item.order_key == action.payload?.order_key) {
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
      case actionTypes.RequestUpdateRefill: {
        return {
          ...state,
          loading: true
        }
      }
      case actionTypes.RequestUpdateFollower: {
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
          if (item.order_key === action.payload?.order_history?.order_key) {
            return action.payload?.order_history
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
      case actionTypes.UpdateMultiefRefillSuccess: {
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
      case actionTypes.UpdateMultiFollowerSuccess: {
        const remaporders = state.ordersFollowerTiktok.map((item: OrderModelFollower) => {
          const findItem = action.payload?.channel_tiktok.find((_item:OrderModelFollower)=>{
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
          ordersFollowerTiktok: remaporders,
          loading: false,
          adding: false,
          currentOrderFollowerTiktok: undefined
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
      case actionTypes.CheckedChangeFollower: {
        return {
          ...state,
          ordersFollowerTiktok:  state.ordersFollowerTiktok.map(item=>{
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
      case actionTypes.CheckedAllChangeFollower: {
        return {
          ...state,
          ordersFollowerTiktok:  state.ordersFollowerTiktok.map(item=>{
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
  requestOrders: (order_key:string) => ({ type: actionTypes.RequestOrders ,payload:{order_key}}),
  requestOrderCmt: (user:string) => ({ type: actionTypes.RequestOrderCmt ,payload:{user}}),
  requestOrderFollowerTiktok: (user:string) => ({ type: actionTypes.RequestOrderFollowerTiktok ,payload:{user}}),
  showordersfilter: (key: string,user:string) => ({ type: actionTypes.ShowOrdersFilter ,payload: { key,user }} ),
  fulfillorders: (orders: OrderModel[]) => ({ type: actionTypes.OrdersLoadedSuccess, payload: { orders } }),
  fulfillorderCmt: (orders: OrderModelCmt[]) => ({ type: actionTypes.OrdersLoadedCmtSuccess, payload: { orders } }),
  fulfillorderFollowerTiktok: (orders: OrderModelFollower[]) => ({ type: actionTypes.OrdersLoadedFollowerTiktokSuccess, payload: { orders } }),
  loadordersFail: (message: string) => ({ type: actionTypes.OrdersLoadedFail, payload: { message } }),
  addOrderRequest: (data: OrderForm) => ({ type: actionTypes.AddOrderRequest, payload: { data } }),
  addOrderManualRequest: (data: OrderFormManual) => ({ type: actionTypes.AddOrderManualRequest, payload: { data } }),
  editMultiOrderRequest: (orderid: string) => ({ type: actionTypes.UpdateMultiOrderRequest, payload: { orderid } }),
  addOrderSuccess: (order: OrderModel) => ({ type: actionTypes.AddOrderSuccess, payload: { order } }),
  addOrdersSuccess: (orders: OrderModel[]) => ({ type: actionTypes.AddOrdersSuccess, payload: { orders } }),
  addOrderFail: (message: string) => ({ type: actionTypes.AddOrderFail, payload: { message } }),
  requestUpdate: (orderid: string,check_current:boolean,check_end_time:boolean) => ({ type: actionTypes.RequestUpdate, payload: { orderid,check_current,check_end_time } }),
  requestUpdateRefill: (orderid: string) => ({ type: actionTypes.RequestUpdateRefill, payload: { orderid } }),
  requestUpdateFollower: (orderid: string) => ({ type: actionTypes.RequestUpdateFollower, payload: { orderid } }),
  updateSuccess: (videoview: OrderModel[]) => ({ type: actionTypes.UpdateSuccess, payload: { videoview } }),
  updateMultiSuccess: (order_history: OrderModel[]) => ({ type: actionTypes.UpdateMultiSuccess, payload: { order_history } }),
  updateMultiRefillSuccess: (order_history: OrderModel[]) => ({ type: actionTypes.UpdateMultiefRefillSuccess, payload: { order_history } }),
  updateMultiFollowerSuccess: (channel_tiktok: OrderModelFollower[]) => ({ type: actionTypes.UpdateMultiFollowerSuccess, payload: { channel_tiktok } }),
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
  checkedChange: (data:{order_id:number,checked:boolean}) => ({ type: actionTypes.CheckedChange, payload: { data } }),
  checkedChangeCmt: (data:{orderid:number,checked:boolean}) => ({ type: actionTypes.CheckedChangeCmt, payload: { data } }),
  checkedChangeFollower: (data:{order_id:number,checked:boolean}) => ({ type: actionTypes.CheckedChangeFollower, payload: { data } }),
  checkedAllChange: (checked:boolean) => ({ type: actionTypes.CheckedAllChange, payload: { checked } }),
  checkedAllChangeCmt: (checked:boolean) => ({ type: actionTypes.CheckedAllChangeCmt, payload: { checked } }),
  checkedAllChangeFollower: (checked:boolean) => ({ type: actionTypes.CheckedAllChangeFollower, payload: { checked } }),

}

export function* saga() {
  yield takeLatest(actionTypes.RequestOrders, function* userRequested(param: any) {
    const payload = param.payload.order_key
    const { data: orders } = yield getListOrder(payload)
    yield put(actions.fulfillorders(orders.order_history))
    if(orders.order_history.length==0){
      alert("Không tìm thấy thông tin đơn!")
    }
  })
  yield takeLatest(actionTypes.RequestOrderCmt, function* userRequestedcmt(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrderCmt(payload)
    yield put(actions.fulfillorderCmt(orders.videocomment))
    if(orders.videocomment==null){
      alert("Không tìm thấy thông tin đơn!")
    }
  })
  yield takeLatest(actionTypes.RequestOrderFollowerTiktok, function* userRequestedcmt(param: any) {
    const payload = param.payload.user
    const { data: orders } = yield getListOrderFollowerTiktok(payload)
    yield put(actions.fulfillorderFollowerTiktok(orders.channel_tiktok))
    if(orders.channel_tiktok==null){
      alert("Không tìm thấy thông tin đơn!")
    }
  })
  yield takeLatest(actionTypes.ShowOrdersFilter, function* userRequestedd(param: any) {
    const payload = param.payload
    const { data: orders } = yield getOrderFilter(payload.key,payload.user)
    yield put(actions.fulfillorders(orders.videoview))
  })

  http://localhost:8080/Fitnees/

  yield takeLatest(actionTypes.RequestUpdate, function* updateUserRequested(param: any) {
    const { data: result } = yield updateOrder(param.payload.orderid,param.payload.check_current,param.payload.check_end_time)
    if (result && result.order_history) {
      yield put(actions.updateMultiSuccess(result.order_history))
    } else {
      yield put(actions.updateFail(result.message))
    }

  })

  yield takeLatest(actionTypes.RequestUpdateRefill, function* updateUserRequestedCmt(param: any) {
    const { data: result } = yield updateOrderRefill(param.payload.orderid)
    if (result && result.order_history) {
      yield put(actions.updateMultiRefillSuccess(result.order_history))
    } else {
      yield put(actions.updateFail(result.message))
    }

  })

  yield takeLatest(actionTypes.RequestUpdateFollower, function* updateUserRequestedFollower(param: any) {
    const { data: result } = yield updateOrderFollwer(param.payload.orderid)
    if (result && result.channel_tiktok) {
      yield put(actions.updateMultiFollowerSuccess(result.channel_tiktok))
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
      const { data: result } = yield updateOrder(param.payload.orderid,param.payload.check_current,param.payload.check_end_time)
        if (result && result.order_history) {
          yield put(actions.updateMultiSuccess(result.order_history))
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
