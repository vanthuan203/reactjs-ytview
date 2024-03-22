import React, {useState, useEffect, ReactChild} from 'react'
import {OrderModel, OrderModelChecked} from 'app/modules/orderfollowertiktok/models/Order'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal,
    Form, FormGroup, Input, Label, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import {useDispatch, useSelector, shallowEqual } from 'react-redux'

import { RootState } from 'setup'


type Props = {
    listvieoid:OrderModelChecked[],
    show: boolean
    close: () => void
}
const EditMulti: React.FC<Props> = ({ listvieoid,show,close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ orderfollowertiktok }) => orderfollowertiktok.adding, shallowEqual) as boolean || false
    const orders: OrderModel[] = useSelector<RootState>(({ orderfollowertiktok }) => orderfollowertiktok.orders, shallowEqual) as OrderModel[] || []

    const dispatch = useDispatch()
    const [max_threads, setMax_threads] = useState(5)
    const [orderid, setOrderid] = useState(0)
    //const [list_video, setList_video] = useState("")
    //
    const [follower_order,setfollower_order]=useState(1000)
    //
    //

    const [note, setNote] = useState("")
    const [tiktok_id, setTiktok_id] = useState("")
    const [user,setUser]=useState(username)
    const [service,setservice]=useState(666)

    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    const arr:string[]=[]
    orders.forEach(item=>{
        const myElem = listvieoid.find(value => value.tiktok_id===item.tiktok_id)
        if(myElem && item.checked){
            arr.push(item.tiktok_id)
        }
    })
    const submit = () => {
        const arr:string[]=[]
        orders.forEach(item=>{
            const myElem = listvieoid.find(value => value.tiktok_id===item.tiktok_id)
            if(myElem && item.checked){
                arr.push(item.tiktok_id)
            }
        })
        const tiktok_id=arr.join('\n')

        dispatch(actions.editMultiThreadRequest({
            orderid,
            tiktok_id,
            note,
            max_threads,
            user,
            service,
            follower_order
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
                                    value={follower_order}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setfollower_order(parseInt(e.target.value))}
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
                                    Luồng
                                </Label>
                                <Input //disabled={role === "ROLE_ADMIN" ? false : true}
                                    id="max_thread"
                                    name="max_thread"
                                    value={max_threads}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMax_threads(parseInt(e.target.value))}
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