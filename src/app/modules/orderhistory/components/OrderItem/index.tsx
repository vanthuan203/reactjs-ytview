import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModel } from '../../models/Order'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
import {RootState} from "../../../../../setup";
import {round} from "@popperjs/core/lib/utils/math";
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
                <span style={{marginLeft:5}} className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>
            <td>
                <span style={{ color:'white',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.orderid}</span>
            </td>
            <td>

                <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.youtube.com/watch?v=' + item.videoid} className='badge badge-danger'>
                    {item.videoid}
                </a>
                <span>
                  <span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"rgba(241,133,133,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"rgb(9,9,9)"}}>{item.price==null?0:item.price.toPrecision()}</span>$</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#ffffff"}}>{item.vieworder}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"black"}}>{item.viewstart}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#000000"}}>{item.viewtotal==null?0:item.viewtotal}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:Math.round((Math.round(Number(item.viewtotal==null?0:item.viewtotal))/item.vieworder*100))>=100?"rgba(234,100,100,0.97)":"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#fafafa"}}>{Math.round((Math.round(Number(item.viewtotal==null?0:item.viewtotal))/item.vieworder*100))+'%'}</span></span>
                    <span style={{color:'white',fontSize:11,backgroundColor:item.timestart!=0?"#03d96e":"rgba(218,30,30,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                        {item.timestart!=0?(round((item.enddate-item.timestart)/1000/60)>60?(round((item.enddate-item.timestart)/1000/60)/60).toFixed(2)+'H':round((item.enddate-item.timestart)/1000/60)+'m'):'C'}</span>
                    <br/>
                </span>
                </span>
            </td>
            <td >
                {//{item.service<600?<img style={{width:20,height:20,marginRight:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:
                    //   <img style={{width:20,height:20,marginRight:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />}
                }
                <span style={{color:'white',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.service}</span>
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{new Date(item.insertdate).toLocaleDateString('vn-VN').replace("/2023","") +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>
                }
            </td>
            <td >
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.timestart!=0?(new Date(item.timestart).toLocaleDateString('vn-VN').replace("/2023","") +" "+ new Date(item.timestart).toLocaleTimeString('vn-VN')):""}</span>
                }
            </td>
            <td>
                {
                    item.cancel === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>D</span> :
                        item.cancel === 2 ? <span style={{color:'white',fontSize:11,backgroundColor:"#dc7a30",marginRight:5,marginBottom:5}} className='badge badge-success'>P</span> :
                        <span style={{color:'white',fontSize:11,backgroundColor:"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-danger'>C</span>

                }
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{new Date(item.enddate).toLocaleDateString('vn-VN').replace("/2023","") +" "+ new Date(item.enddate).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            <td >
                {(item.viewend>-1&&item.viewend!=null)&&<span  style={{color:'white',fontSize:11,backgroundColor:item.viewend>=(item.vieworder)?"rgba(16,128,201,0.66)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.viewend}</span>}
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.timecheckbh>0?(new Date(item.timecheckbh).toLocaleDateString('vn-VN').replace("/2023","") +" "+ new Date(item.timecheckbh).toLocaleTimeString('vn-VN')):""}</span>
                }
            </td>
            {role!="ROLE_USER"&&<td>
                <span className='badge badge-success' style={{color:'black',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.user.replace("@gmail.com","")}</span>
            </td>}
            <td>
               <span className='badge badge-success' style={{overflow:"hidden",maxWidth:100,color:'black',fontSize:11,fontWeight:'normal',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.note}</span>
            </td>
        </tr>
    )
}

export default OrderItem