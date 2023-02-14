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
    const clickDeleteHandler = () => {
        if (window.confirm("bạn có chắc chắn muốn xóa đơn : "+item.videoid!) == true) {
            dispatch(actions.deleteOrderRequest(item.videoid))
        }
    }


    //const subNeedRun = item.view_need - (item.current_view - item.start_view)
    //const increase = item.current_view - item.start_view
    return (
        <tr style={{margin:100}}>

            <td>
                <span style={{fontWeight:'bold',fontSize:11,fontFamily:'cursive'}} className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>
            <td>
                <span style={{ color:'white',fontSize:11,backgroundColor:"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.orderid}</span>
            </td>
            <td>

                <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.youtube.com/watch?v=' + item.videoid} className='badge badge-danger'>
                    {item.videoid}
                </a>
                <span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Price | <span style={{color:"rgba(227,15,25,0.93)"}}>{item.price==null?0:item.price}</span>$</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Order | <span style={{color:"#ffffff"}}>{item.vieworder}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Start | <span style={{color:"black"}}>{item.viewstart}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Total | <span style={{color:"#000000"}}>{item.viewtotal==null?0:item.viewtotal}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>{Math.round((Math.round(Number(item.viewtotal==null?0:item.viewtotal))/item.vieworder*100))+'%'}</span>
                    {item.viewend!=null&&<span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'>End | {item.viewend}</span>}
                    <br/>
                </span>
            </td>
            <td >
                <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e"}} className='badge badge-success'>R | {item.service}</span>
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>
                }
            </td>
            <td>
                {
                    item.cancel === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e"}} className='badge badge-success'>D</span> :
                        <span style={{color:'white',fontSize:11,backgroundColor:"#b7080f"}} className='badge badge-danger'>C</span>

                }
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.enddate).toLocaleDateString('vn-VN') +" "+ new Date(item.enddate).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            {role!="ROLE_USER"&&<td>
                <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.user}</span>
            </td>}
            <td>
               <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.note}</span>
            </td>
        </tr>
    )
}

export default OrderItem