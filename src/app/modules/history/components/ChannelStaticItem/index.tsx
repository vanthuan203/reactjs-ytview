import React from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import {ChannelStaticModel, HistoryModel} from 'app/modules/history/models/Account'
import {resetComputer} from 'app/modules/history/redux/AccountCRUD'
import moment from 'moment'
type Props = {
    item: HistoryModel,
    index: number
}

const ChannelStaticItem: React.FC<Props> = ({ item, index }) => {

    return (
        <tr>
            <td>
                <div className='d-flex flex-stack mb-2'>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce"}} className='badge badge-success 1'>{index + 1}</span>
                </div>
            </td>
            <td>
                <a href='#' className='text-sm text-dark fw-bolder text-hover-primary d-block mb-1 '>
                    {item.date}
                </a>
            </td>
            <td>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{item.date}</span>
            </td>
        </tr>
    )
}

export default ChannelStaticItem