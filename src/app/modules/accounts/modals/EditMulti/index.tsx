import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel,OrderModelChecked } from 'app/modules/accounts/models/Account'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"
import {RootState} from "../../../../../setup";



type Props = {
    list_vps:OrderModelChecked[],
    show: boolean
    close: () => void
}
const EditMulti: React.FC<Props> = ({list_vps, show,close }) => {
    //console.log("------item------", item)
    const dispatch = useDispatch()
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ accounts }) => accounts.adding, shallowEqual) as boolean || false
    const accounts: AccountModel[] = useSelector<RootState>(({ accounts }) => accounts.accounts, shallowEqual) as AccountModel[] || []
    const API_URL = process.env.REACT_APP_API_URL

    const [vpsoption, setvpsoption] = useState('Pending')
    const [threads, setthreads] = useState(0)
    const [vpsreset, setvpsreset] = useState(0)
    const [changefinger, setchangefinger] = useState(0)
    const [ext, setext] = useState(1)
    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
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
    const submit = () => {
        const arr:string[]=[]
        accounts.forEach(item=>{
            const myElem = list_vps.find(value => value.vps===item.vps)
            if(myElem && item.checked){
                arr.push(item.vps)
            }
        })
        if(vpsreset==2){
            for(var i=0;i<arr.length;i++){
                resetrunningacc(arr[i].trim())
            }
        }
        const vps=arr.join('\n')

        dispatch(actions.editMultiOrderRequest({
            vps,
            vpsoption,
            vpsreset,
            threads,
            changefinger,
            ext
        }))

    }
    useEffect(() => {
        if (!adding) {
            close()
        }
    }, [adding])

    return (
        <Modal isOpen={show}
            modalTransition={{ timeout: 500 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 style={{fontWeight:'bold'}} className="modal-title">Update VPS</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <p style={{fontWeight:'bold'}}>Nhập số luồng</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}}
                               onChange={(e) => setthreads(parseInt(e.target.value))}
                               value={threads}  type="number"
                               className="form-control"
                               placeholder="Nhập số point cho user"
                               aria-label="Recipient's username"
                               aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">thread</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Chọn Option</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setvpsoption(e.target.value)}
                            className="form-control form-control-solid"
                            style={{fontWeight:'bold'}}
                            type="select"
                            value={vpsoption}
                        >
                            <option key={1} value={'vn'}>
                                {"VN"}
                            </option>
                            <option key={2} value={'us'}>
                                {"US"}
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
                    <p style={{fontWeight:'bold'}}>Có bật EXT?</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setext(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={ext}
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
                    <button type="button" onClick={close} className="btn btn-light" >Thoát</button>
                    <button type="button" disabled={adding}  style={{backgroundColor:"#26695c",color:"white"}} onClick={submit} className="btn">Lưu thông tin mới</button>
                </div>
            </div>

        </Modal>
    )
}

export default EditMulti