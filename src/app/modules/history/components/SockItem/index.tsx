import React from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import {SockModel} from 'app/modules/history/models/Account'
import moment from 'moment'
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: SockModel,
    index: number
}

const SockItem: React.FC<Props> = ({ item, index }) => {


    return (
        <tr style={{margin:100}}>
            <td>
                <div className='d-flex flex-stack mb-2'>
                    <span className='text-muted me-2 fs-7 fw-bold'>{index + 1}</span>
                </div>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:"rgba(20,122,178,0.66)",color:"white",}} className='badge badge-danger'>
                    {item.ip}
                </span>
            </td>
            <td>
                 <span style={{fontSize:11,marginLeft:5,backgroundColor:"rgba(218,30,30,0.97)",color:"white",}} className='badge badge-danger'>
                    {item.auth.split(",").length}
                </span>
            </td>
            <td>
                <span style={{color:'black',fontWeight:"bold",fontSize:11}}>
                    {new Date(item.timeupdate).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(item.timeupdate).toLocaleTimeString('vn-VN')}
                    <span style={{fontSize:11,marginLeft:5,backgroundColor:"rgba(20,122,178,0.66)",color:"white",}} className='badge badge-danger'>
                    {((Date.now()-item.timeupdate)/1000/60/60)>=24?((((Date.now()-item.timeupdate)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.timeupdate)/1000/60/60)>=1?((Date.now()-item.timeupdate)/1000/60/60).toFixed(2)+'H':((Date.now()-item.timeupdate)/1000/60).toFixed(0)+'m'}</span>
                </span>
            </td>


        </tr>
    )
}

export default SockItem