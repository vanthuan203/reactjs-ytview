import React from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import {ComputerModel} from 'app/modules/history/models/Account'
import {resetComputer} from 'app/modules/history/redux/AccountCRUD'
import moment from 'moment'
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: ComputerModel,
    index: number
}

const ChannelStaticItem: React.FC<Props> = ({ item, index }) => {

    return (
        <tr>
            <td className='w-25px'>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>
            <td>
                <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                        <div  className='text-dark fw-bolder text-hover-primary fs-6'>
                            {item.vps.substring(item.vps.lastIndexOf('-')+1,item.vps.length).length!=0&&<span style={{marginRight:2,backgroundColor:"#26695c"}} className='badge badge-dark'>
                                <text style={{fontSize:11}}>
                                {item.vps.substring(item.vps.lastIndexOf('-')+1,item.vps.length)}
                                </text>
                            </span>}
                            <span style={{marginRight:2,backgroundColor:"#c0e1ce"}} className='badge badge-danger'>
                                <text style={{fontSize:11,color:"black"}}>
                                {item.vps.substring(0,item.vps.lastIndexOf('-'))}
                                </text>
                            </span>
                            <span style={{marginRight:2,backgroundColor:item.time<5?"#50CD89":"#e57624"}} className='badge badge-danger'>
                                <text style={{fontSize:11,color:"white"}}>
                                    {item.time}{'m'}
                                </text>
                            </span>
                        </div>

                    </div>
                </div>
            </td>
            <td>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{item.total}</span>
            </td>
        </tr>
    )
}

export default ChannelStaticItem