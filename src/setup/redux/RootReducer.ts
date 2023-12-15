import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import * as accounts from '../../app/modules/accounts'
import * as orders from '../../app/modules/orders'
import * as orderdone from '../../app/modules/orderdone'
import * as ordertraffic from '../../app/modules/ordertraffic'
import * as orderpending from '../../app/modules/orderpending'
import * as ordercheckcancel from '../../app/modules/ordercheckcancel'
import * as orderhistory from '../../app/modules/orderhistory'
import * as ordertraffichistory from '../../app/modules/ordertraffichistory'
import * as orderhistoryfind from '../../app/modules/orderhistoryfind'
import * as ordercommenthistory from '../../app/modules/ordercommenthistory'
import * as orderbaohanh from '../../app/modules/orderbaohanh'
import * as ordercomment from '../../app/modules/ordercomment'
import * as histories from '../../app/modules/history'
import * as users from '../../app/modules/users'
import * as setting from '../../app/modules/setting'
import * as balance from '../../app/modules/balance'
import * as services from '../../app/modules/services'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  accounts: accounts.reducer,
  users:users.reducer,
  services:services.reducer,
  ordercomment:ordercomment.reducer,
  orders: orders.reducer,
  orderhistory: orderhistory.reducer,
  ordercommenthistory: ordercommenthistory.reducer,
  histories:histories.reducer,
  orderdone:orderdone.reducer,
  ordercheckcancel:ordercheckcancel.reducer,
  setting:setting.reducer,
  balance:balance.reducer,
  orderbaohanh:orderbaohanh.reducer,
  orderhistoryfind:orderhistoryfind.reducer,
  orderpending:orderpending.reducer,
  ordertraffic:ordertraffic.reducer,
  ordertraffichistory:ordertraffichistory.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(),accounts.saga(),orders.saga(),orderdone.saga(),histories.saga(),orderhistory.saga(),users.saga(),setting.saga(),balance.saga(),services.saga(),ordercheckcancel.saga(),orderbaohanh.saga(),ordercomment.saga(),ordercommenthistory.saga(),orderhistoryfind.saga(),orderpending.saga(),ordertraffic.saga(),ordertraffichistory.saga()])
}
