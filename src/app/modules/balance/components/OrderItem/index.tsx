import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModel } from '../../models/Order'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
import {RootState} from "../../../../../setup";
type Props = {
    item: OrderModel,
    showEdit: boolean,
    index: number,
    //increase: number
}

const OrderItem: React.FC<Props> = ({ item, showEdit, index }) => {
    const role: string =
        (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
    const [running, setRunning] = useState(0)
    const [success, setSuccess] = useState(0)
    const [loading, setLoading] = useState(false)

    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }


    const dispatch = useDispatch()
    const clickUpdateHandler = () => {
        dispatch(actions.showcurrentOrder(item))
    }

    //const subNeedRun = item.view_need - (item.current_view - item.start_view)
    //const increase = item.current_view - item.start_view
    return (
        <tr style={{margin:100}}>
            <td className='w-25px'>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>
            <td>
                <span  >
                    <text style={{fontSize:12,fontWeight:"bold"}}>
                    {new Date(item.time).toLocaleDateString('vn-VN') +" "+ new Date(item.time).toLocaleTimeString('vn-VN')}
                    </text>
                </span>

            </td>
            <td>
                <span >
                    <text style={{fontSize:12,fontWeight:"bold"}}>
                        {item.balance>=0?"+":""}{item.balance.toFixed(3)}$
                    </text>
                            </span>
            </td>
            <td>
                <span >
                    <text style={{fontSize:12,fontWeight:"bold"}}>
                        {item.totalbalance.toFixed(3)}$
                    </text>
                            </span>
            </td>
            {role!="ROLE_USER"&&<td>
                <span >
                    <text style={{fontSize:12,fontWeight:"bold"}}>
                        {item.user}
                    </text>
                            </span>
            </td>}
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.note}
                                </text>
                    </span>
            </td>
        </tr>
    )
}

export default OrderItem