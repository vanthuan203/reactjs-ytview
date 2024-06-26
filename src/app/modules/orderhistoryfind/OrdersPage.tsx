import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { OrderList } from './OrderList'
import { OrderListCmt } from './OrderListCmt'
import { OrderListFollowerTikTok } from './OrderListFollowerTikTok'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { OrderModel,OrderModelCmt ,OrderModelFollower} from './models/Order'
import { RootState } from 'setup'
import { actions } from './redux/OrdersRedux'
import {FormGroup, Input, Label} from "reactstrap";
import EditModal from './modals/EditModal';
import EditModalCmt from './modals/EditModalCmt';

const WidgetsPage: React.FC = () => {

  const dispatch = useDispatch()
  const [keytrue, setKeyTrue] = useState(0)
  const [key, setKey] = useState("")
  const [keycheck, setKeyCheck] = useState(0)
  const [option, setOption] = useState("view")
  const orders: OrderModel[] = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.orders, shallowEqual) as OrderModel[] || []
  const orderscmt: OrderModelCmt[] = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.ordersCmt, shallowEqual) as OrderModelCmt[] || []
  const ordersfollowertiktok: OrderModelFollower[] = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.ordersFollowerTiktok, shallowEqual) as OrderModelFollower[] || []
  const currentOrder: OrderModel = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.currentOrder, shallowEqual) as OrderModel || undefined
  const currentOrderCmt: OrderModelCmt = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.currentOrderCmt, shallowEqual) as OrderModelCmt || undefined
  const currentOrderFollowerTikTok: OrderModelFollower = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.currentOrderFollowerTiktok, shallowEqual) as OrderModelFollower || undefined
  let role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  if(role==="ROLE_SUPPORT"){
    role="ROLE_ADMIN"
  }
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  useEffect(() => {
    if(Array.isArray(orders)){
      orders.splice(0,orders.length);
    }
    if(Array.isArray(orderscmt)){
      orderscmt.splice(0,orderscmt.length);
    }
    if(Array.isArray(ordersfollowertiktok)){
      ordersfollowertiktok.splice(0,orderscmt.length);
    }
    if(key.length!=0&& keycheck==1){
      if(option.indexOf("view")>=0){
        dispatch(actions.requestOrders(key.trim()))
      }else if(option.indexOf("cmt")>=0){
        dispatch(actions.requestOrderCmt(key.trim()))
      }else if(option.indexOf("follower")>=0){
        dispatch(actions.requestOrderFollowerTiktok(key.trim()))
      }else if(option.indexOf("traffic")>=0){
        dispatch(actions.requestOrderCmt(key.trim()))
      }
    }
    setKeyTrue(0)
    setKeyCheck(0)
  }, [keytrue==1,option])

  useEffect(() => {
    setKeyCheck(1)
  }, [key])
  useEffect(() => {
    setKey("")
  }, [option])
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
                 placeholder="Nhập phân cách nhau dấu phẩy"
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
          {<Input style={{marginLeft:10,width:"auto",maxWidth:120,height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"left"}}
              //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                       onChange={(e) => {
                                         setOption(e.target.value)
                                       }}
                                       className="form-control form-control-solid"
                                       type="select"
                                       value={option}
          >
            <option key={"view"} value={"view"}>
              VIEW</option>)
            <option key={"cmt"} value={"cmt"}>
              CMT</option>
            <option key={"follower"} value={"follower"}>
              FOLLOWER</option>)
            <option key={"traffic"} value={"traffic"}>
              TRAFFIC</option>)

          </Input>}
        </div>

        <div className='col-xl-12'>
          {option.indexOf("view")>=0&&<OrderList done={1} orders={orders} className='card-xxl-stretch mb-5 mb-xl-12' />}
          {option.indexOf("cmt")>=0&&<OrderListCmt done={1} orders={orderscmt} className='card-xxl-stretch mb-5 mb-xl-12' />}
          {option.indexOf("follower")>=0&&<OrderListFollowerTikTok done={1} orders={ordersfollowertiktok} className='card-xxl-stretch mb-5 mb-xl-12' />}
        </div>
      </div>
    </>
  )
}

export default WidgetsPage
