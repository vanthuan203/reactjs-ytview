import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import * as accounts from '../../app/modules/accounts'
import * as vpssub from '../../app/modules/vpssub'
import * as vpstiktok from '../../app/modules/vpstiktok'
import * as orders from '../../app/modules/orders'
import * as orderdone from '../../app/modules/orderdone'
import * as ordersmmdone from '../../app/modules/ordersmmdone'
import * as ordertraffic from '../../app/modules/ordertraffic'
import * as orderpending from '../../app/modules/orderpending'
import * as ordercheckcancel from '../../app/modules/ordercheckcancel'
import * as orderhistory from '../../app/modules/orderhistory'
import * as ordersmmhistory from '../../app/modules/ordersmmhistory'
import * as ordertraffichistory from '../../app/modules/ordertraffichistory'
import * as orderfollowertiktok from '../../app/modules/orderfollowertiktok'
import * as orderfollowertiktokhistory from '../../app/modules/orderfollowertiktokhistory'
import * as orderhistoryfind from '../../app/modules/orderhistoryfind'
import * as ordersmmhistoryfind from '../../app/modules/ordersmmhistoryfind'
import * as ordercommenthistory from '../../app/modules/ordercommenthistory'
import * as orderbaohanh from '../../app/modules/orderbaohanh'
import * as orderrefill from '../../app/modules/orderrefill'
import * as ordercomment from '../../app/modules/ordercomment'
import * as histories from '../../app/modules/history'
import * as users from '../../app/modules/users'
import * as setting from '../../app/modules/setting'
import * as balance from '../../app/modules/balance'
import * as services from '../../app/modules/services'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  accounts: accounts.reducer,
  vpsdub: vpssub.reducer,
  vpstiktok: vpstiktok.reducer,
  users:users.reducer,
  services:services.reducer,
  ordercomment:ordercomment.reducer,
  orders: orders.reducer,
  orderhistory: orderhistory.reducer,
  ordersmmhistory:ordersmmhistory.reducer,
  ordercommenthistory: ordercommenthistory.reducer,
  histories:histories.reducer,
  orderdone:orderdone.reducer,
  ordersmmdone:ordersmmdone.reducer,
  ordercheckcancel:ordercheckcancel.reducer,
  setting:setting.reducer,
  balance:balance.reducer,
  orderbaohanh:orderbaohanh.reducer,
  orderhistoryfind:orderhistoryfind.reducer,
  ordersmmhistoryfind:ordersmmhistoryfind.reducer,
  orderpending:orderpending.reducer,
  ordertraffic:ordertraffic.reducer,
  ordertraffichistory:ordertraffichistory.reducer,
  orderfollowertiktok:orderfollowertiktok.reducer,
  orderfollowertiktokhistory:orderfollowertiktokhistory.reducer,
  orderrefill:orderrefill.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(),accounts.saga(),orders.saga(),orderdone.saga(),histories.saga(),orderhistory.saga(),users.saga(),setting.saga(),balance.saga(),services.saga(),ordercheckcancel.saga(),orderbaohanh.saga(),ordercomment.saga(),ordercommenthistory.saga(),orderhistoryfind.saga(),orderpending.saga(),ordertraffic.saga(),ordertraffichistory.saga(),vpssub.saga()
    ,orderfollowertiktok.saga(),orderfollowertiktokhistory.saga(),vpstiktok.saga(),ordersmmdone.saga(),ordersmmhistory.saga(),ordersmmhistoryfind.saga(),orderrefill.saga()
  ])
}
