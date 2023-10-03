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


type Props = {
    show: boolean
    close: () => void
}
const EditMulti: React.FC<Props> = ({ show,close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const groups: Group[] = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.groups, shallowEqual) as Group[] || []
    const orders: OrderModel[] = useSelector<RootState>(({ orderhistoryfind }) => orderhistoryfind.orders, shallowEqual) as OrderModel[] || []
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(100)
    const [videoid, setVideoid] = useState("")
    //const [list_video, setList_video] = useState("")
    //
    const [view_need, setView_need] = useState(1000)
    const [premium_rate,setPremium_rate]=useState(5)
    const [view_percent,setView_percent]=useState(4000)
    //
    const [homerate,setHome_rate]=useState(0)
    const [searchrate,setSearch_rate]=useState(80)
    const [suggestrate,setSuggest_rate]=useState(0)
    const [directrate,setDirect_rate]=useState(20)
    const [user,setUser]=useState(username)
    const [likerate,setLike_rate]=useState(25)
    const [commentrate,setComment_rate]=useState(25)
    const [mobilerate,setMobile_rate]=useState(0)
    const [optionbuff, setOptionbuff] = useState(0)
    const [note, setNote] = useState("")
    const [viewstart, setViewstart] = useState(0)
    const [timebuff, setTimebuff] = useState(4000)
    //
    const [enabled,setEnabled]=useState(1)


    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    let sum=0;
    const arr:string[]=[]
    orders.forEach(item=>{
        if(item.checked==true)
            sum=sum+1
            arr.push(item.orderid.toString())
    })
    const orderid=arr.join(',')
    const submit = () => {
        dispatch(actions.requestUpdate(orderid.toString(),0))
        close()
    }
    return (
        <Modal isOpen={show}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">[VIEW] Bạn chắc chắn refund {sum} đơn?</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={close} className="btn btn-light" >Thoát</button>
                    <button type="button" onClick={submit} className="btn btn-primary">Refund</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditMulti