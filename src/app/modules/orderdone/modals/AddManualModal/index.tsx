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
            await addorderv2(video, homerate, note, directrate, commentrate, mobilerate, searchrate, enabled, maxthreads, viewstart, likerate, suggestrate, timebuff, optionbuff, user)
                .then((data: any) => {
                    if (data.data.videobuffh == "true") {
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
                        console.log(sumprice, sumtime, sumorder)
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    } else {
                        let orderitem = {
                            id: randomString(10),
                            videoid: video,
                            time: 0,
                            state: data.data.videobuffh,
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
                    <h5 className="modal-title">{showorder==true?'Thêm nhiệm vụ với danh sách VideoId':'Thành công: '+sumorder+' | Giờ: '+format1(sumtime)+'h | Giá: '+format1(sumprice)+'đ'}</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Danh sách VideoId
                            </Label>
                            <Input style={{minHeight:250}}
                                id="list_id"
                                name="list_id"
                                className="form-control form-control-solid"
                                placeholder={"1 VideoId một dòng!"}
                                value={videoid}
                                type={"textarea"}
                                onChange={(e) => setVideoid(e.target.value)}
                            />
                        </FormGroup>

                        {role==="Ver2"&&<p>Nguồn view tổng = 100%</p>}
                        {role==="Ver2"&&<div className='flex flex-row justify-between space-x-3'>
                            <FormGroup >
                                <Label for="exampleEmail" className="required form-label">
                                    Home 
                                </Label>
                                <Input
                                    id="home_rate"
                                    name="home_rate"
                                    value={homerate}
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
                                <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                    id="search_rate"
                                    name="search_rate"
                                    value={searchrate}
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
                                    value={suggestrate}
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
                                    value={directrate}
                                    //disabled={role === "ROLE_ADMIN" ? false : true}
                                    onChange={(e) => setDirect_rate(parseInt(e.target.value))}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    type="number"
                                />
                            </FormGroup>
                        </div>}
                        {role==="Ver2"&&<p>Cài đặt tương tác</p>}
                        {role==="Ver2"&&<div className='flex flex-row justify-between space-x-3'>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Like
                                </Label>
                                <Input
                                    id="like_rate"
                                    name="like_rate"
                                    value={likerate}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setLike_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Comment
                                </Label>
                                <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                    id="comment_rate"
                                    name="comment_rate"
                                    value={commentrate}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setComment_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Mobile
                                </Label>
                                <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                    id="mobilerate"
                                    name="mobilerate"
                                    value={mobilerate}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMobile_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>


                        </div>}
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Time(h)
                                </Label>
                                <Input
                                    id="timebuffh"
                                    name="timebuffh"
                                    value={timebuff}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 100"
                                    onChange={(e) => setTimebuff(parseInt(e.target.value))}
                                    type="number"
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
                            {role === "ROLE_ADMIN" &&<FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Luồng
                                </Label>
                                <Input
                                    id="max_thread"
                                    name="max_thread"
                                    value={maxthreads}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setMaxthreads(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>}
                        </div>
                        {role==="Ver2"&&<FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Chế độ buff
                            </Label>
                            <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                onChange={(e) => setOptionbuff(parseInt(e.target.value))}
                                className="form-control form-control-solid"
                                type="select"
                                value={optionbuff}
                            >
                                <option key={10} value={10}>
                                    {"10 phút"}
                                </option>
                                <option key={30} value={30}>
                                    {"30 phút"}
                                </option>
                                <option key={60} value={60}>
                                    {"60 phút"}
                                </option>
                                <option key={120} value={120}>
                                    {"120 phút"}
                                </option>
                                <option key={0} value={0}>
                                    {"Auto"}
                                </option>
                            </Input>

                        </FormGroup>}
                        {role==="ROLE_ADMIN"&&<FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Trạng thái
                            </Label>
                            <Input disabled={role === "ROLE_ADMIN" ? false : true}
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
                                    {"Test8-Vt-Gmail6-Off-Bas2"}
                                </option>
                                <option key={10} value={10}>
                                    {"Test9-Vt-Gmail6-Off-Bas1"}
                                </option>
                                <option key={11} value={11}>
                                    {"Test10-Vt-Gmail2-On-Bas2"}
                                </option>
                                <option key={12} value={12}>
                                    {"Test11-Vt-Gmail2-On-Bas1"}
                                </option>
                                <option key={13} value={13}>
                                    {"Test12-Vt-Domain2-On-Bas2"}
                                </option>
                                <option key={14} value={14}>
                                    {"Test13-Vt-Domain2-On-Bas1"}
                                </option>
                                <option key={0} value={0}>
                                    {"Ngừng"}
                                </option>
                            </Input>
                        </FormGroup>}
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
                                                    {format1(item.price)}đ
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