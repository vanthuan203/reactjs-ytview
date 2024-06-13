import {ChevronDownIcon, SortAscendingIcon, UsersIcon} from '@heroicons/react/solid'
import { OrderModel} from './models/Order'
import {Popover, Transition} from '@headlessui/react'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import AddManualModal from './modals/AddManualModal'
import AddModal from './modals/AddModal'
import EditMulti from './modals/EditMulti'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import OrderItem from './components/OrderItem'
import {RootState} from 'setup'
import {actions} from './redux/OrdersRedux'
import {FormGroup, Input, Label} from "reactstrap";
import {randomString} from "react-inlinesvg/lib/helpers";
import {Spinner} from "react-bootstrap-v5";
import BhManualModal from "./modals/BhManualModal";

type Props = {
  done:number,
  className: string
  orders: OrderModel[]
}
const OrderList: React.FC<Props> = ({done,className, orders}) => {
  const dispatch = useDispatch()
  const API_URL = process.env.REACT_APP_API_URL
  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  const [isMobile, setIsMobile] = useState(false);
  const [Checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [key, setKey] = useState("")
  const [keyrate, setKeyRate] = useState(0)
  const [keyuser, setKeyUser] = useState("")
  const [keytrue, setKeyTrue] = useState(0)
  const [keyratetrue, setKeyRateTrue] = useState(0)
  const [keyusertrue, setKeyUserTrue] = useState(0)
  const [showAddManual, setShowAddManual] = useState(false)
  const [showManual, setShowManual] = useState(false)
  const [showBhManual, setShowBhManual] = useState(false)
  const [showEditMulti, setShowEditMulti] = useState(false)
  let [totaltimeorder, setTotalTimeOrder] = useState(0)
  let [totaltimeordershow, setTotalTimeOrderShow] = useState(0)
  let [totaltimeorderus, setTotalTimeOrderUs] = useState(0)
  let [totaltimeorderusshow, setTotalTimeOrderUsShow] = useState(0)
  let [totaltimebuffedorder, setTotalTimeBuffedOrder] = useState(0)
  let [totaltimebuffedordershow, setTotalTimeBuffedOrderShow] = useState(0)
  let [totaltimebuffedorderus, setTotalTimeBuffedOrderUs] = useState(0)
  let [totaltimebuffedorderusshow, setTotalTimeBuffedOrderUsShow] = useState(0)
  let [totaldorder, setTotalOrder] = useState(0)
  let [totaldordershow, setTotalOrderShow] = useState(0)
  let [totalmoney, setTotalMoney] = useState(0)
  let [totalmoneyshow, setTotalMoneyShow] = useState(0)
  let [totalmoneyUS, setTotalMoneyUS] = useState(0)
  let [totalmoneyUSshow, setTotalMoneyUSShow] = useState(0)

  let [totalthreadset, setTotalThreadSet] = useState(0)
  let [totalthreadsetshow, setTotalThreadSetShow] = useState(0)
  let [totalthreadusset, setTotalThreadUsSet] = useState(0)
  let [totalthreadsetusshow, setTotalThreadSetUsShow] = useState(0)
  let [totalthread, setTotalThread] = useState(0)
  let [totalthreadshow, setTotalThreadShow] = useState(0)
  let [totalthreadus, setTotalThreadUs] = useState(0)
  let [totalthreadusshow, setTotalThreadUsShow] = useState(0)
  let [totalvn, setTotalVn] = useState(0)
  let [totalVnshow, setTotalVnShow] = useState(0)
  let [totalUs, setTotalUs] = useState(0)
  let [totalUsshow, setTotalUsShow] = useState(0)

  let [useEff, setuseEff] = useState(0)
  const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
  const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
  const price: number = useSelector<RootState>(({ auth }) => auth.user?.price, shallowEqual) as number || 0
  const bonus: number = useSelector<RootState>(({ auth }) => auth.user?.bonus, shallowEqual) as number || 0
  const vip: number = useSelector<RootState>(({ auth }) => auth.user?.vip, shallowEqual) as number || 0
  let role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  if(role==="ROLE_SUPPORT"){
    role="ROLE_ADMIN"
  }
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  let sumtime=0;
  let sumtimeus=0;
  let sumorder=0;
  let summoney=0;
  let summoneyUS=0;
  let sumthreadset=0;
  let sumthread=0;
  let sumthreadusset=0;
  let sumthreadus=0;
  let sumvn=0;
  let sumus=0;
  let sumtimedone=0;
  const arr:String[]=[]
  const [list_user,setList_User]=useState([{
    id:"0000000000",
    user:"All User"
  },])
  const [list_video,setList_Video]=useState([{
    id:0,
    tiktok_id:"",
  },])
  orders.forEach(item=>{
    sumthreadset=sumthreadset +item.max_threads;
    sumthread=sumthread+item.total;
    sumtime=sumtime+item.follower_order;
    sumorder=sumorder+1;
    summoney=summoney+item.price
    sumtimedone=sumtimedone+Math.round(Number(item.follower_total==null?0:item.follower_total))
    if(item.service>600){
      sumvn=sumvn+1;
    }else{
      sumtimeus=sumtimeus+item.follower_order;
      sumthreadusset=sumthreadusset+item.max_threads;
      summoneyUS=summoneyUS+item.price
      sumus=sumus+1;
      sumthreadus=sumthreadus+item.total
    }
  })


  async function getcounttimeorder() {
    let  requestUrl = API_URL+'auth/getalluser';
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson = await response.json();
    const {user} = responseJson;
    let arrlist =user.split(',');
    for(var i=0;i<arrlist.length;i++){
      let orderitem = {
        id: randomString(10),
        user: arrlist[i]
      }
      setList_User([...list_user, orderitem])
      list_user.push(orderitem)
    }
  }
  let videos=''
  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 800);
  };
  useEffect(() => {
    setLoading(true)
    if(orders.length!=0 || list_video.length>0){
      setLoading(false)
    }
    setList_Video([])
    useEff=useEff+1
    setuseEff(useEff)
    totaldordershow=totaldorder
    setTotalOrderShow(totaldordershow)
    setTotalOrder(0)

    totaltimeordershow=totaltimeorder
    setTotalTimeOrderShow(totaltimeordershow)
    totaltimeorder=0
    setTotalTimeOrder(0)

    totaltimeorderusshow=totaltimeorderus
    setTotalTimeOrderUsShow(totaltimeorderusshow)
    totaltimeorderus=0
    setTotalTimeOrderUs(0)

    totalmoneyshow=totalmoney
    setTotalMoneyShow(totalmoneyshow)
    setTotalMoney(0)

    totalthreadsetshow=totalthreadset
    setTotalThreadSetShow(totalthreadsetshow)
    setTotalThreadSet(0)

    totalthreadsetusshow=totalthreadusset
    setTotalThreadSetUsShow(totalthreadsetusshow)
    setTotalThreadUsSet(0)

    totalthreadshow=totalthread
    setTotalThreadShow(totalthreadshow)
    setTotalThread(0)

    totalthreadusshow=totalthreadus
    setTotalThreadUsShow(totalthreadusshow)
    setTotalThreadUs(0)

    totalVnshow=totalvn
    setTotalVnShow(totalVnshow)
    setTotalVn(0)

    totalUsshow=totalUs
    setTotalUsShow(totalUsshow)
    setTotalUs(0)

    totalmoneyUSshow=totalmoneyUS
    setTotalMoneyUSShow(totalmoneyUSshow)
    setTotalMoneyUS(0)

    totaltimebuffedordershow=totaltimebuffedorder
    setTotalTimeBuffedOrderShow(totaltimebuffedordershow)
    totaltimebuffedorder=0
    setTotalTimeBuffedOrder(0)

    totaltimebuffedorderusshow=totaltimebuffedorderus
    setTotalTimeBuffedOrderUsShow(totaltimebuffedorderusshow)
    totaltimebuffedorderus=0
    setTotalTimeBuffedOrderUs(0)

    if(useEff<=1){
      getcounttimeorder();
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

  }, [keytrue,keyuser,keyrate,key,orders.length,,])

  const clickDeleteHandler = () => {
    const strings:number[]=[]
    orders.forEach(item=>{
      const myElem = list_video.find(value => value.tiktok_id===item.tiktok_id)
      if(myElem && item.checked){

        arr.push(item.tiktok_id)
      }
    })
    const orderarr=arr.join(',')
    if (window.confirm("Bạn chắc chắn muốn hủy "+arr.length+" đơn!") == true) {
      dispatch(actions.deleteOrderRequest(orderarr,1))
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }

  const clickDeleteOrderDoneHandler = () => {
    const arr:string[]=[]
    orders.forEach(item=>{
      const myElem = list_video.find(value => value.tiktok_id===item.tiktok_id)
      if(myElem && item.checked){
        arr.push(item.tiktok_id)
      }
    })
    const orderarr=arr.join(',')
    if (window.confirm("Bạn chắc chắn muốn hoàn thành "+arr.length+" đơn!") == true) {
      dispatch(actions.deleteOrderRequest(orderarr,0))
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }

  const isShowFixMulti = orders.find((item) => {
    if (item.checked) {
      return true
    }
    return false
  })

  return (
      <div className={`card ${className}`}>
        <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
          <div className="page-header__content">
            <div className="align-items-center row" style={{marginTop:10,marginBottom:10,marginRight:5,marginLeft:5}}>
              <div className="col-lg-7 col-sm-12 c-order__header">
                <p style={{fontSize:11,marginTop:5}} className="fw-bold c-order__list">
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#090909",backgroundColor:"rgb(255,255,255)",marginLeft:5}}>{(isMobile==false?"Đang chạy ":"Total Order ") +totaldordershow}</span>
                </span>
                </p>
                <p style={{fontSize:11}} className="fw-bold c-order__list">
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"#26695CFF",marginLeft:5,marginTop:3}}>{(isMobile==false?"Luồng cấp ":"Set ")+ ((useEff<=1?sumthreadset:totalthreadsetshow)>=1000?(format1((useEff<=1?sumthreadset/1000:totalthreadsetshow/1000))+"K"):(format1((useEff<=1?sumthreadset:totalthreadsetshow))))}</span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"#b7080f",marginLeft:5,marginTop:3}}>{(isMobile==false?"Luồng chạy ":"Run ") +((useEff<=1?sumthread:totalthreadshow)>=1000?(format1((useEff<=1?sumthread/1000:totalthreadshow/1000))+"K"):(format1((useEff<=1?sumthread:totalthreadshow))))}</span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#090909",backgroundColor:"#fcfcfc",marginLeft:5,marginTop:3}}>{(isMobile==false?"Tổng đặt ":"Quantity ")+ ((useEff<=1?sumtime:totaltimeordershow)>=1000?(format1((useEff<=1?sumtime/1000:totaltimeordershow/1000))+"K"):(format1((useEff<=1?sumtime:totaltimeordershow))))}</span>
                  </span>
                </p>
                <p style={{fontSize:11}} className="fw-bold c-order__list">
                <span className='fw-bolder fs-3 mb-1' >
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#090909",backgroundColor:"rgb(255,255,255)",marginLeft:5,marginTop:3}}>{(isMobile==false?"Đã chạy ":"Done ")+ ((useEff<=1?sumtimedone:totaltimebuffedordershow)>=1000?(format1((useEff<=1?sumtimedone/1000:totaltimebuffedordershow/1000))+"K"):(format1((useEff<=1?sumtimedone:totaltimebuffedordershow))))}</span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"#26695CFF",marginLeft:5,marginTop:3}}>{(isMobile==false?"Còn tồn ":"Remains ")+ (((useEff<=1?sumtime:totaltimeordershow)-(useEff<=1?sumtimedone:totaltimebuffedordershow))>=1000?(format1(((useEff<=1?sumtime:totaltimeordershow)-(useEff<=1?sumtimedone:totaltimebuffedordershow))/1000)+"K"):(format1(((useEff<=1?sumtime:totaltimeordershow)-(useEff<=1?sumtimedone:totaltimebuffedordershow)))))}</span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"#b7080f",marginLeft:5,marginTop:3}}>{(isMobile==false?"Tổng tiền ":"") +(useEff<=1?summoney.toFixed(0):totalmoneyshow.toFixed(0))}$</span>
                  </span>
                </p>
              </div>
              <div className="col-lg-5 col-sm-12 text-right">
                {isShowFixMulti && role === "ROLE_ADMIN"&&(
                    <button style={{marginRight:5}}
                            onClick={() => {
                              clickDeleteHandler()
                            }}
                            className='btn btn-google'
                    >
                      Hủy
                    </button>
                )}
                {isShowFixMulti&& role === "ROLE_ADMIN"&& (
                    <button
                        onClick={() => {
                          setShowEditMulti(true)
                        }}
                        className='btn btn-light'
                    >
                      Sửa luồng
                    </button>
                )}

                {isShowFixMulti &&  (
                    <button style={{margin:5}}
                            onClick={() => {
                              clickDeleteOrderDoneHandler()
                            }}
                            className='btn btn-light'
                    >
                      Hoàn thành
                    </button>
                )}
                {role === "ROLE_ADMIN111"&&<button style={{marginRight:5,color:"white"}}
                                                   onClick={() => {
                                                     setShowBhManual(true)
                                                   }}
                                                   className='btn btn-google'
                >Bảo hành
                </button>}
                <button
                    onClick={() => {
                      setShowAddManual(true)
                    }}
                    className='btn btn-success'
                >
                  Thêm Link
                </button>
              </div>

            </div>
          </div>
          <div className="page-header__content">
            <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
              <div style={{width:"60%"}}>
                <div>
                  <Input style={{margin:10,width:"48%",maxWidth:130,minWidth:60,height:40,float:"left"}}
                         id="note"
                         name="note"
                         value={key}
                         placeholder="Search..."
                         onChange={(e) => setKey(e.target.value)
                         }
                         type="text"
                  />
                  <button style={{ fontWeight:'bold',maxWidth:80,color:"black",backgroundColor:"#c0e1ce",height:40,marginTop:10,float:"left"}}
                          onClick={() => {
                            setKeyTrue(1)
                          }}
                      /*
                      if(key.trim().length==0){
                        if(role.indexOf("ROLE_ADMIN")>=0){
                          dispatch(actions.requestOrders(''))
                        }else{
                          dispatch(actions.requestOrders(user))
                        }
                      }else{
                        if(role.indexOf("ROLE_ADMIN")>=0){
                          dispatch(actions.showordersfilter(key,''))
                        }else{
                          dispatch(actions.showordersfilter(key,user))
                        }
                      }
                      //setKey("")
                    }}

                       */
                          className='btn btn-sm'
                  >
                    Search
                  </button>
                </div>
              </div>

              <div style={{width:"40%"}}>
                <Input style={{margin:10,width:"auto",height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"right"}}
                    //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                       onChange={(e) => {
                         setKeyRate(parseInt(e.target.value))
                         setKeyRateTrue(1)
                         /*
                         if(parseInt(e.target.value)==0){
                           if(role.indexOf("ROLE_ADMIN")>=0){
                             dispatch(actions.requestOrders(''))
                           }else{
                             dispatch(actions.requestOrders(user))
                           }
                         }else{
                           if(role.indexOf("ROLE_ADMIN")>=0){
                             dispatch(actions.showorderspercentfilter(parseInt(e.target.value),''))
                           }else{
                             dispatch(actions.showorderspercentfilter(parseInt(e.target.value),user))
                           }

                         }

                          */
                         //setKeyRate(keyrate)
                       }}
                       className="form-control form-control-solid"
                       type="select"
                       value={keyrate}
                >
                  <option key={0} value={0}>
                    {"All %"}
                  </option>
                  <option key={10} value={10}>
                    {"10"}
                  </option>
                  <option key={20} value={20}>
                    {"20"}
                  </option>
                  <option key={30} value={30}>
                    {"30"}
                  </option>
                  <option key={40} value={40}>
                    {"40"}
                  </option>
                  <option key={50} value={50}>
                    {"50"}
                  </option>
                  <option key={60} value={60}>
                    {"60"}
                  </option>
                  <option key={70} value={70}>
                    {"70"}
                  </option>
                  <option key={80} value={80}>
                    {"80"}
                  </option>
                  <option key={90} value={90}>
                    {"90"}
                  </option>
                  <option key={101} value={101}>
                    {"101"}
                  </option>
                  <option key={104} value={104}>
                    {"104"}
                  </option>
                  <option key={106} value={106}>
                    {"106"}
                  </option>
                  <option key={110} value={110}>
                    {"110"}
                  </option>
                </Input>
                {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:100,height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"right"}}
                    //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                             onChange={(e) => {
                                               setKeyUser(e.target.value)
                                               setKeyUserTrue(1)
                                               //setKeyRate(keyrate)
                                             }}
                                             className="form-control form-control-solid"
                                             type="select"
                                             value={keyuser}
                >
                  {
                    list_user.map((item, index) => {
                      return(
                          <option key={item.user.indexOf("All User")>=0?"":item.user} value={item.user.indexOf("All User")>=0?"":item.user}>
                            {item.user}</option>)
                    })
                  }
                </Input>}
              </div>


            </div>
          </div>
          <div className="page-header__content">
            <div className="align-items-center row" style={{marginLeft:10,marginRight:10}}>
            </div>
          </div>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
              {/* begin::Table head */}
              <thead>
              <tr className='fw-bolder text-muted'>
                <th className='w-25px'>
                  <div style={{marginLeft:5}} className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt) => {
                          dispatch(actions.checkedAllChange(evt.target.checked))
                          setChecked(evt.target.checked)
                        }}
                        checked={Checked}
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>STT</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>OrderId</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Info</span>
                </th>
                {role!="ROLE_USER"&&<th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Threads</span>
                </th>}
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Status</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Start</span>
                </th>
                {role!="ROLE_USER"&&<th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>User</span>
                </th>}
                <th   className='min-w-10px min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Note</span>
                </th>
                <th   className='min-w-150px text-sm'>
                </th>
              </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
              {orders &&
                  orders.map((order: OrderModel, index: number) => {
                    if (keyusertrue==0&&keyratetrue===0&&keytrue==0) {
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                      let orderitem = {
                        id: totaldorder,
                        tiktok_id: order.tiktok_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_video.push(orderitem)
                      return (
                          <OrderItem
                              index={totaldorder}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.orderid}
                              item={order}
                          />
                      )
                    }else if(order.user.indexOf(keyuser)>=0 &&keyusertrue==1&&keyratetrue==0&&keytrue==0){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                      let orderitem = {
                        id: totaldorder,
                        tiktok_id: order.tiktok_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_video.push(orderitem)
                      return (
                          <OrderItem
                              index={totaldorder}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.orderid}
                              item={order}
                          />
                      )
                    }else if(Math.round((Math.round(Number(order.follower_total==null?0:order.follower_total))/order.follower_order*100))>=keyrate&&keyratetrue==1&&keyusertrue==0&&keytrue==0){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                      let orderitem = {
                        id: totaldorder,
                        tiktok_id: order.tiktok_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_video.push(orderitem)
                      return (
                          <OrderItem
                              index={totaldorder}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.orderid}
                              item={order}
                          />
                      )
                    }else if((key.indexOf(order.tiktok_id)>=0 || order.note.indexOf(key)>=0  || key.indexOf("vn")>=0&&order.service>=600 || key.indexOf("us")>=0&&order.service<600 || key.indexOf(order.orderid.toString()) >=0 || order.service.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0 || order.max_threads.toString().indexOf(key.indexOf('th')>=0?key.replace('th',''):'done')>=0)&&keytrue==1&&keyusertrue==0&&keyratetrue==0){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                      let orderitem = {
                        id: totaldorder,
                        tiktok_id: order.tiktok_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_video.push(orderitem)
                      return (
                          <OrderItem
                              index={totaldorder}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.orderid}
                              item={order}
                          />
                      )
                    }else if(((key.indexOf(order.tiktok_id)>=0 || order.note.indexOf(key)>=0  || key.indexOf("vn")>=0&&order.service>=600 || key.indexOf("us")>=0&&order.service<600 || key.indexOf(order.orderid.toString()) >=0|| order.service.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0 || order.max_threads.toString().indexOf(key.indexOf('th')>=0?key.replace('th',''):'done')>=0) && Math.round((Math.round(Number(order.follower_total==null?0:order.follower_total))/order.follower_order*100))>=keyrate) &&keytrue==1&&keyusertrue==0&&keyratetrue==1){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                      let orderitem = {
                        id: totaldorder,
                        tiktok_id: order.tiktok_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_video.push(orderitem)
                      return (
                          <OrderItem
                              index={totaldorder}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.orderid}
                              item={order}
                          />
                      )
                    }else if((order.user.indexOf(keyuser)>=0 && Math.round((Math.round(Number(order.follower_total==null?0:order.follower_total))/order.follower_order*100))>=keyrate) &&keytrue==0&&keyusertrue==1&&keyratetrue==1){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                      let orderitem = {
                        id: totaldorder,
                        tiktok_id: order.tiktok_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_video.push(orderitem)
                      return (
                          <OrderItem
                              index={totaldorder}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.orderid}
                              item={order}
                          />
                      )}
                    else if(((key.indexOf(order.tiktok_id)>=0 || order.note.indexOf(key)>=0  || key.indexOf("vn")>=0&&order.service>=600 || key.indexOf("us")>=0&&order.service<600 || key.indexOf(order.orderid.toString()) >=0 || order.service.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0 || order.max_threads.toString().indexOf(key.indexOf('th')>=0?key.replace('th',''):'done')>=0) && order.user.indexOf(keyuser)>=0 )&&keytrue==1&&keyusertrue==1&&keyratetrue==0){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                        let orderitem = {
                          id: totaldorder,
                          tiktok_id: order.tiktok_id
                        }
                        //setList_User([...list_user, orderitem])
                        list_video.push(orderitem)
                        return (
                            <OrderItem
                                index={totaldorder}
                                showEdit={role === 'ROLE_ADMIN'}
                                key={order.orderid}
                                item={order}
                            />
                        )
                    }else if(((key.indexOf(order.tiktok_id)>=0 || order.note.indexOf(key)>=0  || key.indexOf("vn")>=0&&order.service>=600 || key.indexOf("us")>=0&&order.service<600 || key.indexOf(order.orderid.toString()) >=0 || order.service.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0 || order.max_threads.toString().indexOf(key.indexOf('th')>=0?key.replace('th',''):'done')>=0) && order.user.indexOf(keyuser)>=0 && Math.round((Math.round(Number(order.follower_total==null?0:order.follower_total))/order.follower_order*100))>=keyrate)&&keytrue==1&&keyusertrue==1&&keyratetrue==1){
                      if(index===0){
                        totaldorder=1
                        totaltimeorder=order.follower_order
                        totalthreadset=order.max_threads
                        totalthread=order.total
                        totalmoney=order.price
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        if(order.service>600){
                          totalvn=1
                        }else{
                          totalmoneyUS=order.price
                          totalUs=1
                          totalthreadus=order.total
                          totalthreadusset=order.max_threads
                          totaltimeorderus=order.follower_order
                          totaltimebuffedorderus=Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }else{
                        totaldorder=totaldorder+1
                        totalmoney=totalmoney+order.price
                        totalthreadset=totalthreadset+order.max_threads
                        totalthread=totalthread+order.total
                        totaltimeorder=order.follower_order+totaltimeorder
                        totaltimebuffedorder=Math.round(Number(order.follower_total==null?0:order.follower_total))+totaltimebuffedorder
                        if(order.service>600){
                          totalvn=1+totalvn
                        }else{
                          totalmoneyUS=totalmoneyUS+order.price
                          totalUs=1+totalUs
                          totalthreadus=totalthreadus+order.total
                          totalthreadusset=totalthreadusset+order.max_threads
                          totaltimeorderus=totaltimeorderus+order.follower_order
                          totaltimebuffedorderus=totaltimebuffedorderus+Math.round(Number(order.follower_total==null?0:order.follower_total))
                        }
                      }
                        let orderitem = {
                          id: totaldorder,
                          tiktok_id: order.tiktok_id
                        }
                        //setList_User([...list_user, orderitem])
                        list_video.push(orderitem)
                        return (
                            <OrderItem
                                index={totaldorder}
                                showEdit={role === 'ROLE_ADMIN'}
                                key={order.orderid}
                                item={order}
                            />
                        )
                    }
                    return null
                  })}
              </tbody>
            </table>
            {loading===true&&<div style={{width:'1%',margin:"auto"}}>
              <div  className="spinner-grow text-success" role="status" style={{}}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}

          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
        {showAdd && (
            <AddModal
                show={true}
                close={() => {
                  setShowAdd(false)
                }}
            />
        )}

        <EditMulti
            show={showEditMulti}
            listvieoid={list_video}
            close={() => {
              setShowEditMulti(false)
            }}
        />
        <AddManualModal
            show={showAddManual}
            close={() => {
              setShowAddManual(false)
            }}
        />

        <AddModal
            show={showManual}
            close={() => {
              setShowManual(false)
            }}
        />

        <BhManualModal
            show={showBhManual}
            close={() => {
              setShowBhManual(false)
            }}
        />
      </div>
  )
}

export {OrderList}
