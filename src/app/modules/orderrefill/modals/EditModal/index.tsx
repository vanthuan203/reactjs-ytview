import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/ordersmmdone/models/Order'
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
import {updateOrder} from "../../redux/OrdersCRUD";
import {toAbsoluteUrl} from "../../../../../_metronic/helpers";


type Props = {
    item: OrderModel

}

const EditModal: React.FC<Props> = ({ item}) => {
    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const user: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const adding: boolean = useSelector<RootState>(({ orderdone }) => orderdone.adding, shallowEqual) as boolean || false
    //const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    //const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []


    const dispatch = useDispatch()
    const [thread, setThread] = useState(item.thread)
    //const [videoid, setVideoid] = useState("")
    //const [list_video, setList_video] = useState("")
    //
    const [view_need, setView_need] = useState(1000)
    const [premium_rate,setPremium_rate]=useState(5)
    const [view_percent,setView_percent]=useState(4000)

    const [note, setNote] = useState(item.note)
    const [start_count, setStart_count] = useState(0)
    const [quantity, setQuantity] = useState(item.quantity)
    const [username,setUsername]=useState(item.username)
    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    let [timebuff_old,setTimebuff_Old]=useState(0);
    const submit = () => {
        dispatch(actions.requestUpdate({
            ...item,
            note,
            thread,
            quantity,
            username
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update {item.order_id} | Đã chạy {format1((item.total==null?0:item.total))}</h5>
                </div>
                <div className="modal-body">
                    <Form>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    View order
                                </Label>
                                <Input
                                    id="vieworder"
                                    name="vieworder"
                                    value={quantity}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setQuantity(parseInt(e.target.value)
                                    )}
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
                            {role==="ROLE_ADMIN"&&<FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Luồng
                                </Label>
                                <Input
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
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button  type="button"  onClick={submit} style={{backgroundColor:"#26695c",color:"white"}} className="btn">Lưu</button>
                </div>
            </div>
        </Modal>
    )
}
export default EditModal