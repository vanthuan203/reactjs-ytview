import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { ProxySettingModel } from 'app/modules/setting/models/Account'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import moment from 'moment'
import {date} from "yup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: ProxySettingModel,
    index:number
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const ProxySettingItem : React.FC<Props> = ({ item ,index}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const clickHandler =()=>{
       dispatch(actions.showCurrentProxySetting(item))
    }
    return (

        <tr>
            <td>
                <span>
                    <text style={{fontSize:12,fontWeight:"bold"}} >
                    {item.option_proxy}
                    </text>
                </span>

            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.username}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.password}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.cron}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.total_port}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.total_sock_port}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{color:'black',fontWeight:"bold",fontSize:11}}>
                        {new Date(item.timeupdate).toLocaleDateString('vn-VN').replace("//2025","") +" "+ new Date(item.timeupdate).toLocaleTimeString('vn-VN')}
                    </span>
            </td>
            <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        onClick={()=>clickHandler()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default ProxySettingItem