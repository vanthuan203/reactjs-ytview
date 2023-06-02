import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/users/models/Account'
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
    const [balance, setbalance] = useState(0)
    const [discount, setdiscount] = useState(item.discount)
    const [maxorder, setmaxorder] = useState(item.maxorder)
    const [note, setnote] = useState(item.note)
    const [rate, setrate] = useState(item.rate)
    const [vip, setvip] = useState(item.vip)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        if(balance<100 && balance!=0){
            alert("Số tiền nhỏ nhất là 100$")
            return
        }
        if(rate<100){
            alert("% rate không hợp lệ!")
            return
        }
        if(discount>100 || discount<0){
            alert("% Discount không hợp lệ!")
            return
        }
        if(maxorder<0){
            alert("Giá trị số đơn max không hợp lệ!")
            return
        }
        dispatch(actions.requestUpdate({
            ...item,
            balance,
            discount,
            maxorder,
            vip,
            note,
            rate,
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update:  {item?.username}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Số tiền nạp</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={balance} type="number" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setbalance(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">$</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Rate</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={rate} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setrate(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">%</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Discount</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={discount} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setdiscount(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">%</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số đơn max</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxorder} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxorder(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>User Vip</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setvip(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={vip}
                        >
                            <option key={1} value={1}>
                                {"True"}
                            </option>
                            <option key={0} value={0}>
                                {"False"}
                            </option>

                        </Input>
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