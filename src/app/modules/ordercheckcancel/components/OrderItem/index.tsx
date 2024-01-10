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
    const [running, setRunning] = useState(0)
    const [success, setSuccess] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isHovering, setIsHovering] = useState(false);
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const API_URL = process.env.REACT_APP_API_URL
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
        <tr style={{margin:100,backgroundColor:item.checked==true?"rgba(252,226,207,0.62)":""}}>
            <td  className='w-25px'>
                <div style={{marginLeft:5}} className='form-check form-check-sm form-check-custom form-check-solid'>
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
                <span className='text-muted fw-bold text-muted d-block text-sm'>{index}</span>
            </td>
            <td>
                <a  target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f",marginRight:5,marginBottom:5,color:"white",}} href={API_URL+'videoview/getinfo?orderid=' + item.orderid} className='badge badge-danger'>
                    {item.orderid}
                </a>
            </td>
            <td>

                <a  target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.youtube.com/watch?v=' + item.videoid} className='badge badge-danger'>
                    {item.videoid}
                </a>
                <span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"rgba(241,133,133,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"rgb(9,9,9)"}}>{item.price==null?0:item.price.toPrecision()}</span>$</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Order <span style={{color:"#ffffff"}}>{item.vieworder}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Start <span style={{color:"black"}}>{item.viewstart}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Total <span style={{color:"#000000"}}>{item.viewtotal==null?0:item.viewtotal}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:Math.round((Math.round(Number(item.viewtotal==null?0:item.viewtotal))/item.vieworder*100))>=100?"rgba(234,100,100,0.97)":"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Completed <span style={{color:"#fafafa"}}>{Math.round((Math.round(Number(item.viewtotal==null?0:item.viewtotal))/item.vieworder*100))+'%'}</span></span>
                    <br/>
                </span>

            </td>

            {role!="ROLE_USER"&&<td className='text-dark fw-bolder text-hover-primary text-sm'>
                {loading ? <span className='text-muted fw-bold text-muted d-block text-sm'>
                    {"Đang lấy dữ liệu"}
                </span> :
                    <span style={{color:'black',fontSize:11,backgroundColor:item.total!=1?"#c0e1ce":"#dc7a30"}} className='badge badge-dark'>{item.total==1?0:item.total}/{item.maxthreads}</span>
                }
            </td>}
            <td>
                {//{item.service<600?<img style={{width:20,height:20,marginRight:5,marginBottom:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:
                    //    <img style={{width:20,height:20,marginRight:5,marginBottom:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />}
                }
                <span style={{color:'white',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f"}} className='badge badge-success'>
                  {item.service}</span>
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.insertdate).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            <td>
                {//{item.service<600?<img style={{width:20,height:20,marginRight:5,marginBottom:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:
                    //    <img style={{width:20,height:20,marginRight:5,marginBottom:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />}
                }
                <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e"}} className='badge badge-success'>
                  {round((Date.now()-item.timestart)/1000/60)>60?(round((Date.now()-item.timestart)/1000/60)/60).toFixed(2)+'H':round((Date.now()-item.timestart)/1000/60)+'m'}</span>
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.timestart).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.timestart).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            {role!="ROLE_USER"&&<td>
                <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.user.replace("@gmail.com","")}</span>
            </td>}
            <td>
                <span style={{overflow:"hidden",maxWidth:100,color:'black',fontSize:11,fontWeight:'bold'}} >{item.note}</span>
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