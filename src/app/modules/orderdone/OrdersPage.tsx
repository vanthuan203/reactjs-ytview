import React, { useEffect, useState } from 'react'
import { OrderList } from './OrderList'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel } from './models/Order'
import { RootState } from 'setup'
import { actions } from './redux/OrdersRedux'
import EditModal from './modals/EditModal'
import {FormGroup, Input, Label} from "reactstrap";
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'

const WidgetsPage: React.FC = () => {
    const API_URL = process.env.REACT_APP_API_URL
    const role: string =
        (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
    const user: string =
        (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
    const dispatch = useDispatch()
    const orders: OrderModel[] = useSelector<RootState>(({ orderdone }) => orderdone.orders, shallowEqual) as OrderModel[] || []
    const currentOrder: OrderModel = useSelector<RootState>(({ orderdone }) => orderdone.currentOrder, shallowEqual) as OrderModel || undefined
    const [refresh, setRefresh] = useState(true)
    const [isMobile, setIsMobile] = useState(false);
    const [countPrice, setCountPrice] = useState(0);
    const [toggle, setToggle] = useState(false)
    const handleWindowResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };
    async function get5M(){
        const requestUrl = API_URL+'auth/fluctuations5M';
        const response= await fetch(requestUrl,{
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson= await  response.json();
        const {price}=responseJson;
        setCountPrice(-price)
    }

  useEffect(() => {
   if (refresh===true) {
     if (role.indexOf("ROLE_ADMIN") >= 0) {
       dispatch(actions.requestOrders(''))
     } else {
       dispatch(actions.requestOrders(user))
     }
   }
   setRefresh(false)
  }, [refresh])
    useEffect(() => {
        if(role==='ROLE_ADMIN'){
            setTimeout(() => setToggle((prevToggle) => !prevToggle), 60000);
            handleWindowResize();
            // Thêm sự kiện lắng nghe để kiểm tra kích thước cửa sổ khi cửa sổ thay đổi
            window.addEventListener('resize', handleWindowResize);
            if(window.innerWidth < 800){
                get5M()
            }
        }

    }, [toggle]);
  return (
    <>
      <div className='row gy-5 gx-xl-12'>
          <div className='col-xl-12' style={{margin:0,position: "relative"}}>
              {isMobile==true&&<span style={{position: "absolute",bottom:0,textAlign:"center",fontWeight:"bold",fontFamily:"monospace"}}>{"🕐 𝐋𝐀𝐒𝐓 𝟓𝐌 +" +countPrice.toFixed(3)+ "$"}</span>}
              <a style={{float:"right"}} href='#' onClick={() => {
              setRefresh(true)
            }} >
              <img style={{width:32,height:32}} src='/media/dowload/refresh-cw-alt-1-svgrepo-com.svg' className='svg-icon-6' />
            </a>
          </div>
          <div className='col-xl-12' style={{margin:0}}>
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
