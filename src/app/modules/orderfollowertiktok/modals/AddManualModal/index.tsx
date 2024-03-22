import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
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

const AddManualModal: React.FC<Props> = ({ show, close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ orderfollowertiktok }) => orderfollowertiktok.adding, shallowEqual) as boolean || false
    const API_URL = process.env.REACT_APP_API_URL
    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }

    const dispatch = useDispatch()
    const [max_threads, setMax_threads] = useState(50)
    const [tiktok_id, setTiktok_id] = useState("")
    const [service, setService] = useState(1555)
    const [note, setNote] = useState("")
    const [follower_order, setFollower_order] = useState(1000)
    const [user,setUser]=useState(username)
    const [showorder,setShowOrder]=useState(true)
    const [orderdonenum,setOrderDoneNum]=useState(0)
    const [list_order,setList_Todo]=useState([{
        id:"0000000000",
        tiktok_id:"",
        state:"",
        time:0,
        price:0

    },])
    const [list_service,setList_Service]=useState([{
        id:"000",
        user:"All Service"
    },])


    async function getcounttimeorder() {
        let  requestUrl = API_URL+'servive/getAllServiceTiktok?role='+role;
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
                id: arrlist[i].split('|')[0],
                user: arrlist[i]
            }
            setList_Service([...list_service, orderitem])
            list_service.push(orderitem)
        }
    }
    let [sumprice,setSumPrice]=useState(0)
    let [sumtime,setSumTime]=useState(0)
    let [sumorder,setSumOrder]=useState(0)
    const dismissModal = () => {
        close()
        setShowOrder(true)
        setTiktok_id("")
        let or={
            id:"0000000000",
            tiktok_id:"",
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
    async function order_video_ver2(tiktok_id: string) {
            await addorderv2(tiktok_id,note,max_threads,follower_order,service,user)
                .then((data: any) => {
                    if (data.data.channel_tiktok == "true") {
                        setOrderDoneNum(orderdonenum + 1)
                        let orderitem = {
                            id: randomString(10),
                            tiktok_id: tiktok_id,
                            state: "OK",
                            time: data.data.time,
                            price: data.data.price
                        }

                        sumprice = sumprice + data.data.price
                        setSumPrice(sumprice)
                        sumtime = sumtime + follower_order;
                        setSumTime(sumtime)
                        sumorder = sumorder + 1
                        setSumOrder(sumorder)
                        console.log(sumprice, sumtime, sumorder)
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    } else {
                        let orderitem = {
                            id: randomString(10),
                            tiktok_id: tiktok_id,
                            time: 0,
                            state: data.data.channel_tiktok,
                            price: 0
                        }
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    }

                })
                .catch(() => {
                    let orderitem = {
                        id: randomString(10),
                        tiktok_id: tiktok_id,
                        state: 'Error',
                        time: 0,
                        price: 0
                    }
                    setList_Todo([...list_order, orderitem])
                    list_order.push(orderitem)
                })
    }
    const  submit = async () => {
        setSumOrder(0)
        setSumTime(0)
        setSumPrice(0)

        if (follower_order < 100) {
            alert("Số follower phải lớn hơn 100!")
            return
        }

        setShowOrder(false)
        const list_Link = tiktok_id.split('\n')
        for (var i = 0; i < list_Link.length; i++) {
            let link_web = list_Link[i]
            await order_video_ver2(link_web)
            await getUserByToken()
        }
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
                    <h5 className="modal-title">{showorder==true?'Thêm nhiệm vụ với danh sách link tiktok':'Thành công: '+sumorder+' | traffic: '+format1(sumtime)+' | Giá: '+sumprice.toPrecision()+'$'}</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Danh sách link tiktok
                            </Label>
                            <Input style={{minHeight:250}}
                                id="list_id"
                                name="list_id"
                                className="form-control form-control-solid"
                                placeholder={"1 link  một dòng..."}
                                value={tiktok_id}
                                type={"textarea"}
                                onChange={(e) => setTiktok_id(e.target.value)}
                            />
                        </FormGroup>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Follower Order
                                </Label>
                                <Input style={{fontWeight:"bold"}}
                                    id="trafficorder"
                                    name="trafficorder"
                                    value={follower_order}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 100"
                                    onChange={(e) => setFollower_order(parseInt(e.target.value))}
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
                                    value={max_threads}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setMax_threads(parseInt(e.target.value))}
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
                                if (item.tiktok_id.length >0) return (
                                    <ul className="list-group list-group-flush" id={item.tiktok_id} key={item.tiktok_id}>
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
                                                <div className="col-3 d-flex align-items-center">{item.tiktok_id}</div>
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

export default AddManualModal