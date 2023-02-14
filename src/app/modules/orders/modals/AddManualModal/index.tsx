import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { addorderv2 } from '../../redux/OrdersCRUD'
import {
    Modal,
    Form, FormGroup, Input, Label
} from "reactstrap"
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'
import {Group, OrderModel} from '../../models/Order'
import OrderItem from "../../components/OrderItem";
import AddModal from "../AddModal";
import {string} from "yup";
import {register} from "../../../auth/redux/AuthCRUD";
import * as auth from "../../../auth/redux/AuthRedux";
import {randomInt} from "crypto";
import {randomString} from "react-inlinesvg/lib/helpers";
type Props = {
    show: boolean
    close: () => void
}

const AddManualModal: React.FC<Props> = ({ show, close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ orders }) => orders.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    const [status,setStatus]=useState("Fail")
    const [list_order,setList_Todo]=useState([{
        id:"0121222222",
        channel_id:"",
        state:""
    },])

    const dispatch = useDispatch()
    const [max_thread, setMax_thread] = useState(100)
    const [channel_id, setChannel_id] = useState("")
    const [list_video, setList_video] = useState("")
    //
    const [view_need, setView_need] = useState(1000)
    const [premium_rate,setPremium_rate]=useState(5)
    const [view_percent,setView_percent]=useState(4000)
    //
    const [home_rate,setHome_rate]=useState(0)
    const [search_rate,setSearch_rate]=useState(80)
    const [suggest_rate,setSuggest_rate]=useState(0)
    const [direct_rate,setDirect_rate]=useState(20)
    //
    const [like_rate,setLike_rate]=useState(25)
    const [comment_rate,setComment_rate]=useState(25)
    const [mobile_rate,setMobile_rate]=useState(0)
    //
    const [note, setNote] = useState("")
    const [keyword, setKeyword] = useState("")
    const [comment_list, setComment_list] = useState("")
    const [group_id, setGroup] = useState(0)
    //
    const [enabled,setEnabled]=useState(1)
    const [showorder,setShowOrder]=useState(true)
    const [loading, setLoading] = useState(false)

    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }

    const ordercheck = () => {
        setShowOrder(false)
    }

    const submit = () => {
        //setShowOrder(false)
        if (channel_id.trim() === "") {
            alert("Điền id kênh cần chạy")
            return
        }
        if(home_rate+search_rate+suggest_rate+direct_rate !=100){
            alert("Tổng nguồn view không đúng")
            return
        }

        if(view_percent>10000000||view_percent<0){
            alert("phần trăm xem video không đúng")
            return
        }
        ordercheck()
        const videoidlist=channel_id.split('\n')
        for (var i = 0; i < videoidlist.length; i++) {
            let video=videoidlist[i]
            setTimeout(() => {
                addorderv2(video,list_video,home_rate,direct_rate
                    ,search_rate,enabled,max_thread,suggest_rate,view_percent)
                    .then((data:any) => {
                        setLoading(true)
                        if(data.data.channel=="true"){
                            let orderitem={
                                id:randomString(10),
                                channel_id:video,
                                state:"done"
                            }
                            setList_Todo([...list_order,orderitem])
                            list_order.push(orderitem)
                        }else{
                            list_order.push({
                                id:randomString(10),
                                channel_id:video,
                                state: 'error',
                            })
                        }

                    })
                    .catch(() => {
                        list_order.push({
                            id:randomString(10),
                            channel_id:video,
                            state: 'error',
                        })

                    })
            }, 1000)
            continue
        }
    }

    useEffect(() => {
        if (!adding) {

        }
    },[show] )

    return (
        <Modal isOpen={show}
           modalTransition={{timeout: 500}}>
        <div className="modal-content">
            <div className="modal-header" style={{display: showorder == true ? "true" : "none"}}>
                <h5 className="modal-title">Thêm nhiệm vụ với danh sách id channel</h5>
                <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                    <span className="svg-icon svg-icon-2x"></span>
                </div>
            </div>
            <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
                <p>Cài đặt đơn</p>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail" className="required form-label">
                            Danh sách id kênh cần chạy sub
                        </Label>
                        <Input
                            id="list_id"
                            name="list_id"
                            className="form-control form-control-solid"
                            placeholder={"Id kênh"}
                            value={channel_id}
                            type={"textarea"}
                            onChange={(e) => setChannel_id(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail" className="required form-label">
                            Danh sách video của kênh( Để trống video sẽ được thêm tự động )
                        </Label>
                        <Input
                            id="list_id"
                            name="list_id"
                            className="form-control form-control-solid"
                            placeholder={"video id cách nhau dấu ,"}
                            value={list_video}
                            type={"textarea"}
                            onChange={(e) => setList_video(e.target.value)}
                        />
                    </FormGroup>

                    <p>Nguồn view tổng = 100%</p>
                    <div className='flex flex-row justify-between space-x-3'>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Home
                            </Label>
                            <Input
                                id="home_rate"
                                name="home_rate"
                                value={home_rate}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                onChange={(e) => setHome_rate(parseInt(e.target.value))}
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Search
                            </Label>
                            <Input
                                id="search_rate"
                                name="search_rate"
                                value={search_rate}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                onChange={(e) => setSearch_rate(parseInt(e.target.value))}
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Suggest
                            </Label>
                            <Input
                                id="suggest_rate"
                                name="suggest_rate"
                                value={suggest_rate}
                                disabled={role === "ROLE_ADMIN" ? false : true}
                                onChange={(e) => setSuggest_rate(parseInt(e.target.value))}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Direct
                            </Label>
                            <Input
                                id="direct_rate"
                                name="direct_rate"
                                value={direct_rate}
                                disabled={role === "ROLE_ADMIN" ? false : true}
                                onChange={(e) => setDirect_rate(parseInt(e.target.value))}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                type="number"
                            />
                        </FormGroup>
                    </div>
                    <p>Cài đặt tương tác</p>
                    <div className='flex flex-row justify-between space-x-3'>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Tỉ lệ Like
                            </Label>
                            <Input
                                id="like_rate"
                                name="like_rate"
                                value={like_rate}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                onChange={(e) => setLike_rate(parseInt(e.target.value))}
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Tỉ lệ comment
                            </Label>
                            <Input
                                id="comment_rate"
                                name="comment_rate"
                                value={comment_rate}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                onChange={(e) => setComment_rate(parseInt(e.target.value))}
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Luồng max
                            </Label>
                            <Input
                                id="max_thread"
                                name="max_thread"
                                value={max_thread}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 1000"
                                onChange={(e) => setMax_thread(parseInt(e.target.value))}
                                type="number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Time Buff(h)
                            </Label>
                            <Input
                                id="mobile_rate"
                                name="mobile_rate"
                                value={view_percent}
                                className="form-control form-control-solid"
                                placeholder="ví dụ : 100"
                                onChange={(e) => setView_percent(parseInt(e.target.value))}
                                type="number"
                            />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Label for="exampleEmail" className="required form-label">
                            Trạng thái
                        </Label>
                        <Input
                            onChange={(e) => setEnabled(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            value={enabled}
                        >
                            <option key={1} value={1}>
                                {"Chạy"}
                            </option>
                            <option key={2} value={2}>
                                {"Test1-Vt-Off-Seach"}
                            </option>
                            <option key={3} value={3}>
                                {"Test2-Vt-Off-Direct"}
                            </option>
                            <option key={4} value={4}>
                                {"Test3-Vt-On-Seach"}
                            </option>
                            <option key={5} value={5}>
                                {"Test4-Vt-On-Direct"}
                            </option>
                            <option key={6} value={6}>
                                {"Test5-Hc-Off-Seach"}
                            </option>
                            <option key={7} value={7}>
                                {"Test6-Hc-Off-Direct"}
                            </option>
                            <option key={8} value={8}>
                                {"Test7-Hc-On-5p"}
                            </option>
                            <option key={9} value={9}>
                                {"Test8-Hc-On-finger"}
                            </option>
                            <option key={0} value={0}>
                                {"Ngừng"}
                            </option>
                        </Input>
                    </FormGroup>
                </Form>
            </div>
            <div className="modal-body">
                <div className="card-body" style={{width: "100%"}}>
                    {/* begin::Table container */}

                   {
                        list_order.map((item, index) => {
                            console.log(list_order)
                            if (item.channel_id.length >0) return (
                                <ul className="list-group list-group-flush" id={item.channel_id} key={item.channel_id}>
                                    <li className="list-group-item" style={{minHeight: 10}}>
                                        <div className="row">
                                            <div className="col-1 d-flex align-items-center">{index}.</div>
                                            <div className="col-5 d-flex align-items-center">{item.channel_id}</div>
                                            <div className="col-6 d-flex justify-content-end align-items-center">
                                                <div className="d-flex flex-row align-items-center">
                                                    <span className='symbol-label'>
                                                              <img

                                                                  src={toAbsoluteUrl(item.state.indexOf('done')>=0?'/media/icons/duotune/general/gen048.svg':'/media/icons/duotune/general/gen050.svg')}
                                                                  className='svg-icon-1'
                                                                  alt=''
                                                              />
                                                            </span>

                                                    <button type="button"
                                                            style={{display: item.state == "done" ? "none" : "true"}}
                                                            className="ant-btn ant-btn-link">
                                                        <span>Thử lại</span>
                                                    </button>
                                                </div>
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
                <button type="button" onClick={close} className="btn btn-light">Thoát</button>
                <button disabled={adding} style={{color: 'white', backgroundColor: "#26695c"}} id='hide' type="button"
                        onClick={submit} className="btn ">{adding ? "Chờ" : "Thêm đơn"}</button>
            </div>
        </div>
    </Modal>
    )
}

export default AddManualModal