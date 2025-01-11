import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  Modal,
  Form, FormGroup, Input, Label
} from "reactstrap"
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'
import { addorderv2 } from '../../redux/OrdersCRUD'
import {randomString} from "react-inlinesvg/lib/helpers";
import {getUserByToken} from "../../../auth/redux/AuthCRUD";
type Props = {
  show: boolean
  close: () => void
}

const AddModal: React.FC<Props> = ({ show, close }) => {
  const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
  const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
  const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
  const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
  const adding: boolean = useSelector<RootState>(({ orderdone }) => orderdone.adding, shallowEqual) as boolean || false
  const API_URL = process.env.REACT_APP_API_URL
  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }

  const dispatch = useDispatch()
  const [maxthreads, setMaxthreads] = useState(50)
  const [videoid, setVideoid] = useState("")
  const [service, setService] = useState(666)
  const [note, setNote] = useState("")
  const [vieworder, setVieworder] = useState(1000)
  const [countorder, setCountorder] = useState(8)
  const [user,setUser]=useState(username)
  const [showorder,setShowOrder]=useState(true)
  const [orderdonenum,setOrderDoneNum]=useState(0)
  const [list_order,setList_Todo]=useState([{
    id:"0000000000",
    videoid:"",
    state:"",
    time:0,
    price:0

  },])
  const [list_service,setList_Service]=useState([{
    id:"000",
    user:"All Service"
  },])


  async function getcounttimeorder() {
    let  requestUrl = API_URL+'service/getallservice?role='+role;
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    console.log("tiktok")
    const responseJson = await response.json();
    const {user} = responseJson;
    let arrlist =user.split(',');
    for(var i=0;i<arrlist.length;i++){
      let orderitem = {
        id: arrlist[i].split('|')[0].trim(),
        user: arrlist[i]
      }
      setList_Service([...list_service, orderitem])
      list_service.push(orderitem)
    }
  }

  async  function   getkey() {
    let  requestUrl = API_URL+'videoview/getkey';
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson = await response.json();
    const {key} = responseJson;
    return key
  }
  let [sumprice,setSumPrice]=useState(0)
  let [sumtime,setSumTime]=useState(0)
  let [sumorder,setSumOrder]=useState(0)
  const dismissModal = () => {
    close()
    setShowOrder(true)
    setVideoid("")

    let or={
      id:"0000000000",
      videoid:"",
      state:"",
      time:0,
      price:0
    }
    setList_Todo([or])
    if(orderdonenum>0){
      if(role.indexOf("ROLE_ADMIN")>=0){
        dispatch(actions.requestOrders(''))
      }else{
        dispatch(actions.requestOrders(user))
      }
    }
    setOrderDoneNum(0)
  }
 
  const  submit = async () => {
    let  requestUrl = API_URL+'videoview/getkey';
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson = await response.json();
    const {key} = responseJson;
    setSumOrder(0)
    setSumTime(0)
    setSumPrice(0)
    if (videoid.trim() === "") {
      alert("VideoId không để trống!")
      return
    }

    if (vieworder < 100) {
      alert("Số giờ phải lớn hơn 100!")
      return
    }
    setShowOrder(false)
    const channelid = videoid.split('\n')
    console.log(channelid.length)
  }

  useEffect(() => {
    getcounttimeorder()
    console.log(list_service)
    if (!adding) {
      close()
    }
  }, [adding])

  return (
      <Modal isOpen={show}
             modalTransition={{ timeout: 500 }}>
        <div className="modal-content">
          <div className="modal-header" style={{display: showorder == true ? "true" : "true"}}>
            <h5 className="modal-title">{showorder==true?'Thêm nhiệm vụ với danh sách UID':'Thành công: '+sumorder+' | view: '+format1(sumtime)+' | Giá: '+sumprice.toPrecision()+'$'}</h5>
            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
              <span className="svg-icon svg-icon-2x"></span>
            </div>
          </div>
          <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
            <Form>
              <FormGroup>
                <Label for="exampleEmail" className="required form-label">
                  Danh sách link kênh
                </Label>
                <Input style={{minHeight:250}}
                       id="list_id"
                       name="list_id"
                       className="form-control form-control-solid"
                       placeholder={"1 UID một dòng..."}
                       value={videoid}
                       type={"textarea"}
                       onChange={(e) => setVideoid(e.target.value)}
                />
              </FormGroup>
              <div>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Số video Order
                  </Label>
                  <Input style={{fontWeight:"bold"}}
                         id="vieworder"
                         name="vieworder"
                         value={countorder}
                         className="form-control form-control-solid"
                         placeholder="ví dụ : 100"
                         onChange={(e) => setCountorder(parseInt(e.target.value))}
                         type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Views Order
                  </Label>
                  <Input style={{fontWeight:"bold"}}
                         id="vieworder"
                         name="vieworder"
                         value={vieworder}
                         className="form-control form-control-solid"
                         placeholder="ví dụ : 100"
                         onChange={(e) => setVieworder(parseInt(e.target.value))}
                         type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail"  className="required form-label">
                    Dịch vụ
                  </Label>
                  <Input style={{fontWeight:"bold"}}
                         onChange={(e) => setService(parseInt(e.target.value))}
                         className="form-control form-control-solid"
                         type="select"
                         value={service}
                  >
                    {
                      list_service.map((item, index) => {
                        if(item.id!='000')
                          return(
                              <option key={item.id} value={item.id}>
                                {item.user}</option>)
                      })
                    }
                  </Input>
                </FormGroup>
                {role != "ROLE_USER" &&<FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Luồng
                  </Label>
                  <Input style={{fontWeight:"bold"}}
                         id="max_thread"
                         name="max_thread"
                         value={maxthreads}
                         className="form-control form-control-solid"
                         placeholder="ví dụ : 1000"
                         onChange={(e) => setMaxthreads(parseInt(e.target.value))}
                         type="number"
                  />
                </FormGroup>}
                <FormGroup>
                  <Label for="exampleEmail" >
                    Ghi chú
                  </Label>
                  <Input
                      id="note"
                      name="note"
                      value={note}
                      className="form-control form-control-solid"
                      placeholder="..."
                      onChange={(e) => setNote(e.target.value)}
                      type="text"
                  />
                </FormGroup>
              </div>
            </Form>
          </div>
          <div className="modal-body">
            <div className="card-body" style={{width: "100%"}}>
              {/* begin::Table container */}

              {
                list_order.map((item, index) => {
                  if (item.videoid.length >0) return (
                      <ul className="list-group list-group-flush" id={item.videoid} key={item.videoid}>
                        <li className="list-group-item" style={{minHeight: 10}}>
                          <div className="row">
                            <div className="col-1 d-flex align-items-center">{index}.</div>
                            <div className="col-1 d-flex align-items-center">
                                                            <span className='symbol-label'>
                                                              <img

                                                                  src={toAbsoluteUrl(item.state.indexOf('OK')>=0?'/media/icons/duotune/general/gen048.svg':'/media/icons/duotune/general/gen050.svg')}
                                                                  className='svg-icon-1'
                                                                  alt=''
                                                              />
                                                            </span>
                            </div>
                            <div className="col-3 d-flex align-items-center">{item.videoid}</div>
                            <div style={{color:item.state.indexOf('OK')>=0?'green':'red'}} className="col-3 d-flex align-items-center">{item.state}</div>
                            <div className="col-1 d-flex align-items-center">{item.time}m</div>
                            <div className="col-2 d-flex justify-content-end align-items-center">
                              {item.price.toPrecision()}$
                            </div>
                          </div>
                        </li>
                      </ul>
                  )
                })
              }
              {/* end::Table container */}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
            <button disabled={adding} type="button" onClick={submit} style={{backgroundColor:"#26695c",color:"white",display: showorder == true ? "true" : "none"}}  className="btn">{adding ? "Chờ" : "Thêm đơn"}</button>
          </div>
        </div>
      </Modal>
  )
}

export default AddModal