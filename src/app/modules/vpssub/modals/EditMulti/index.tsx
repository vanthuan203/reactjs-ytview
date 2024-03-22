import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel,OrderModelChecked } from 'app/modules/vpssub/models/Account'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {randomString} from "react-inlinesvg/lib/helpers";
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
    const adding: boolean = useSelector<RootState>(({ vpsdub }) => vpsdub.adding, shallowEqual) as boolean || false
    const accounts: AccountModel[] = useSelector<RootState>(({ vpsdub }) => vpsdub.accounts, shallowEqual) as AccountModel[] || []
    const API_URL = process.env.REACT_APP_API_URL

    const [vpsoption, setvpsoption] = useState('sub')
    const [threads, setthreads] = useState(2000)
    const [vpsreset, setvpsreset] = useState(0)
    const [get_account, setget_account] = useState(0)
    const [ext, setext] = useState(1)
    const [cmt, setcmt] = useState(1)
    const [proxy, setproxy] = useState(1)
    const [running, setrunning] = useState(10)
    const [live, setlive] = useState(5)
    const [state, setstate] = useState(5)
    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const [list_geo,setList_Geo]=useState([{
        id:"0000000000",
        geo:"Pending"
    },])
    let [useEff, setuseEff] = useState(0)
    async function getallgeo() {
        let  requestUrl = API_URL+'servive/getallgeo';
        const response = await fetch(requestUrl, {
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson = await response.json();
        const {geo} = responseJson;
        let arrlist =geo.split(',');
        for(var i=0;i<arrlist.length;i++){
            let orderitem = {
                id: randomString(10),
                geo: arrlist[i]
            }
            setList_Geo([...list_geo, orderitem])
            list_geo.push(orderitem)
        }
    }
    useEffect(() => {
        useEff=1
        getallgeo()
    }, [useEff=0])
    async function resetrunningacc(vps:string) {
        let  requestUrl = API_URL+'vpssub/resetrunningaccbyvps?vps='+vps;
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
    async function resetrunningacccmt(vps:string) {
        let  requestUrl = API_URL+'vpssub/resetrunningacccmtbyvps?vps='+vps;
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
        console.log(accounts)
        const vps=arr.join('\n')

        dispatch(actions.editMultiOrderRequest({
            vps,
            vpsoption,
            vpsreset,
            threads,
            get_account,
            ext,
            running,
            state,
            live,
            cmt,
            proxy
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
                    <p style={{fontWeight:'bold'}}>Số user</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={threads} onChange={(e) => setthreads(parseInt(e.target.value))} type="number" className="form-control" placeholder="Nhập số point cho user" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">user</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số thread</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={running} onChange={(e) => setrunning(parseInt(e.target.value))} type="number" className="form-control" placeholder="Nhập số point cho user" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                            <option key={0} value={"Sub_Pending"}>
                                {"PENDING"}
                            </option>
                            <option key={1} value={"sub"}>
                                {"SUB"}
                            </option>
                            <option key={2} value={"like"}>
                                {"LIKE"}
                            </option>
                            <option key={3} value={"like_sub"}>
                                {"LIKE_SUB"}
                            </option>
                        </Input>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số Sub 24H</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={state} onChange={(e) => setstate(parseInt(e.target.value))} type="number" className="form-control" placeholder="Nhập số point cho user" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">sub</span>
                    </div>
                    <p style={{fontWeight:'bold'}}>Số Like 24H</p>
                    <div className="input-group mb-5">
                        <input style={{fontWeight:'bold'}} value={live} onChange={(e) => setlive(parseInt(e.target.value))} type="number" className="form-control" placeholder="Nhập số point cho user" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <span className="input-group-text" id="basic-addon2">like</span>
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