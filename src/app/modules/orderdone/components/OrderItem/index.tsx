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
    const [running, setRunning] = useState(0)
    const [success, setSuccess] = useState(0)
    const [loading, setLoading] = useState(false)
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0

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
        if (window.confirm("bạn có chắc chắn muốn xóa đơn : "+item.videoid!
    ) == true) {
            dispatch(actions.deleteOrderRequest(item.videoid,1))
        }
    }


    //const subNeedRun = item.view_need - (item.current_view - item.start_view)
    //const increase = item.current_view - item.start_view
    return (
        <tr style={{margin:100}}>
            <td className='w-25px'>
                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt)=>{
                            dispatch(actions.checkedChange({
                                videoid:item.videoid,
                                checked:evt.target.checked
                            }))
                        }}
                        className='form-check-input'
                        type='checkbox'
                        value={1}
                        checked={item.checked}
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                    />
                </div>
            </td>
            <td>
                <span style={{fontWeight:'bold',fontSize:11,fontFamily:'cursive'}} className='text-muted fw-bold text-muted d-block text-sm'>{index}</span>
            </td>
            <td>

                <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.youtube.com/watch?v=' + item.videoid} className='badge badge-danger'>
                    {item.videoid}
                </a>
                {role=="ROLE_ADMIN"&&<span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"red"}}>{format1(Math.round(Number(item.price==null?0:item.price)))}đ</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{(item.optionbuff==10?'10':item.optionbuff==30?'30':item.optionbuff==60?'60':item.optionbuff==0?'Auto':'120')+'|'+Math.round(Number(item.duration==null?0:item.duration)/60)+'min'}</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#26695c",marginRight:5,marginBottom:5}} className='badge badge-warning'>{Math.round(Number(item.timebuffh24h==null?0:item.timebuffh24h)/3600)+'/'+(Math.round(Number(item.timebuffhtotal==null?0:item.timebuffhtotal)/3600))+"/"+item.timebuff}</span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-dark'>{(item.view24h==null?0:item.view24h)+'/'+(item.viewtotal==null?0:item.viewtotal)+' | '+item.viewstart}</span>
                    {Math.round((Math.round(Number(item.timebuffhtotal==null?0:item.timebuffhtotal)/3600)/item.timebuff*100))>=90?
                        <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>
                        {Math.round((Math.round(Number(item.timebuffhtotal==null?0:item.timebuffhtotal)/3600)/item.timebuff*100))+'%'}</span>:
                        <span style={{ color:'white',fontSize:11,backgroundColor:"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success'>
                        {Math.round((Math.round(Number(item.timebuffhtotal==null?0:item.timebuffhtotal)/3600)/item.timebuff*100))+'%'}</span>
                    }
                    <br/>
                </span>}
                {role=="ROLE_USER"&&<span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Price | <span style={{color:"red"}}>{format1(Math.round(Number(item.price==null?0:item.price)))}đ</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Time order | <span style={{color:"#ffffff"}}>{item.timebuff+'h'}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success 1'>View start | <span style={{color:"#fafafa"}}>{item.viewstart}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Time buff | <span style={{color:"#000000"}}>{Math.round(Number(item.duration==null?0:item.duration<3600?1800:item.duration<7200?3600:7200)/60)+'min'}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Total buff | <span style={{color:"#000000"}}>{Math.round(Number(item.timebuffhtotal==null?0:item.timebuffh24h)/3600)+'h'}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'>% Completed | <span style={{color:"#fafafa"}}>{Math.round((Math.round(Number(item.timebuffhtotal==null?0:item.timebuffhtotal)/3600)/item.timebuff*100))+'%'}</span></span>
                    <br/>
                </span>}

            </td>
            {role!="ROLE_USER"&&<td className='text-dark fw-bolder text-hover-primary text-sm'>
                {loading ? <span className='text-muted fw-bold text-muted d-block text-sm'>
                    {"Đang lấy dữ liệu"}
                </span> :
                    <span style={{color:'black',fontSize:11,backgroundColor:item.total!=1?"#c0e1ce":"#dc7a30"}} className='badge badge-dark'>{item.total==1?0:item.total}/{item.maxthreads}</span>
                }
            </td>}
            <td>
                {
                    item.enabled === 1 ? <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e"}} className='badge badge-success'>R</span> :item.enabled === 2 ?
                        <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-warning'>T1</span>:item.enabled === 3 ?
                        <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T2</span>:item.enabled === 4 ?
                                <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T3</span>:item.enabled === 5 ?
                                    <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T4</span>:item.enabled === 6 ?
                                        <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T5</span>:item.enabled === 7 ?
                                            <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T6</span>:item.enabled === 8 ?
                                                <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T7</span>:item.enabled === 9 ?
                                                    <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T8</span>:item.enabled === 10 ?
                                                        <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>T9</span>:
                            <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-danger'>S</span>

                }
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.insertdate).toLocaleDateString('vn-VN') +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            {role!="ROLE_USER"&&<td>
                <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.user}</span>
            </td>}
            <td>
               <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.note}</span>
            </td>

            {
                 <td >
                    <a href='#' onClick={clickUpdateHandler} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mr-5'>
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                     {role==='ROLE_ADMIN'&&<a href='#' onClick={clickDeleteHandler} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    </a>}
                </td>
            }
        </tr>
    )
}

export default OrderItem