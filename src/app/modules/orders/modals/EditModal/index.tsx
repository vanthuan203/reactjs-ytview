import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/orders/models/Order'
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


type Props = {
    item: OrderModel

}

const EditModal: React.FC<Props> = ({ item}) => {

    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const adding: boolean = useSelector<RootState>(({ orders }) => orders.adding, shallowEqual) as boolean || false
    //const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []
    //const orders: OrderModel[] = useSelector<RootState>(({ orders }) => orders.orders, shallowEqual) as OrderModel[] || []


    const dispatch = useDispatch()
    const [max_thread, setMax_thread] = useState(item.max_threads)
    const [view_percent,setView_percent]=useState(item.view_percent)
    const [home_rate,setHome_rate]=useState(0)
    const [search_rate,setSearch_rate]=useState(80)
    const [suggest_rate,setSuggest_rate]=useState(0)
    const [direct_rate,setDirect_rate]=useState(20)
    const [enabled,setEnabled]=useState(item.enabled)
    const [like_rate,setLike_rate]=useState(25)
    const [comment_rate,setComment_rate]=useState(25)

    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }

    const submit = () => {

        if(home_rate+search_rate+suggest_rate+direct_rate !=100){
            alert("Tổng nguồn view không đúng")
            return
        }
        if(like_rate>100||like_rate<0){
            alert("Tỉ lệ like không đúng")
            return
        }
        if(view_percent>1000000||view_percent<0){
            alert("phần trăm xem video không đúng")
            return
        }

        dispatch(actions.requestUpdate({
            ...item,
            home_rate,
            direct_rate,
            search_rate,
            enabled,
            max_thread,
            view_percent,
            suggest_rate
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Sửa nhiệm vụ cho {item.channel_title}</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p>Cài đặt danh sách đơn</p>
                    <Form>
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
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button  type="button"  style={{color:'white',backgroundColor:"#26695c"}}   onClick={submit} className="btn">Lưu</button>
                </div>
            </div>
        </Modal>
    )
}
export default EditModal