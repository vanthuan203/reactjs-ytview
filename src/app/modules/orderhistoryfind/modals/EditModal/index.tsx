import React, { useState, useEffect } from 'react'
import { OrderModel } from 'app/modules/orderhistoryfind/models/Order'
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
    const adding: boolean = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.adding, shallowEqual) as boolean || false
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
        dispatch(actions.requestUpdate(item.orderid.toString()))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">[VIEW] Bạn muốn refund ${item.price} cho OrderId {item.orderid}?</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button  type="button"  onClick={submit} className="btn btn-primary">Refund</button>
                </div>
            </div>
        </Modal>
    )
}
export default EditModal