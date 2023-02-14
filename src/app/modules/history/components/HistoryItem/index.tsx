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
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce"}} className='badge badge-success 1'>{item.date}</span>
                </div>
            </td>
            <td>

                <div   className='progress h-20px w-300px'>
                    <div

                        className='progress-bar bg-active-warning'
                        role='progressbar'
                        style={{width:(item.time/item.maxtime)*300,fontWeight:"bold",color:"yellow",backgroundColor:"#26695c"}}
                    >{item.time}</div>
                </div>

            </td>
            <td>
                <div   className='progress h-20px w-300px'>
                    <div

                        className='progress-bar bg-active-warning'
                        role='progressbar'
                        style={{width:(item.view/item.maxview)*300,fontWeight:"bold",color:"white",backgroundColor:"#a83939"}}
                    >{item.view}</div>
                </div>

            </td>
        </tr>
    )
}

export default HistoryItem