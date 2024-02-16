import React from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import {AuthenModel} from 'app/modules/history/models/Account'
import moment from 'moment'
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: AuthenModel,
    index: number
}

const AuthenItem: React.FC<Props> = ({ item, index }) => {


    return (
        <tr style={{margin:100}}>
            <td>
                <div className='d-flex flex-stack mb-2'>
                    <span className='text-muted me-2 fs-7 fw-bold'>{index + 1}</span>
                </div>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:item.lockmode==1?"#03d96e":"rgba(20,122,178,0.66)",color:"white",}} className='badge badge-danger'>
                    {item.ipv4}
                </span>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:"#c0e1ce",color:"black",}} className='badge badge-danger'>
                    {item.timecheck==0?'-':round((Date.now()-item.timecheck)/1000/60)}m
                </span>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:item.lockmode==0?"#6d7773":"rgba(20,122,178,0.66)",color:"white",}} className='badge badge-danger'>
                    {item.lockmode}
                </span>
            </td>

        </tr>
    )
}

export default AuthenItem