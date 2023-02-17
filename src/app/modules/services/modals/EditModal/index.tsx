import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/services/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: AccountModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditModal: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [min, setmin] = useState(item.min)
    const [max, setmax] = useState(item.max)
    const [rate, setrate] = useState(item.rate)
    const [note, setnote] = useState(item.note)
    const [name, setname] = useState(item.name)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        if(rate<0){
            alert("rate phải lớsn hơn 0!")
            return
        }
        if( min<0){
            alert("Giá trị min không hợp lệ!")
            return
        }
        if(max<0){
            alert("Giá trị max không hợp lệ!")
            return
        }
        dispatch(actions.requestUpdate({
            ...item,
            min,
            max,
            rate,
            name,
            note,
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update:  {item?.service}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Name</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={name} type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setname(e.target.value)}
                        />
                        <span className="input-group-text" id="basic-addon2">đ</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Rate</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={rate} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setrate(parseFloat(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">$</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Min order</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={min} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmin(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">view</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Max order</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={max} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmax(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">view</span>
                    </div>

                    <p style={{fontWeight:'bold'}}>Note</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={note} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setnote(e.target.value)}
                        />
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

export default EditModal