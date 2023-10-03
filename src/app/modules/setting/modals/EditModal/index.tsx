import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/setting/models/Account'
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
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [pricerate, setpricerate] = useState(item.pricerate)
    const [bonus, setbonus] = useState(item.bonus)
    const [maxordervn, setmaxordervn] = useState(item.maxordervn)
    const [maxorderus, setmaxorderus] = useState(item.maxorderus)
    const [maxorder, setmaxorder] = useState(item.maxorder)
    const [threadmin, setthreadmin] = useState(item.threadmin)
    const [redirect, setredirect] = useState(item.redirect)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        if(pricerate<0){
            alert("Số tiền nhỏ nhất là 0đ!")
            return
        }
        if(bonus>100 || bonus<0){
            alert("Giá trị bonus không hợp lệ!")
            return
        }
        if(maxordervn<0 || maxorderus <0){
            alert("Giá trị số đơn max không hợp lệ!")
            return
        }
        dispatch(actions.requestUpdate({
            ...item,
            pricerate,
            bonus,
            maxordervn,
            maxorderus,
            maxorder,
            threadmin,
            redirect
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update Setting</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Bonus</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={bonus} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setbonus(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">%</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số đơn max(VN)</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxordervn} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxordervn(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số đơn max(US)</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxorderus} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxorderus(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số đơn max(US)</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxorderus} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxorderus(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số đơn giờ chạy(MAX)</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={maxorder} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setmaxorder(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">đơn</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Min Thread View(%)</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={threadmin} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setthreadmin(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">%</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Redirect sang BuffH</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={redirect} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setredirect(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">/1000</span>
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