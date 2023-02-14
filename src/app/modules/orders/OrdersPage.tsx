import React, { useEffect, useState } from 'react'
import { OrderList } from './OrderList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel } from './models/Order'
import { RootState } from 'setup'
import { actions } from './redux/OrdersRedux'
import EditModal from './modals/EditModal'

const WidgetsPage: React.FC = () => {

  const dispatch = useDispatch()
  const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []
  const channel_prior: number = useSelector<RootState>(({ orders }) => orders.channel_prior, shallowEqual) as number || 0
  const [channelPrior,setChannelPrior] =useState(channel_prior)
  const currentOrder: OrderModel = useSelector<RootState>(({ orders }) => orders.currentOrder, shallowEqual) as OrderModel || undefined
  useEffect(() => {
    //dispatch(actions.requestSetting())
    //dispatch(actions.requestGroups())
    dispatch(actions.requestOrders())
  }, [])

  useEffect(() => {
    setChannelPrior(channel_prior)
  }, [channel_prior])

  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12'>
          <OrderList orders={orders} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
      </div>
      {
        currentOrder && <EditModal key={currentOrder?.channel_id} item={currentOrder}  />
      }
    </>
  )
}

export default WidgetsPage
