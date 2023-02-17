import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
export function PrivateRoutes() {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const AccountPage1 = lazy(() => import('../modules/users/AccountPage'))
  const AccountPage2 = lazy(() => import('../modules/setting/AccountPage'))
  const AccountPage3 = lazy(() => import('../modules/services/AccountPage'))
  //const WidgetsPage = lazy(() => import('../modules/orders/OrdersPage'))
  const WidgetsPage1 = lazy(() => import('../modules/orderdone/OrdersPage'))
  const WidgetsPageHis = lazy(() => import('../modules/orderhistory/OrdersPage'))
  const WidgetsPageBalance = lazy(() => import('../modules/balance/OrdersPage'))
  const ComputerList = lazy(() => import('../modules/history/ComputerList'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/crafted/orders' component={WidgetsPage1} />
        <Route path='/crafted/orderhistory' component={WidgetsPageHis} />
        <Route path='/crafted/vps' component={AccountPage} />
        <Route path='/crafted/user' component={AccountPage1} />
        <Route path='/crafted/proxy' component={ComputerList} />
        <Route path='/crafted/setting' component={AccountPage2} />
        <Route path='/crafted/service' component={AccountPage3} />
        <Route path='/crafted/balance' component={WidgetsPageBalance} />
        <Redirect from='/auth' to='/crafted/orders' />
        <Redirect exact from='/' to='/crafted/orders' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
