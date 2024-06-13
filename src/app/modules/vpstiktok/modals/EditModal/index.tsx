import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/vpstiktok/models/Account'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {randomString} from "react-inlinesvg/lib/helpers";
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input
} from "reactstrap"



type Props = {
    item: AccountModel
}
const EditModal: React.FC<Props> = ({ item }) => {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [vpsoption, setvpsoption] = useState(item.vpsoption)
    const [vpsreset, setvpsreset] = useState(0)
    const [get_account, setget_account] = useState(item.get_account)
    const [threads, setthreads] = useState(item.threads)
    const [state, setstate] = useState(item.state)
    const [ext, setext] = useState(item.ext)
    const [cmt, setcmt] = useState(item.cmt)
    const [running, setrunning] = useState(item.running)
    const [live, setlive] = useState(item.live)
    const [proxy, setproxy] = useState(item.proxy)
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
        let  requestUrl = API_URL+'vps_tiktok/resetrunningaccbyvps?vps='+vps;
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
        let  requestUrl = API_URL+'vps_tiktok/resetrunningacccmtbyvps?vps='+vps;
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
        dispatch(actions.clearCurrentAccountEdit())
    }
    const updateUser = () => {
        if(vpsreset==3){
            resetrunningacc(item.vps.trim())
        }
        dispatch(actions.requestUpdate({
            ...item,
            vpsoption:vpsoption,
            threads:threads,
            vpsreset:vpsreset,
            live:live,
            running:running,
            state:state,
            proxy:proxy,
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
                    <p style={{fontWeight:'bold'}}>Chọn Option</p>
                    <div className="input-group mb-5">
                        <Input
                            onChange={(e) => setvpsoption(e.target.value)}
                            className="form-control form-control-solid"
                            type="select"
                            style={{fontWeight:'bold'}}
                            value={vpsoption}
                        >
                            <option key={0} value={"Tiktok_Pending"}>
                                {"PENDING"}
                            </option>
                            <option key={1} value={"tiktok"}>
                                {"TIKTOK"}
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