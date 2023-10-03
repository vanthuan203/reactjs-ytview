import React, {useState, useEffect, ReactChild} from 'react'
import {OrderModel, OrderModelChecked} from 'app/modules/orderpending/models/Order'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal,
    Form, FormGroup, Input, Label, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import {useDispatch, useSelector, shallowEqual } from 'react-redux'

import { RootState } from 'setup'
import { Group } from '../../models/Order'


type Props = {
    listvieoid:OrderModelChecked[],
    show: boolean
    close: () => void
}
const EditMulti: React.FC<Props> = ({ listvieoid,show,close }) => {
    console.log(listvieoid);
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ orderpending }) => orderpending.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ orderpending }) => orderpending.groups, shallowEqual) as Group[] || []
    const orders: OrderModel[] = useSelector<RootState>(({ orderpending }) => orderpending.orders, shallowEqual) as OrderModel[] || []

    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(200)
    const [priority, setPriority] = useState(0)
    const [videoid, setVideoid] = useState("")
    //const [list_video, setList_video] = useState("")
    //
    const [view_need, setView_need] = useState(1000)
    const [vieworder,setvieworder]=useState(1000)
    const [view_percent,setView_percent]=useState(4000)
    //
    const [homerate,setHome_rate]=useState(0)
    const [searchrate,setSearch_rate]=useState(80)
    const [suggestrate,setSuggest_rate]=useState(0)
    const [directrate,setDirect_rate]=useState(20)
    //
    const [likerate,setLike_rate]=useState(25)
    const [commentrate,setComment_rate]=useState(25)
    const [mobilerate,setMobile_rate]=useState(0)
    const [optionbuff, setOptionbuff] = useState(0)
    const [note, setNote] = useState("")
    const [viewstart, setViewstart] = useState(0)
    const [timebuff, setTimebuff] = useState(4000)
    const [user,setUser]=useState(username)
    const [service,setservice]=useState(666)

    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    const arr:string[]=[]
    orders.forEach(item=>{
        const myElem = listvieoid.find(value => value.videoid===item.videoid)
        if(myElem && item.checked){
            arr.push(item.videoid)
        }
    })
    console.log(arr)
    const submit = () => {
        const arr:string[]=[]
        orders.forEach(item=>{
            const myElem = listvieoid.find(value => value.videoid===item.videoid)
            if(myElem && item.checked){
                arr.push(item.videoid)
            }
        })
        console.log(arr)
        const videoid=arr.join('\n')
        if (view_need % 100 !== 0 || view_need ==0) {
            alert("Số sub cần chạy phải chia hết cho 100")
            return
        }
        if(homerate+searchrate+suggestrate+directrate !=100){
            alert("Tổng nguồn view không đúng")
            return
        }
        if(likerate>100||likerate<0){
            alert("Tỉ lệ like không đúng")
            return
        }
        if(view_percent>10000000||view_percent<0){
            alert("phần trăm xem video không đúng")
            return
        }
        if(commentrate>100||commentrate<0){
            alert("Tỉ lệ comment không đúng")
            return
        }

        dispatch(actions.editMultiThreadRequest({
            videoid,
            note,
            maxthreads,
            viewstart,
            timebuff,
            user,
            service,
            vieworder,
            priority
        }))
     
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
                <div className="modal-header">
                    <h5 className="modal-title">Sửa luồng</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <Form>

                        <div>
                            {role==="Ver2"&&<FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    View order
                                </Label>
                                <Input
                                    id="mobile_rate"
                                    name="mobile_rate"
                                    value={vieworder}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setvieworder(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>}
                            {role==="Ver2"&&<FormGroup>
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
                            </FormGroup>}
                            {role === "ROLE_ADMIN"&&<FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Mức ưu tiên
                                </Label>
                                <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                    id="max_thread"
                                    name="max_thread"
                                    value={priority}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setPriority(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>}
                        </div>
                    </Form>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={close} className="btn btn-light" >Thoát</button>
                    <button disabled={adding} type="button" onClick={submit} style={{backgroundColor:"#26695c",color:"white"}} className="btn">{adding ? "Chờ" : "Cập nhật"}</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditMulti