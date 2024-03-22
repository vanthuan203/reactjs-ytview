import React, { useEffect, useState } from 'react'
import { OrderList } from './OrderList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel } from './models/Order'
import { RootState } from 'setup'
import { actions } from './redux/OrdersRedux'
import EditModal from './modals/EditModal'
import {FormGroup, Input, Label} from "reactstrap";

const WidgetsPage: React.FC = () => {

  const dispatch = useDispatch()
  const orders: OrderModel[] = useSelector<RootState>(({ orderhistory }) => orderhistory.orders, shallowEqual) as OrderModel[] || []
  const currentOrder: OrderModel = useSelector<RootState>(({ orderhistory }) => orderhistory.currentOrder, shallowEqual) as OrderModel || undefined
  let role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  if(role==="ROLE_SUPPORT"){
    role="ROLE_ADMIN"
  }
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const [refresh, setRefresh] = useState(true)
  useEffect(() => {
    if(refresh===true){
      if(role.indexOf("ROLE_ADMIN")>=0){
        dispatch(actions.requestOrders(''))
      }else{
        dispatch(actions.requestOrders(user))
      }
    }
    setRefresh(false)
  }, [refresh])


  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12' style={{margin:0}}>
          <a style={{float:"right"}} href='#' onClick={() => {
            setRefresh(true)
          }} >
            <img style={{width:32,height:32}} src='/media/dowload/refresh-cw-alt-1-svgrepo-com.svg' className='svg-icon-6' />
          </a>
        </div>
        <div className='col-xl-12' style={{margin:0}}>
          <OrderList done={1} orders={orders} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
      </div>
      {
        currentOrder && <EditModal key={currentOrder?.videoid} item={currentOrder}  />
      }
    </>
  )
}

export default WidgetsPage
