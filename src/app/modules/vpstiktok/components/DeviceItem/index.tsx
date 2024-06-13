import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { DeviceModel } from 'app/modules/vpstiktok/models/Account'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import moment from 'moment'
import {date} from "yup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: DeviceModel,
    index:number
}

const DeviceItem : React.FC<Props> = ({ item ,index}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const clickHandler =()=>{
        //dispatch(actions.showCurrentAccount(item))
    }
    const clickDeleteHandler = () => {
        if (window.confirm("Bạn chắc chắn muốn xóa VPS IP: "+item.vps!) == true) {
            dispatch(actions.deleteVpsRequest(item.vps))
        }
    }
    return (
        <tr style={{margin:100,backgroundColor:item.checked==true?"rgba(252,226,207,0.62)":""}}>
            <td className='w-25px'>
                <div style={{marginLeft:5}} className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt)=>{
                            dispatch(actions.checkedDeviceChange({
                                device_id:item.device_id,
                                checked:evt.target.checked
                            }))
                        }}
                        className='form-check-input'
                        type='checkbox'
                        value={1}
                        checked={item.checked}
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                         />
                </div>
            </td>
            <td className='w-25px'>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>

            <td>
                <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                        <div  className='text-dark fw-bolder text-hover-primary fs-6'>
                            <span style={{marginRight:2,backgroundColor:"#c0e1ce"}} className='badge badge-danger'>
                                <text style={{fontSize:11,color:"black"}}>
                                {item.device_id}
                                </text>
                            </span>
                            {item.timecheck!=null&&<span style={{marginRight:2,backgroundColor:round((Date.now()-item.timecheck)/1000/60)<10?"#50CD89":"#e57624"}} className='badge badge-danger'>
                                <text style={{fontSize:11,color:"white"}}>
                                    {round((Date.now()-item.timecheck)/1000/60)}{'m'}
                                </text>
                            </span>}
                        </div>

                    </div>
                </div>
            </td>
            <td>
                <span style={{fontWeight:'bold',fontSize:11,backgroundColor:"#c0e1ce",color:"black"}} className='badge badge-dark'>

                        <text >
                              {item.acccount==0?'0':+item.acccount}
                        </text>

                </span>
                <span className='badge badge-dark' style={{fontSize:11,marginLeft:2, backgroundColor:'#50CD89'}}>
                    <text >
                    Live {item.acccountlive}
                    </text>
                </span>
                <span className='badge badge-dark' style={{fontSize:11,marginLeft:2, backgroundColor:'#c0271b'}}>
                    <text >
                    Die {item.acccount-item.acccountlive}
                    </text>
                </span>
                <span className='badge badge-dark' style={{fontSize:11,marginLeft:2, backgroundColor:'rgba(20,122,178,0.66)'}}>
                    <text >
                    Follower {item.follower}
                    </text>
                </span>
                <span  style={{fontSize:11,marginLeft:2,color:(((Date.now()-item.time_add)/1000/60)>30?"rgba(143,3,3,0.97)":"black"),backgroundColor:"#c0e1ce"}} className='badge badge-danger' > {((Date.now()-item.time_add)/1000/60/60)>=24?((((Date.now()-item.time_add)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.time_add)/1000/60/60)>=1?((Date.now()-item.time_add)/1000/60/60).toFixed(2)+'H':((Date.now()-item.time_add)/1000/60).toFixed(0)+'m'} </span>
            </td>
            <td >
                <div>
                        <span  style={{color:"black"}} > <span style={{fontWeight:'bold',fontSize:11,backgroundColor:item.running>0?"#3a8f5e":"rgba(61,59,59,0.68)",color:"white"}} className='badge badge-dark'>
                        <text >
                              {item.running>0?"R":"P"}
                        </text>

                     </span>
                            {item.timegettask>0&&<span  style={{color:(((Date.now()-item.timegettask)/1000/60)>30?"rgba(143,3,3,0.97)":"black")}} > {((Date.now()-item.timegettask)/1000/60/60)>=24?((((Date.now()-item.timegettask)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.timegettask)/1000/60/60)>=1?((Date.now()-item.timegettask)/1000/60/60).toFixed(2)+'H':((Date.now()-item.timegettask)/1000/60).toFixed(0)+'m'} </span>}
                            {item.timegettask==0&&<span  style={{color:"black"}} > No running</span>}
                        </span>
                    </div>
            </td>
        </tr>
    )
}

export default DeviceItem