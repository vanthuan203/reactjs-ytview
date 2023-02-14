import React, { useEffect, useState } from 'react'
import { OrderList } from './OrderList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel } from './models/Order'
import { RootState } from 'setup'
import { actions } from './redux/OrdersRedux'
import EditModal from './modals/EditModal'
import {FormGroup, Input, Label} from "reactstrap";

const WidgetsPage: React.FC = () => {
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const dispatch = useDispatch()
  const orders: OrderModel[] = useSelector<RootState>(({ orderdone }) => orderdone.orders, shallowEqual) as OrderModel[] || []
  const currentOrder: OrderModel = useSelector<RootState>(({ orderdone }) => orderdone.currentOrder, shallowEqual) as OrderModel || undefined
  useEffect(() => {
    if(role.indexOf("ROLE_ADMIN")>=0){
      dispatch(actions.requestOrders(''))
    }else{
      dispatch(actions.requestOrders(user))
    }
  }, [])
  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12'>
          <OrderList orders={orders} done={1} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
      </div>
      {
        currentOrder && <EditModal key={currentOrder?.videoid} item={currentOrder}  />
      }
    </>
  )
}

export default WidgetsPage
