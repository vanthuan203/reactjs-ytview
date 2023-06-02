import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { OrderList } from './OrderList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel } from './models/Order'
import { RootState } from 'setup'
import { actions } from './redux/OrdersRedux'
import {FormGroup, Input, Label} from "reactstrap";

const WidgetsPage: React.FC = () => {

  const dispatch = useDispatch()
  const [keytrue, setKeyTrue] = useState(0)
  const [key, setKey] = useState("")
  const [keycheck, setKeyCheck] = useState(0)
  const orders: OrderModel[] = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.orders, shallowEqual) as OrderModel[] || []
  const currentOrder: OrderModel = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.currentOrder, shallowEqual) as OrderModel || undefined
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  useEffect(() => {
    if(Array.isArray(orders)){
      orders.splice(0,orders.length);
    }
    if(key.length!=0&& keycheck==1){
      dispatch(actions.requestOrders(key.trim()))
    }
    setKeyTrue(0)
    setKeyCheck(0)
  }, [keytrue==1])

  useEffect(() => {
    setKeyCheck(1)
  }, [key])

  const YoutubeEmbed = (embedId:string) => (
      <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
      </div>
  );

  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div>
          <Input style={{marginRight:10,width:"48%",maxWidth:500,minWidth:60,height:40,float:"left"}}
                 id="note"
                 name="note"
                 value={key}
                 placeholder="Nhập videoId or orderId (Phân cách nhau dấu phẩy)"
                 onChange={(e) => setKey(e.target.value)}
                 type="text"
          />
          <button style={{color:"white",backgroundColor:"#7c9e98",height:40,float:"left"}}
                  onClick={() => {setKeyTrue(1)
                  }}
                  className='btn btn-sm'
          >
            Fetching
          </button>
        </div>
        <div className='col-xl-12'>
          <OrderList done={1} orders={orders} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
      </div>
    </>
  )
}

export default WidgetsPage
