import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/orderfollowertiktok/models/Order'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal,
    Form, FormGroup, Input, Label, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import {useDispatch, useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'
import {updateAccount} from "../../../accounts/redux/AccountCRUD";
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
    const price: number = useSelector<RootState>(({ auth }) => auth.user?.price, shallowEqual) as number || 0
    const vip: number = useSelector<RootState>(({ auth }) => auth.user?.bonus, shallowEqual) as number || 0
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const adding: boolean = useSelector<RootState>(({ orderfollowertiktok }) => orderfollowertiktok.adding, shallowEqual) as boolean || false
    //const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    //const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []


    const dispatch = useDispatch()
    const [max_threads, setMax_threads] = useState(item.max_threads)
    const [note, setNote] = useState(item.note)
    const [follower_order, setfollower_order] = useState(item.follower_order)
    const [user,setUser]=useState(item.user)
    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    let [timebuff_old,setTimebuff_Old]=useState(0);
    const submit = () => {
        dispatch(actions.requestUpdate({
            ...item,
            note,
            max_threads,
            follower_order,
            user
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update {item.orderid} | Đã chạy {format1((item.follower_total==null?0:item.follower_total))}</h5>
                </div>
                <div className="modal-body">
                    <Form>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Follower order
                                </Label>
                                <Input
                                    id="vieworder"
                                    name="vieworder"
                                    value={follower_order}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setfollower_order(parseInt(e.target.value)
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
                                    value={max_threads}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMax_threads(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>}
                        </div>
                    </Form>
                </div>
                {role=="adc"&&
                <div className="modal-body">
                    <div className="card-body" style={{width: "100%"}}>
                        {/* begin::Table container */}
                        <span>Số tiền {follower_order<item.follower_total?"hoàn": "trả thêm"}: {format1(((follower_order<item.follower_order?(item.follower_order-follower_order):(follower_order-item.follower_order))/4000)*(price*(1-discount/100)+(vip!=1?(
                            item.duration<3600?40000:item.duration<7200?20000:0):0)))}đ</span>
                            <br/>
                        {/* end::Table container */}
                    </div>
                </div>}
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button  type="button"  onClick={submit} style={{backgroundColor:"#26695c",color:"white"}} className="btn">Lưu</button>
                </div>
            </div>
        </Modal>
    )
}
export default EditModal