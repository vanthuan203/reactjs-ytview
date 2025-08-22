import {ChevronDownIcon, SortAscendingIcon, UsersIcon} from '@heroicons/react/solid'
import {OrderModel,OrderModelChecked} from './models/Order'
import {Popover, Transition} from '@headlessui/react'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import AddManualModal from './modals/AddManualModal'
import AddModal from './modals/AddModal'
import {KTSVG} from '../../../_metronic/helpers'
import OrderItem from './components/OrderItem'
import {RootState} from 'setup'
import {actions} from './redux/OrdersRedux'
import {FormGroup, Input, Label} from "reactstrap";
import {randomString} from "react-inlinesvg/lib/helpers";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DateRangePicker } from 'rsuite';
import DatePicker from "react-date-picker";


type Props = {
  done:number
  className: string
  orders: OrderModel[]
}
const OrderList: React.FC<Props> = ({done,className, orders}) => {

  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  const [list_OrderId,setList_OrderId]=useState([{
    id:0,
    order_id:0,
  },])
  let today=new Date()
  today.setHours(0,0,0,0)
  const dispatch = useDispatch()
  let [startDate, setStartDate] = useState(today);
  let [endDate, setEndDate] = useState(today);

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true)
  const API_URL = process.env.REACT_APP_API_URL
  const [showAdd, setShowAdd] = useState(false)
  const [key, setKey] = useState("")
  const [showAddManual, setShowAddManual] = useState(false)
  const [showEditMulti, setShowEditMulti] = useState(false)
  const [keyuser, setKeyUser] = useState("")
  let [keydatestart, setKeyDateStart] = useState(startDate!=null?((startDate.getTime())):0);
  let [keydate, setKeyDate] = useState(1)
  const [keyplatform, setKeyPlatform] = useState("")
  const [keydatestarttrue, setKeyDateStartTrue] = useState(0)
  const [keyplatformtrue, setKeyPlatformTrue] = useState(0)
  let [keydateend, setKeyDateEnd] = useState(endDate!=null?((endDate.getTime())):0);
  const [keydateendtrue, setKeyDateEndTrue] = useState(0)

  const [keytrue, setKeyTrue] = useState(0)
  const [keyusertrue, setKeyUserTrue] = useState(0)
  const [groupName, setGroupName] = useState('')
  const [nameExport, setNameExport] = useState('')
  let [total_Order_Running, setTotal_Order_Running] = useState(0)
  let [total_Order_Running_Show, setTotal_Order_Running_Show] = useState(0)
  let [total_Buff, setTotal_Buff] = useState(0)
  let [total_Buff_Show, setTotal_Buff_Show] = useState(0)
  let [total_Quantity, setTotal_Quantity] = useState(0)
  let [total_Quantity_Show, setTotal_Quantity_Show] = useState(0)
  let [total_Charge, setTotal_Charge] = useState(0)
  let [total_Charge_Show, setTotal_Charge_Show] = useState(0)

  let [total_Thread_Set, setTotal_Thread_Set] = useState(0)
  let [total_Thread_Set_Show, setTotal_Thread_Set_Show] = useState(0)
  let [total_Thread, setTotal_Thread] = useState(0)
  let [total_Thread_Show, setTotal_Thread_Show] = useState(0)
  let [useEff, setuseEff] = useState(0)
  let role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  if(role==="ROLE_SUPPORT"){
    role="ROLE_ADMIN"
  }
  const [listplatform,setlistPlatform]=useState([{
    platform:"Platform"
  },])
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const [list_user,setList_User]=useState([{
    id:"0000000000",
    user:"User"
  },])
  const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 800);
  };
  async function getOptionService() {
    let  requestUrl = API_URL+'service/get_Option_Service';
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    console.log(response)
    const responseJson = await response.json();
    const {list_Platform} = responseJson;

    let platformList =list_Platform.split(',');
    for(var i=0;i<platformList.length;i++){
      let platformItem = {
        platform: platformList[i]
      }
      setlistPlatform([...listplatform, platformItem])
      listplatform.push(platformItem)
    }
  }
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

  useEffect(() => {
    setLoading(true)
    if(orders.length!=0 || list_OrderId.length>0){
      setLoading(false)
    }
    setList_OrderId([])
    useEff=useEff+1
    setuseEff(useEff)
    if(role==="ROLE_ADMIN"){
      setNameExport((keyuser.length==0?"AllUser":keyuser)+'$$'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayStart")+'&&'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayEnd"))
    }else {
      setNameExport('$$'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayStart")+'&&'+(keydatestart!=NaN?new Date(keydatestart).toLocaleDateString('vn-VN'):"ALLDayEnd"))

    }
    if(startDate==null || endDate==null){
      setKeyDateStartTrue(0)
      setKeyDateEndTrue(0)
      keydatestart=0
      keydateend=0
    }else if(startDate!=null && endDate!=null){
      keydatestart=startDate.getTime()
      setKeyDateStart(keydatestart)
      keydateend=endDate.getTime()
      setKeyDateEnd(keydateend)
      keydate=1
      setKeyDate(keydate)
    }
    total_Order_Running_Show=total_Order_Running
    setTotal_Order_Running_Show(total_Order_Running_Show)
    setTotal_Order_Running(0)

    total_Buff_Show=total_Buff
    setTotal_Buff_Show(total_Buff_Show)
    setTotal_Buff(0)

    total_Quantity_Show=total_Quantity
    setTotal_Quantity_Show(total_Quantity_Show)
    setTotal_Quantity(0)

    total_Charge_Show=total_Charge
    setTotal_Charge_Show(total_Charge_Show)
    setTotal_Charge(0)

    total_Thread_Set_Show=total_Thread_Set
    setTotal_Thread_Set_Show(total_Thread_Set_Show)
    setTotal_Thread_Set(0)

    total_Thread_Show=total_Thread
    setTotal_Thread_Show(total_Thread_Show)
    setTotal_Thread(0)
    if(useEff<=1){
      getcounttimeorder();
      getOptionService();
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

  }, [keyusertrue,keydate,startDate,endDate,keydatestart,keydateend,keytrue,keyuser,key,keyplatform,orders.length,,])

  
  async function Export(csvData:OrderModelChecked[],fileName:string){
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  const addGroup = () => {
    if (groupName.length === 0) {
      alert('vui lòng điền tên nhóm')
      return
    }

    dispatch(actions.addGroupRequest(groupName))
    setGroupName('')
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
              <div className="col-lg-5 col-sm-12 c-order__header">
                <p style={{fontSize:11,marginTop:5}} className="fw-bold c-order__list">
                <span  className='fw-bolder fs-3 mb-1'>
                  <span className='badge badge-success 1' style={{fontSize:12,color:"#090909",backgroundColor:"rgb(255,255,255)",marginLeft:5}}>{"Order History " +total_Order_Running_Show} </span>
                </span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"rgba(218,30,30,0.97)",marginLeft:5,marginTop:3}}>${total_Charge_Show.toFixed(Number.isInteger(total_Charge_Show)==true?0:2)}
                  </span>
                  <span className='badge badge-success 1' style={{fontSize:11,color:"#090909",backgroundColor:"rgb(255,255,255)",marginLeft:5,marginTop:3}}>{"Quantity "+ ((total_Quantity_Show)>=1000?(format1((total_Quantity_Show/1000))+"K "):(format1((total_Quantity_Show))))}
                  </span>
                </p>
              </div>
              <div className="col-lg-7 col-sm-12 c-order__header">
                <div style={{float:"right",fontWeight:"bold"}}>
                  <DatePicker

                      value={startDate}
                      onChange={(date: React.SetStateAction<Date>) =>{ setStartDate(date)
                      }
                      }

                  />
                  <DatePicker
                      value={endDate}
                      onChange={(date: React.SetStateAction<Date>) =>{
                        setEndDate(date)
                      }
                      }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="page-header__content">
            <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
              <div style={{width:"60%"}}>
                <div>
                  <Input style={{marginLeft:10,maxWidth:230,width:isMobile==true?100:200,height:40,marginTop:10,float:"left"}}
                         id="note"
                         name="note"
                         value={key}
                         placeholder="Search..."
                         onChange={(e) => setKey(e.target.value)
                         }
                         type="text"
                  />
                  <button style={{ marginLeft:3,fontWeight:'bold',maxWidth:80,color:"black",backgroundColor:"#c0e1ce",height:40,marginTop:10,marginRight:10,float:"left"}}
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
                  <Input style={{margin:10,width:"auto",height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"left"}}
                      //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                         onChange={(e) => {
                           setKeyPlatform(e.target.value)
                           setKeyPlatformTrue(1)
                         }}
                         className="form-control form-control-solid"
                         type="select"
                         value={keyplatform}
                  >
                    {
                      listplatform.map((item, index) => {
                        return(
                            <option key={item.platform.indexOf("Platform")>=0?"":item.platform} value={item.platform.indexOf("Platform")>=0?"":item.platform}>
                              {item.platform.charAt(0).toUpperCase()+item.platform.slice(1)}</option>)
                      })
                    }
                  </Input>
                </div>
              </div>
              <div style={{width:"40%"}}>
                <button style={{height:40,margin:10,float:"right"}}
                        onClick={() => {Export(list_OrderId,nameExport)
                        }}
                        className='btn btn-success'
                >
                  Export
                </button>
                {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:isMobile==true?100:200,maxWidth:230,height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"right"}}
                    //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                             onChange={(e) => {
                                               setKeyUser(e.target.value)
                                               setKeyUserTrue(1)
                                             }}
                                             className="form-control form-control-solid"
                                             type="select"
                                             value={keyuser}
                >
                  {
                    list_user.map((item, index) => {
                      return(
                          <option key={item.user.indexOf("User")>=0?"":item.user} value={item.user.indexOf("User")>=0?"":item.user}>
                            {item.user}</option>)
                    })
                  }

                </Input>}
              </div>
            </div>
          </div>
          <div className="page-header__content">
            <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
              {role==="TEST"&&<div style={{width:"100%"}}>
                <button style={{height:40,margin:10,float:"right"}}
                        onClick={() => {Export(list_OrderId,nameExport)
                        }}
                        className='btn btn-google'
                >
                  Đối soát
                </button>
                <button style={{height:40,margin:10,float:"right"}}
                        onClick={() => {
                          setShowAddManual(true)
                        }}
                        className='btn btn-success'
                >
                  Tra cứu nhanh
                </button>
              </div>}
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
                <th className='min-w-25px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>STT</span>
                </th>
                <th className='min-w-50px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Id</span>
                </th>
                <th className='min-w-50px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Platform</span>
                </th>
                <th className='min-w-50px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Mode</span>
                </th>
                <th className='min-w-300px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Info</span>
                </th>
                <th className='min-w-100px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Status</span>
                </th>
                <th className='min-w-150px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Service</span>
                </th>
                <th className='min-w-200px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Time</span>
                </th>
                {role!="ROLE_USER"&&<th   className='min-w-100px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>User</span>
                </th>}
                <th   className='min-w-150px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Note</span>
                </th>
                <th className='min-w-150px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Check</span>
                </th>
              </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
              {orders &&
                  orders.map((order: OrderModel, index: number) => {
                    if (keyusertrue==0&&keytrue==0&&keydate==0&&keyplatformtrue==0) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }else if(order.platform.indexOf(keyplatform)>=0 &&keyusertrue==0&&keytrue==0&&keydate==0&&keyplatformtrue==1){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }else if(order.username.indexOf(keyuser)>=0 &&keyusertrue==1&&keytrue==0&&keydate==0&&keyplatformtrue==0){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }else if((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0  || key.indexOf(order.order_id.toString()) >=0
                            || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                        || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                        &&keytrue==1&&keyusertrue==0&&keydate==0&&keyplatformtrue==0){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }else if((keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)&&keytrue==0&&keyusertrue==0&&keydate==1&&keyplatformtrue==0){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }
                    else if(order.username.indexOf(keyuser)>=0&&keytrue==0&&keyusertrue==1&&keydate==1&&keyplatformtrue==0&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)
                    ){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }else if(order.platform.indexOf(keyplatform)>=0&&keytrue==0&&keyusertrue==0&&keydate==1&&keyplatformtrue==1&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)
                    ){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }else if(order.platform.indexOf(keyplatform)>=0&&order.username.indexOf(keyuser)>=0&&keytrue==0&&keyusertrue==1&&keydate==0&&keyplatformtrue==1
                    ){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }
                    else if((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0  || key.indexOf(order.order_id.toString()) >=0
                            || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                        &&keytrue==1&&keyusertrue==0&&keydate==1&&keyplatformtrue==0&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)
                    ){
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }
                    else if(((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0 || key.indexOf(order.order_id.toString()) >=0
                                || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                                || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                                || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                        && order.username.indexOf(keyuser)>=0 )
                        &&keytrue==1&&keyusertrue==1&&keydate==0&&keyplatformtrue==0) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }
                    else if(((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0 || key.indexOf(order.order_id.toString()) >=0
                                || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                                || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                                || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                            && order.platform.indexOf(keyplatform)>=0 )
                        &&keytrue==1&&keyusertrue==0&&keydate==0&&keyplatformtrue==1) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }
                    else if(((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0
                            || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                            || key.indexOf(order.order_id.toString()) >=0
                            || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                            || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0) && order.username.indexOf(keyuser)>=0)
                        &&keytrue==1&&keyusertrue==1&&keydate==1&&keyplatformtrue==0&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    } else if(((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0  || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                                || key.indexOf(order.order_id.toString()) >=0 || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                                || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                            && order.platform.indexOf(keyplatform)>=0)
                        &&keytrue==1&&keyusertrue==0&&keydate==1&&keyplatformtrue==1&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    } else if(((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0  || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                                || key.indexOf(order.order_id.toString()) >=0 || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                                || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                            && order.username.indexOf(keyuser)>=0)
                        &&keytrue==1&&keyusertrue==1&&keydate==0&&keyplatformtrue==1&&order.platform.indexOf(keyplatform)>=0) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    } else if( order.username.indexOf(keyuser)>=0
                            && order.platform.indexOf(keyplatform)>=0
                        &&keytrue==0&&keyusertrue==1&&keydate==1&&keyplatformtrue==1&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    } else if(((key.indexOf(order.order_key)>=0 || order.note.indexOf(key)>=0  || order.task.toString().indexOf(key.indexOf('#')>=0?key.replace('#',''):'done')>=0
                                || key.indexOf(order.order_id.toString()) >=0 || order.service_id.toString().indexOf(key.indexOf('?')>=0?key.replace('?',''):'done')>=0
                                || order.mode.toString().indexOf(key.indexOf('@')>=0?key.replace('@',''):'done')>=0)
                            && order.platform.indexOf(keyplatform)>=0 && order.username.indexOf(keyuser)>=0)
                        &&keytrue==1&&keyusertrue==1&&keydate==1&&keyplatformtrue==1&&
                        (keydatestart<=order.end_time&&order.end_time<=keydateend+24*60*60*1000-1)) {
                      if(index===0){
                        total_Order_Running=1
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)
                        total_Thread_Set=order.thread
                        total_Thread=order.total_thread
                        total_Buff=order.total
                        total_Charge=order.charge
                      }else{
                        total_Order_Running=1+total_Order_Running;
                        total_Quantity=order.quantity+order.quantity*(order.bonus/100)+total_Quantity;
                        total_Thread_Set=order.thread+total_Thread_Set;
                        total_Thread=order.total_thread+total_Thread;
                        total_Buff=order.total+total_Buff;
                        total_Charge=order.charge+total_Charge;
                      }
                      let order_Item = {
                        id: total_Order_Running,
                        order_id: order.order_id
                      }
                      //setList_User([...list_user, orderitem])
                      list_OrderId.push(order_Item)
                      return (
                          <OrderItem
                              index={total_Order_Running}
                              showEdit={role === 'ROLE_ADMIN'}
                              key={order.order_id}
                              item={order}
                          />
                      )
                    }
                    return null
                  })}
              </tbody>
              {/* end::Table body */}
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

        <AddManualModal
            show={showAddManual}
            close={() => {
              setShowAddManual(false)
            }}
        />
      </div>
  )
}

export {OrderList}
