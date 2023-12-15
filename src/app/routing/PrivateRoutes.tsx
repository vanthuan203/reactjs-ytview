import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
export function PrivateRoutes() {
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const AccountPage1 = lazy(() => import('../modules/users/AccountPage'))
  const AccountPage2 = lazy(() => import('../modules/setting/AccountPage'))
  const AccountPage3 = lazy(() => import('../modules/services/AccountPage'))
  const AccountPage4 = lazy(() => import('../modules/history/VpsThreadList'))
  const WidgetsPage = lazy(() => import('../modules/ordercheckcancel/OrdersPage'))
  const WidgetsPage1 = lazy(() => import('../modules/orderdone/OrdersPage'))
  const WidgetsPage4 = lazy(() => import('../modules/orderpending/OrdersPage'))
  const WidgetsPage2 = lazy(() => import('../modules/orderbaohanh/OrdersPage'))
  const WidgetsPage3 = lazy(() => import('../modules/ordercomment/OrdersPage'))
  const WidgetsPage5 = lazy(() => import('../modules/ordertraffic/OrdersPage'))
  const WidgetsPage6 = lazy(() => import('../modules/ordertraffichistory/OrdersPage'))
  const WidgetsPageHis = lazy(() => import('../modules/orderhistory/OrdersPage'))
  const WidgetsPageHis2 = lazy(() => import('../modules/orderhistoryfind/OrdersPage'))
  const WidgetsPageHis1 = lazy(() => import('../modules/ordercommenthistory/OrdersPage'))
  const WidgetsPageBalance = lazy(() => import('../modules/balance/OrdersPage'))
  const ComputerList = lazy(() => import('../modules/history/ComputerList'))
  const ComputerListSub = lazy(() => import('../modules/history/ComputerListSub'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/crafted/orders' component={WidgetsPage1} />
        <Route path='/crafted/orderpending' component={WidgetsPage4} />
        <Route path='/crafted/ordercheck' component={WidgetsPage} />
        <Route path='/crafted/orderbaohanh' component={WidgetsPage2} />
        <Route path='/crafted/ordercomments' component={WidgetsPage3} />
        <Route path='/crafted/ordertraffic' component={WidgetsPage5} />
        <Route path='/crafted/ordertraffiwebhistory' component={WidgetsPage6} />
        <Route path='/crafted/orderhistory' component={WidgetsPageHis} />
        <Route path='/crafted/ordercommenthistory' component={WidgetsPageHis1} />
        <Route path='/crafted/orderfindhistory' component={WidgetsPageHis2} />
        <Route path='/crafted/vps' component={AccountPage} />
        <Route path='/crafted/user' component={AccountPage1} />
        <Route path='/crafted/threads' component={AccountPage4} />
        <Route path='/crafted/proxyview' component={ComputerList} />
        <Route path='/crafted/proxysub' component={ComputerListSub} />
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
