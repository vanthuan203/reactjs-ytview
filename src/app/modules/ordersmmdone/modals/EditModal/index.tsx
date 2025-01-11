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
    const adding: boolean = useSelector<RootState>(({ ordersmmdone }) => ordersmmdone.adding, shallowEqual) as boolean || false
    //const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    //const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []


    const dispatch = useDispatch()
    const [thread, setThread] = useState(item.thread)
    const [note, setNote] = useState(item.note)
    const [priority, setPriority] = useState(item.priority==null?0:item.priority)
    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    const submit = () => {
        dispatch(actions.requestUpdate({
            ...item,
            note,
            thread,
            priority
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update {item.order_id}</h5>
                </div>
                <div className="modal-body">
                    <Form>
                        <div>

                            <FormGroup>
                                <Label for="exampleEmail" >
                                    Note
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
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Threads
                                </Label>
                                <Input
                                    id="max_thread"
                                    name="max_thread"
                                    value={thread}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setThread(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
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