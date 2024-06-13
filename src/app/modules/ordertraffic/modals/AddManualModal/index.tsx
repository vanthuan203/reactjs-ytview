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
import { Group } from '../../models/Order'
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
    const adding: boolean = useSelector<RootState>(({ orderdone }) => orderdone.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ orderdone }) => orderdone.groups, shallowEqual) as Group[] || []
    const API_URL = process.env.REACT_APP_API_URL
    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }

    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(50)
    const [link, setLink] = useState("")
    const [service, setService] = useState(901)
    const [note, setNote] = useState("")
    const [trafficorder, setTrafficorder] = useState(1000)
    const [keywords, setKeywords] = useState("")
    const [user,setUser]=useState(username)
    const [showorder,setShowOrder]=useState(true)
    const [orderdonenum,setOrderDoneNum]=useState(0)
    const [list_order,setList_Todo]=useState([{
        id:"0000000000",
        link:"",
        state:"",
        time:0,
        price:0

    },])
    const [list_service,setList_Service]=useState([{
        id:"000",
        user:"All Service"
    },])


    async function getcounttimeorder() {
        let  requestUrl = API_URL+'servive/getallservicetraffic?role='+role;
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
                id: arrlist[i].split('|')[0].trim(),
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
        setLink("")
        let or={
            id:"0000000000",
            link:"",
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
    async function order_video_ver2(link: string) {
            await addorderv2(link,note,maxthreads,trafficorder,keywords,service,user)
                .then((data: any) => {
                    if (data.data.webtraffic == "true") {
                        setOrderDoneNum(orderdonenum + 1)
                        let orderitem = {
                            id: randomString(10),
                            link: link,
                            state: "OK",
                            time: data.data.time,
                            price: data.data.price
                        }

                        sumprice = sumprice + data.data.price
                        setSumPrice(sumprice)
                        sumtime = sumtime + trafficorder;
                        setSumTime(sumtime)
                        sumorder = sumorder + 1
                        setSumOrder(sumorder)
                        console.log(sumprice, sumtime, sumorder)
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    } else {
                        let orderitem = {
                            id: randomString(10),
                            link: link,
                            time: 0,
                            state: data.data.webtraffic,
                            price: 0
                        }
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    }

                })
                .catch(() => {
                    let orderitem = {
                        id: randomString(10),
                        link: link,
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
        if (keywords.trim() === "") {
            alert("keyword không để trống!")
            return
        }

        if (trafficorder < 100) {
            alert("Số traffic phải lớn hơn 100!")
            return
        }

        setShowOrder(false)
        const list_Link = link.split('\n')
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
                    <h5 className="modal-title">{showorder==true?'Thêm nhiệm vụ với danh sách link website':'Thành công: '+sumorder+' | traffic: '+format1(sumtime)+' | Giá: '+sumprice.toPrecision()+'$'}</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Danh sách link website
                            </Label>
                            <Input style={{minHeight:250}}
                                id="list_id"
                                name="list_id"
                                className="form-control form-control-solid"
                                placeholder={"1 link  một dòng..."}
                                value={link}
                                type={"textarea"}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </FormGroup>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Traffic Order
                                </Label>
                                <Input style={{fontWeight:"bold"}}
                                    id="trafficorder"
                                    name="trafficorder"
                                    value={trafficorder}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 100"
                                    onChange={(e) => setTrafficorder(parseInt(e.target.value))}
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
                                    Từ khóa
                                </Label>
                                <Input
                                    id="keywords"
                                    name="keywords"
                                    value={keywords}
                                    className="form-control form-control-solid"
                                    placeholder="..."
                                    onChange={(e) => setKeywords(e.target.value)}
                                    type="text"
                                />
                            </FormGroup>
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
                                if (item.link.length >0) return (
                                    <ul className="list-group list-group-flush" id={item.link} key={item.link}>
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
                                                <div className="col-3 d-flex align-items-center">{item.link}</div>
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