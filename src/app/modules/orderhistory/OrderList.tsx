import {ChevronDownIcon, SortAscendingIcon, UsersIcon} from '@heroicons/react/solid'
import {Group, OrderModel,OrderModelChecked} from './models/Order'
import {Popover, Transition} from '@headlessui/react'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import AddManualModal from './modals/AddManualModal'
import AddModal from './modals/AddModal'
import EditMulti from './modals/EditMulti'
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
  const [list_orderhistory,setList_OrderHistory]=useState([{
    id: 0,
    videoid: '',
    timebuff:0,
    timebuffhtotal: 0,
    viewtotal:0,
    viewstart:0,
    viewend:0,
    insertdate: "",
    enddate: "",
    cancel:0,
    user:"",
    note:"",
    price:0,

  }])
  let today=new Date()
  today.setHours(0,0,0,0)
  const dispatch = useDispatch()
  let [startDate, setStartDate] = useState(today);
  let [endDate, setEndDate] = useState(today);


  const [loading, setLoading] = useState(true)
  const API_URL = process.env.REACT_APP_API_URL
  const [showAdd, setShowAdd] = useState(false)
  const [key, setKey] = useState("")
  const [showAddManual, setShowAddManual] = useState(false)
  const [showEditMulti, setShowEditMulti] = useState(false)
  const [keyuser, setKeyUser] = useState("")
  let [keydatestart, setKeyDateStart] = useState(startDate!=null?((startDate.getTime())):0);
  let [keydate, setKeyDate] = useState(1)
  const [keydatestarttrue, setKeyDateStartTrue] = useState(0)
  let [keydateend, setKeyDateEnd] = useState(endDate!=null?((endDate.getTime())):0);
  const [keydateendtrue, setKeyDateEndTrue] = useState(0)

  const [keytrue, setKeyTrue] = useState(0)
  const [keyusertrue, setKeyUserTrue] = useState(0)
  const [groupName, setGroupName] = useState('')
  const [nameExport, setNameExport] = useState('')

  let [totaltimebuffedorder, setTotalTimeBuffedOrder] = useState(0)
  let [totaltimebuffedordershow, setTotalTimeBuffedOrderShow] = useState(0)
  let [totaldorder, setTotalOrder] = useState(0)
  let [totaldordershow, setTotalOrderShow] = useState(0)
  let [useEff, setuseEff] = useState(0)
  const role: string =
    (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const groups: Group[] =
    (useSelector<RootState>(({orders}) => orders.groups, shallowEqual) as Group[]) || []
  const currentGroup: Group =
    (useSelector<RootState>(({orders}) => orders.currentGroup, shallowEqual) as Group) || undefined
  let sumtimedone=0;
  let sumorder=0;
  orders.forEach(item=>{
    sumtimedone=sumtimedone+Math.round(Number(item.timebuffhtotal==null?0:item.timebuffhtotal)/3600)
    sumorder=sumorder+1;
  })
  const [list_user,setList_User]=useState([{
    id:"0000000000",
    user:"All User"
  },])

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
      console.log(list_user)
    }
  }

  useEffect(() => {
    setLoading(true)
    if(orders.length!=0 || list_orderhistory.length>0){
      setLoading(false)
    }
    setList_OrderHistory([])
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

    totaldordershow=totaldorder
    setTotalOrderShow(totaldordershow)
    setTotalOrder(0)

    totaltimebuffedordershow=totaltimebuffedorder
    setTotalTimeBuffedOrderShow(totaltimebuffedordershow)
    totaltimebuffedorder=0
    setTotalTimeBuffedOrder(0)
    if(useEff<=1){
      getcounttimeorder();
    }

  }, [keyusertrue,keydate,startDate,endDate,keydatestart,keydateend,keytrue,keyuser,key,orders.length,,])

  const selectGroup = (item: Group) => {
    dispatch(actions.selectGroup(item))
  }

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
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-5 col-sm-12 c-order__header">
              <span  className='fw-bolder fs-3 mb-1'>Đơn đã xong</span>
              <span  className='ml-2 fw-bold fs-7'>({useEff<=1?sumorder:totaldordershow} Video)</span>
              <p className="fw-bold c-order__list">
                <span style={{fontSize:12,marginTop:5}}>Tổng đã chạy: {format1(useEff<=1?sumtimedone:totaltimebuffedordershow)}h</span>
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
                <Input style={{margin:10,width:"48%",maxWidth:130,minWidth:60,height:40,float:"left"}}
                       id="note"
                       name="note"
                       value={key}
                       placeholder="Search..."
                       onChange={(e) => setKey(e.target.value)}
                       type="text"
                />
                <button style={{fontWeight:'bold',color:"black",backgroundColor:"#c0e1ce",height:40,marginTop:10,float:"left"}}
                        onClick={() => {setKeyTrue(1)
                        }}
                        className='btn btn-sm'
                >
                  Search
                </button>
              </div>
            </div>
            <div style={{width:"40%"}}>
              <button style={{height:40,margin:10,float:"right"}}
                      onClick={() => {Export(list_orderhistory,nameExport)
                      }}
                      className='btn btn-success'
              >
                Export
              </button>
              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:100,height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"right"}}
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
                        <option key={item.user.indexOf("All User")>=0?"":item.user} value={item.user.indexOf("All User")>=0?"":item.user}>
                          {item.user}</option>)
                  })
                }

              </Input>}
            </div>
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
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>STT</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Info</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Start</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>End</span>
                </th>
                {role!="ROLE_USER"&&<th   className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>User</span>
                </th>}
                <th   className='min-w-10px text-sm'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Note</span>
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {orders &&
                orders.map((order: OrderModel, index: number) => {
                  if (keyusertrue==0&&keytrue==0&&keydate==0) {
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price

                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }else if(order.user.indexOf(keyuser)>=0 &&keyusertrue==1&&keytrue==0&&keydate==0){
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price

                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }else if((order.videoid.indexOf(key)>=0 || order.note.indexOf(key)>=0 )&&keytrue==1&&keyusertrue==0&&keydate==0){
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price

                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }else if((keydatestart<=order.enddate&&order.enddate<=keydateend+24*60*60*1000-1)&&keytrue==0&&keyusertrue==0&&keydate==1){
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price

                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }
                  else if(order.user.indexOf(keyuser)>=0&&keytrue==0&&keyusertrue==1&&keydate==1&&
                      (keydatestart<=order.enddate&&order.enddate<=keydateend+24*60*60*1000-1)
                  ){
                    console.log('Oke'+order.enddate)
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price

                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }else if((order.videoid.indexOf(key)>=0 || order.note.indexOf(key)>=0 )&&keytrue==1&&keyusertrue==0&&keydate==1&&
                      (keydatestart<=order.enddate&&order.enddate<=keydateend+24*60*60*1000-1)
                  ){
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price

                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }
                  else if(((order.videoid.indexOf(key)>=0 || order.note.indexOf(key)>=0) && order.user.indexOf(keyuser)>=0 )&&keytrue==1&&keyusertrue==1&&keydate==0) {
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price
                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
                            item={order}
                        />
                    )
                  }
                  else if(((order.videoid.indexOf(key)>=0 || order.note.indexOf(key)>=0) && order.user.indexOf(keyuser)>=0 )&&keytrue==1&&keyusertrue==1&&keydate==1&&
                      (keydatestart<=order.enddate&&order.enddate<=keydateend+24*60*60*1000-1)) {
                    if(index===0){
                      totaldorder=1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)
                    }else{
                      totaldorder=totaldorder+1
                      totaltimebuffedorder=Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600)+totaltimebuffedorder
                    }
                    let orderitem = {
                      id: totaldorder,
                      videoid: order.videoid,
                      timebuff:order.timebuff,
                      viewtotal:order.viewtotal,
                      timebuffhtotal: Math.round(Number(order.timebuffhtotal==null?0:order.timebuffhtotal)/3600),
                      viewstart:order.viewstart,
                      viewend:order.viewend,
                      insertdate: new Date(order.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(order.insertdate).toLocaleTimeString('vn-VN'),
                      enddate: new Date(order.enddate).toLocaleDateString('vn-VN') +" "+ new Date(order.enddate).toLocaleTimeString('vn-VN'),
                      cancel:order.cancel,
                      user:order.user,
                      note:order.note,
                      price:order.price
                    }
                    list_orderhistory.push(orderitem)
                    return (
                        <OrderItem
                            index={index}
                            showEdit={role === 'ROLE_ADMIN'}
                            key={order.videoid+index.toString()}
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

      <EditMulti
        show={showEditMulti}
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
    </div>
  )
}

export {OrderList}
