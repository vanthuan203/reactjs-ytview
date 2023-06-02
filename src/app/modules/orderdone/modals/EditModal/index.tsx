import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/orderdone/models/Order'
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
    const adding: boolean = useSelector<RootState>(({ orderdone }) => orderdone.adding, shallowEqual) as boolean || false
    //const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    //const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []


    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(item.maxthreads)
    //const [videoid, setVideoid] = useState("")
    //const [list_video, setList_video] = useState("")
    //
    const [view_need, setView_need] = useState(1000)
    const [premium_rate,setPremium_rate]=useState(5)
    const [view_percent,setView_percent]=useState(4000)

    const [note, setNote] = useState(item.note)
    const [viewstart, setViewstart] = useState(0)
    const [vieworder, setvieworder] = useState(item.vieworder)
    const [user,setUser]=useState(username)
    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    let [timebuff_old,setTimebuff_Old]=useState(0);
    const submit = () => {
        dispatch(actions.requestUpdate({
            ...item,
            note,
            maxthreads,
            vieworder,
            user
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update {item.videoid} | Đã chạy {format1((item.viewtotal==null?0:item.viewtotal))}</h5>
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
                                    value={vieworder}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setvieworder(parseInt(e.target.value)
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
                                    value={maxthreads}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMaxthreads(parseInt(e.target.value))}
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
                        <span>Số tiền {vieworder<item.vieworder?"hoàn": "trả thêm"}: {format1(((vieworder<item.vieworder?(item.vieworder-vieworder):(vieworder-item.vieworder))/4000)*(price*(1-discount/100)+(vip!=1?(
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