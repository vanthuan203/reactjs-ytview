import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/vpstiktok/models/Account'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import moment from 'moment'
import {date} from "yup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: AccountModel,
    index:number
}

const UserItem : React.FC<Props> = ({ item ,index}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const clickHandler =()=>{
        dispatch(actions.showCurrentAccount(item))
    }
    const clickEditHandler =()=>{
        dispatch(actions.showCurrentEditAccount(item))
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
                            dispatch(actions.checkedChange({
                                vps:item.vps,
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
                                {item.vps}
                                </text>
                            </span>
                            {item.timecheck!=null&&item.timegettask<item.timecheck&&<span style={{marginRight:2,backgroundColor:round((Date.now()-item.timecheck)/1000/60)<10?"#50CD89":"#e57624"}} className='badge badge-danger'>
                            <text style={{fontSize:11,color:"white"}}>
                                    {((Date.now()-item.timecheck)/1000/60/60)>=24?((((Date.now()-item.timecheck)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.timecheck)/1000/60/60)>=1?((Date.now()-item.timecheck)/1000/60/60).toFixed(2)+'H':((Date.now()-item.timecheck)/1000/60).toFixed(0)+'m'}
                                </text>
                            </span>}
                            {item.timegettask!=null&&item.timegettask>=item.timecheck&&<span style={{marginRight:2,backgroundColor:round((Date.now()-item.timegettask)/1000/60)<10?"#50CD89":"#e57624"}} className='badge badge-danger'>
                            <text style={{fontSize:11,color:"white"}}>
                                    {((Date.now()-item.timegettask)/1000/60/60)>=24?((((Date.now()-item.timegettask)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.timegettask)/1000/60/60)>=1?((Date.now()-item.timegettask)/1000/60/60).toFixed(2)+'H':((Date.now()-item.timegettask)/1000/60).toFixed(0)+'m'}
                                </text>
                            </span>}
                            {item.acccount>0&&<button
                                onClick={()=>clickHandler()}
                                className='btn btn-icon'
                            >
                                <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
                            </button>}
                        </div>

                    </div>
                </div>
            </td>
            <td>
                <span className='badge badge-dark' style={{fontSize:11,marginRight:2, backgroundColor:item.vpsoption=='Tiktok_Pending'?'rgba(9,9,9,0.68)':'rgba(218,30,30,0.97)'}}>
                    <text >
                    {item.vpsoption=='Tiktok_Pending'?'Pending'.toUpperCase():item.vpsoption=='Pending'?item.vpsoption:item.vpsoption.toUpperCase()}
                    </text>
                </span>
                <span style={{fontWeight:'bold',fontSize:11,backgroundColor:"rgba(9,9,9,0.68)",color:"white"}} className='badge badge-dark'>

                        <text >
                              Device {item.total_device==0?'0':+item.total_device}
                        </text>

                </span>
                <span style={{fontWeight:'bold',fontSize:11,marginLeft:2,backgroundColor:"#c0e1ce",color:"black"}} className='badge badge-dark'>

                        <text >
                              Total {item.acccount==0?'0':+item.acccount}
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
            </td>
            <td style={{width:'200px'}} className='text-end'>
                <div  className='d-flex flex-column w-100 me-2'>
                    <div  className='d-flex flex-stack mb-2'>
                        {item.timegettask>0&&<span  style={{color:(((Date.now()-item.timegettask)/1000/60)>30?"rgba(143,3,3,0.97)":"black")}} >{item.total} running | {((Date.now()-item.timegettask)/1000/60/60)>=24?((((Date.now()-item.timegettask)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.timegettask)/1000/60/60)>=1?((Date.now()-item.timegettask)/1000/60/60).toFixed(2)+'H':((Date.now()-item.timegettask)/1000/60).toFixed(0)+'m'} </span>}
                        {item.timegettask==0&&<span  style={{color:"black"}} >No running</span>}
                        {
                            item.vpsreset!=0 && <span style={{fontWeight:'bold',fontSize:11,marginTop:2,backgroundColor:"#e57624"}} className='badge badge-danger'>

                                <text >
                                       Reset {item.vpsreset}
                                </text>

                                </span>

                        }
                    </div>
                    <div  className='progress h-6px w-300'>
                        <div
                            className='progress-bar bg-active-success'
                            role='progressbar'
                            style={{width:(item.total/(50))*200,backgroundColor:"#6da18a"}}
                        ></div>
                    </div>
                </div>
            </td>
            <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        onClick={()=>clickEditHandler()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                    <button
                        onClick={()=>clickDeleteHandler()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                        <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                        />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default UserItem