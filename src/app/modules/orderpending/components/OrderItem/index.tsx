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
        <tr style={{margin:100}}>
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
                    <span style={{color:'white',fontSize:11,backgroundColor:item.maxthreads>0?"#03d96e":"rgba(20,122,178,0.66)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                       {item.maxthreads>0?"Running":"Pending"} </span>
                    {item.priority>0&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(218,30,30,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                       {item.priority}</span>}
                    <br/>
                </span>

            </td>
            <td>
                {//{item.service<600?<img style={{width:20,height:20,marginRight:5,marginBottom:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:
                //    <img style={{width:20,height:20,marginRight:5,marginBottom:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />}
                }
                <span style={{color:'white',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {item.service}</span>
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{new Date(item.insertdate).toLocaleDateString('vn-VN').replace("/2023","") +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            {role!="ROLE_USER"&&<td>
                <span className='badge badge-success' style={{color:'black',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.user.replace("@gmail.com","")}</span>
            </td>}
            <td>
               <span  className='badge badge-success' style={{color:'black',fontSize:11,fontWeight:'normal',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.note}</span>
            </td>

            {
                 <td >
                     {role==='ROLE_ADMIN'&&<a href='#' onClick={clickDeleteHandler} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    </a>}
                </td>
            }
        </tr>
    )
}

export default OrderItem