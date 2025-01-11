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
import {addorderv2, bhorderv2} from '../../redux/OrdersCRUD'
import {randomString} from "react-inlinesvg/lib/helpers";
import {getUserByToken} from "../../../auth/redux/AuthCRUD";
type Props = {
    show: boolean
    close: () => void
}

const BhManualModal: React.FC<Props> = ({ show, close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ orderdone }) => orderdone.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ orderdone }) => orderdone.groups, shallowEqual) as Group[] || []

    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }

    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(50)
    const [videoid, setVideoid] = useState("")
    const [homerate,setHome_rate]=useState(0)
    //
    const [searchrate,setSearch_rate]=useState(80)
    const [suggestrate,setSuggest_rate]=useState(0)
    const [directrate,setDirect_rate]=useState(20)
    //
    const [likerate,setLike_rate]=useState(25)
    const [commentrate,setComment_rate]=useState(25)
    const [mobilerate,setMobile_rate]=useState(0)
    //
    const [note, setNote] = useState("")
    const [viewstart, setViewstart] = useState(0)
    const [timebuff, setTimebuff] = useState(4000)
    const [optionbuff, setOptionbuff] = useState(0)
    const [enabled,setEnabled]=useState(1)
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
    async function order_video_ver2(video: string) {
            await bhorderv2(video)
                .then((data: any) => {
                    if (data.data.videoview == "true") {
                        setOrderDoneNum(orderdonenum + 1)
                        let orderitem = {
                            id: randomString(10),
                            videoid: video,
                            state: "OK",
                            time: data.data.time,
                            price: data.data.price
                        }

                        sumprice = sumprice + data.data.price
                        setSumPrice(sumprice)
                        sumtime = sumtime + timebuff;
                        setSumTime(sumtime)
                        sumorder = sumorder + 1
                        setSumOrder(sumorder)
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    } else {
                        let orderitem = {
                            id: randomString(10),
                            videoid: video,
                            time: 0,
                            state: data.data.videoview,
                            price: 0
                        }
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    }

                })
                .catch(() => {
                    let orderitem = {
                        id: randomString(10),
                        videoid: video,
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
        if (videoid.trim() === "") {
            alert("VideoId không để trống!")
            return
        }

        if (timebuff < 100) {
            alert("Số giờ phải lớn hơn 100!")
            return
        }

        if (homerate + searchrate + suggestrate + directrate != 100) {
            alert("Tổng nguồn view không đúng!")
            return
        }
        setShowOrder(false)
        const videoidlist = videoid.split('\n')
        for (var i = 0; i < videoidlist.length; i++) {
            let video = videoidlist[i]
            await order_video_ver2(video)
            await getUserByToken()
        }
    }

    useEffect(() => {
        if (!adding) {
            close()
        }
    }, [adding])

    return (
        <Modal isOpen={show}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header" style={{display: showorder == true ? "true" : "true"}}>
                    <h5 className="modal-title">{showorder==true?'Bảo hành với DS VideoId hoặc OrderId':'Bảo hành thành công: '+sumorder+' | Giờ: '+sumtime.toPrecision()+'view | Giá: '+sumprice.toPrecision()+'$'}</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Danh sách VideoId hoặc Orderid
                            </Label>
                            <Input style={{minHeight:250}}
                                id="list_id"
                                name="list_id"
                                className="form-control form-control-solid"
                                placeholder={"1 VideoId hoặc Orderid một dòng..."}
                                value={videoid}
                                type={"textarea"}
                                onChange={(e) => setVideoid(e.target.value)}
                            />
                        </FormGroup>
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
                                                <div className="col-1 d-flex align-items-center">{item.time} view</div>
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

export default BhManualModal