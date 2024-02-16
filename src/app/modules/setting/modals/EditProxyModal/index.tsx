import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { ProxySettingModel } from 'app/modules/setting/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: ProxySettingModel
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const EditProxyModal: React.FC<Props> = ({ item }) => {
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [total_port, settotal_port] = useState(item.total_port)
    const [total_sock_port, settotal_sock_port] = useState(item.total_sock_port)
    const [username, setusername] = useState(item.username)
    const [password, setpassword] = useState(item.password)
    const [cron, setcron] = useState(item.cron)
    const dismissModal = () => {
        dispatch(actions.clearCurrentProxySetting())
    }
    const updateUser = () => {

        dispatch(actions.requestUpdateProxySetting({
            ...item,
            total_port,
            total_sock_port,
            username,
            password,
            cron
        }))
    }

    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update Proxy Option {item.option_proxy}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Username</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={username} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setusername(e.target.value)}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>Password</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={password} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>Crontab</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={cron} type="text" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setcron(e.target.value)}
                        />
                    </div>
                    <p style={{fontWeight:'bold'}}>Tổng Port HTTP V6</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={total_port} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => settotal_port(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">port</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Tổng Port SOCKS5 V6</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={total_sock_port} type="number" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => settotal_sock_port(parseInt(e.target.value))}
                        />
                        <span className="input-group-text" id="basic-addon2">port</span>
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

export default EditProxyModal