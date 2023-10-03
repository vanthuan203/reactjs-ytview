import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountLimitModel } from 'app/modules/setting/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: AccountLimitModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditLimitModal: React.FC<Props> = ({ item }) => {
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [maxorder, setmaxorder] = useState(item.maxorder)
    const [maxrunning, setmaxrunning] = useState(item.maxrunning)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccountLimit())
    }
    const updateUser = () => {
        dispatch(actions.requestUpdateLimit({
            ...item,
            maxorder,
            maxrunning
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update {item.user}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Số đơn Pending</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxorder} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxorder(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số đơn Running</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxrunning} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxrunning(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button type="button" onClick={updateUser} style={{backgroundColor:"#26695c",color:"white"}} className="btn ">Lưu</button>
                </div>
            </div>

        </Modal>
    )
}

export default EditLimitModal