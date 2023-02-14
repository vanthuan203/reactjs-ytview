import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/accounts/models/Account'
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
const EditModal: React.FC<Props> = ({ item }) => {
    console.log("------item------", item)
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [vpsoption, setvpsoption] = useState('Buffh')
    const [vpsreset, setvpsreset] = useState(0)
    const [changefinger, setchangefinger] = useState(item.changefinger)
    const [threads, setthreads] = useState(item.threads)
    async function resetrunningacc(vps:string) {
        let  requestUrl = API_URL+'vps/resetrunningaccbyvps?vps='+vps;
        const response = await fetch(requestUrl, {
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson = await response.json();
        const {status} = responseJson;
        return status
    }
    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        if(vpsreset==2){
            resetrunningacc(item.vps.trim())
        }
        dispatch(actions.requestUpdate({
            ...item,
            vpsoption:vpsoption,
            threads:threads,
            vpsreset:vpsreset,
            changefinger:changefinger
        }))
    }
    const handleChange = (e:any) => {
        setthreads(parseInt(e.target.value))
    }


    return (
        <Modal isOpen={true}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight:'bold',fontFamily:'monospace'}}  className="modal-title">Update cho VPS IP:  {item?.vps}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Nhập số luồng</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={threads} onChange={handleChange} type="number" className="form-control" placeholder="Nhập số point cho user" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">thread</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Chọn Option</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setvpsoption(e.target.value)}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={vpsoption}
                        >
                            <option key={1} value={'Buffh'}>
                                {"Buffh"}
                            </option>
                            <option key={2} value={'Test1'}>
                                {"Test1-Vt-Off-Seach"}
                            </option>
                            <option key={3} value={'Test2'}>
                                {"Test2-Vt-Off-Direct"}
                            </option>
                            <option key={4} value={'Test3'}>
                                {"Test3-Vt-On-Seach"}
                            </option>
                            <option key={5} value={'Test4'}>
                                {"Test4-Vt-On-Direct"}
                            </option>
                            <option key={6} value={'Test5'}>
                                {"Test5-Hc-Off-Seach"}
                            </option>
                            <option key={7} value={'Test6'}>
                                {"Test6-Hc-Off-Direct"}
                            </option>
                            <option key={8} value={'Test7'}>
                                {"Test7-Hc-On-5p"}
                            </option>
                            <option key={9} value={'Test8'}>
                                {"Test8-Vt-Gmail6-Off-Bas2"}
                            </option>
                            <option key={10} value={'Test9'}>
                                {"Test9-Vt-Gmail6-Off-Bas1"}
                            </option>
                            <option key={11} value={'Test10'}>
                                {"Test10-Vt-Gmail2-On-Bas2"}
                            </option>
                            <option key={12} value={'Test11'}>
                                {"Test11-Vt-Gmail2-On-Bas1"}
                            </option>
                            <option key={13} value={'Test12'}>
                                {"Test12-Vt-Domain2-On-Bas2"}
                            </option>
                            <option key={14} value={'Test13'}>
                                {"Test13-Vt-Domain2-On-Bas1"}
                            </option>
                            <option key={0} value={'Pending'}>
                                {"Pending"}
                            </option>
                        </Input>
                    </div>
                    <p style={{fontWeight:'bold'}}>Có Restart VPS?</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setvpsreset(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={vpsreset}
                        >
                            <option key={0} value={0}>
                                {"Không"}
                            </option>
                            <option key={1} value={1}>
                                {"Restart"}
                            </option>
                            <option key={2} value={2}>
                                {"Restart & DelAcc"}
                            </option>
                        </Input>
                    </div>
                    <p style={{fontWeight:'bold'}}>Có đổi finger?</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setchangefinger(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={changefinger}
                        >
                            <option key={0} value={0}>
                                {"Không"}
                            </option>
                            <option key={1} value={1}>
                                {"Có"}
                            </option>
                        </Input>
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