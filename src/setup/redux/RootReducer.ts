import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import * as accounts from '../../app/modules/accounts'
import * as orders from '../../app/modules/orders'
import * as orderdone from '../../app/modules/orderdone'
import * as orderhistory from '../../app/modules/orderhistory'
import * as histories from '../../app/modules/history'
import * as users from '../../app/modules/users'
import * as setting from '../../app/modules/setting'
import * as balance from '../../app/modules/balance'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  accounts: accounts.reducer,
  users:users.reducer,
  orders: orders.reducer,
  orderhistory: orderhistory.reducer,
  histories:histories.reducer,
  orderdone:orderdone.reducer,
  setting:setting.reducer,
  balance:balance.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga(),accounts.saga(),orders.saga(),orderdone.saga(),histories.saga(),orderhistory.saga(),users.saga(),setting.saga(),balance.saga()])
}
