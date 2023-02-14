import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/orderhistory/models/Order'
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
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const adding: boolean = useSelector<RootState>(({ orderhistory }) => orderhistory.adding, shallowEqual) as boolean || false
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
    //
    const [homerate,setHome_rate]=useState(item.homerate)
    const [searchrate,setSearch_rate]=useState(item.searchrate)
    const [suggestrate,setSuggest_rate]=useState(item.suggestrate)
    const [directrate,setDirect_rate]=useState(item.directrate)
    //
    const [likerate,setLike_rate]=useState(item.likerate)
    const [commentrate,setComment_rate]=useState(item.commentrate)
    const [mobilerate,setMobile_rate]=useState(item.mobilerate)
    const [user,setUser]=useState(username)
    const [note, setNote] = useState(item.note)
    const [viewstart, setViewstart] = useState(0)
    const [timebuff, setTimebuff] = useState(item.timebuff)
    const [optionbuff, setOptionbuff] = useState(item.optionbuff)
    const [enabled,setEnabled]=useState(item.enabled)

    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }

    const submit = () => {

        if(homerate+searchrate+suggestrate+directrate !=100){
            alert("Tổng nguồn view không đúng")
            return
        }
        if(likerate>100||likerate<0){
            alert("Tỉ lệ like không đúng")
            return
        }
        if(view_percent>1000000||view_percent<0){
            alert("phần trăm xem video không đúng")
            return
        }

        dispatch(actions.requestUpdate({
            ...item,
            homerate,
            note,
            directrate,
            commentrate,
            mobilerate,
            searchrate,
            enabled,
            maxthreads,
            viewstart,
            likerate,
            suggestrate,
            timebuff,
            optionbuff,
            user
        }))
     
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Update {item.videoid}</h5>
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
                                    value={homerate}
                                    className="form-control form-control-solid"
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
                                    value={searchrate}
                                    className="form-control form-control-solid"
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
                                    disabled={role === "ROLE_ADMIN" ? false : true}
                                    onChange={(e) => setSuggest_rate(parseInt(e.target.value))}
                                    className="form-control form-control-solid"
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
                                    disabled={role === "ROLE_ADMIN" ? false : true}
                                    onChange={(e) => setDirect_rate(parseInt(e.target.value))}
                                    className="form-control form-control-solid"
                                    type="number"
                                />
                            </FormGroup>
                        </div>
                        <p>Cài đặt tương tác</p>
                        <div className='flex flex-row justify-between space-x-3'>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Like
                                </Label>
                                <Input
                                    id="like_rate"
                                    name="like_rate"
                                    value={likerate}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setLike_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Comment
                                </Label>
                                <Input
                                    id="comment_rate"
                                    name="comment_rate"
                                    value={commentrate}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setComment_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Mobile
                                </Label>
                                <Input
                                    id="mobilerate"
                                    name="mobilerate"
                                    value={mobilerate}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMobile_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
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
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                   Time(h)
                                </Label>
                                <Input
                                    id="mobile_rate"
                                    name="mobile_rate"
                                    value={timebuff}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setTimebuff(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                        </div>
                        <div>
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
                        </div>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Chế độ buff
                            </Label>
                            <Input
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

                        </FormGroup>
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
                                    {"Test1"}
                                </option>
                                <option key={3} value={3}>
                                    {"Test2"}
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
                    <button  type="button"  onClick={submit} className="btn btn-primary">Lưu</button>
                </div>
            </div>
        </Modal>
    )
}
export default EditModal