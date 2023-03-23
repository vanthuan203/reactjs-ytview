import React from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import {ComputerModel, ProxyModel} from 'app/modules/history/models/Account'
import {resetComputer} from 'app/modules/history/redux/AccountCRUD'
import moment from 'moment'
import {round} from "@popperjs/core/lib/utils/math";
import {actions} from "../../../orderdone";
type Props = {
    item: ProxyModel,
    index: number
}

const ComputerItem: React.FC<Props> = ({ item, index }) => {

    const clickDeleteHandler= async()=>{
        if (window.confirm("bạn có chắc chắn muốn reset luồng trên VPS này") == true) {
            const res:any = await resetComputer(item.ipv4)
            //dispatch(actions.deleteOrderRequest(item.channel_id))
        }
    }

    return (
        <tr style={{margin:100}}>
            <td>
                <div className='d-flex flex-stack mb-2'>
                    <span className='text-muted me-2 fs-7 fw-bold'>{index + 1}</span>
                </div>
            </td>
            <td>
                <span style={{fontSize:11,marginRight:5,backgroundColor:"#435e57",color:"white",}} className='badge badge-danger'>
                    {item.geo}
                </span>
                <span style={{fontSize:11,backgroundColor:item.state==1?"#03d96e":"#e57624",color:"white",}} className='badge badge-danger'>
                    {item.ipv4}
                </span>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:"#c0e1ce",color:"black",}} className='badge badge-danger'>
                    {item.totalport}
                </span>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:"#c0e1ce",color:"black",}} className='badge badge-danger'>
                    {item.timecheck==0?'-':round((Date.now()-item.timecheck)/1000/60)}m
                </span>
            </td>
            <td>
                <span style={{fontSize:11,backgroundColor:item.state==1?"#03d96e":"#e57624",color:"white",}} className='badge badge-danger'>
                    {item.state==0?'Die':'Live'}
                </span>
                <span style={{fontSize:11,margin:5,backgroundColor:"#9ca1a0",color:"white",}} className='badge badge-danger'>
                    {item.numcheck==0?'':item.numcheck}{item.numcheck==0?'':'m'}
                </span>
            </td>
            <td>
                <span >
                    {item.geo.indexOf('us')>=0?<img style={{width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:
                        <img style={{width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />}
                </span>

            </td>
        </tr>
    )
}

export default ComputerItem