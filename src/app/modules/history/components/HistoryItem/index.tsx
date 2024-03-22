import React from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { HistoryModel } from 'app/modules/history/models/Account'
import moment from 'moment'
type Props = {
    item: HistoryModel,
    index: number
}

const HistoryItem: React.FC<Props> = ({ item, index }) => {
    return (
        <tr>
            <td>
                <div className='d-flex flex-stack mb-2'>
                    <span>{index + 1}</span>
                </div>
            </td>
            <td>
                <div className='d-flex flex-stack mb-2'>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"rgba(9,9,9,0.68)"}} className='badge badge-success 1'>{item.date}</span>
                </div>
            </td>
            <td>
                <div   className='progress h-20px w-500px'>
                    <div

                        className='progress-bar bg-active-warning'
                        role='progressbar'
                        style={{width:(item.view/item.maxview)*500,fontWeight:"bold",color:"white",backgroundColor:item.maxview==item.view?"#090909":"#5aa87b"}}
                    >{item.view}$</div>
                </div>

            </td>
            <td>
                <div   className='progress h-20px w-200px'>
                    <div

                        className='progress-bar bg-active-warning'
                        role='progressbar'
                        style={{width:(item.viewsub/item.maxsubview)*200,fontWeight:"bold",color:"white",backgroundColor:item.maxsubview==item.viewsub?"rgb(9,9,9)":"rgba(164,2,2,0.97)"}}
                    >{item.viewsub}$</div>
                </div>
            </td>
        </tr>
    )
}

export default HistoryItem