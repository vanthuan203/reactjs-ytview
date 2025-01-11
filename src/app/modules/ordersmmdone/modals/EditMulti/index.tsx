import React, {useState, useEffect, ReactChild} from 'react'
import {OrderModel, OrderModelChecked} from 'app/modules/ordersmmdone/models/Order'
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
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ ordersmmdone }) => ordersmmdone.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ ordersmmdone }) => ordersmmdone.groups, shallowEqual) as Group[] || []
    const orders: OrderModel[] = useSelector<RootState>(({ ordersmmdone }) => ordersmmdone.orders, shallowEqual) as OrderModel[] || []

    const dispatch = useDispatch()
    const [thread, setThread] = useState(200)
    const [order_key, setOrder_key] = useState("")
    const [priority, setPriority] = useState(0)
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
    const arr:number[]=[]
    orders.forEach(item=>{
        const myElem = listvieoid.find(value => value.order_id==item.order_id)
        if(myElem && item.checked){
            arr.push(item.order_id)
        }
    })
    console.log(arr)
    const submit = () => {
        const arr:number[]=[]
        orders.forEach(item=>{
            const myElem = listvieoid.find(value => value.order_id===item.order_id)
            if(myElem && item.checked){
                arr.push(item.order_id)
            }
        })
        console.log(arr)
        const order_key=arr.join('\n')
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
            order_key,
            note,
            thread,
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
                    <h5 className="modal-title">Update Thread</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <Form>
                        <div>
                            {role === "ROLE_ADMIN"&&<FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Threads
                                </Label>
                                <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                    id="max_thread"
                                    name="max_thread"
                                    value={thread}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setThread(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>}
                        </div>
                    </Form>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Prioritize
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setPriority(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={priority}
                        >
                            <option key={"1"} value={1}>
                                ON
                            </option>
                            <option key={"0"} value={0}>
                                OFF
                            </option>
                        </Input>
                    </FormGroup>
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