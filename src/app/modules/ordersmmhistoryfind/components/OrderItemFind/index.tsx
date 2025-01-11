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
    let role: string =
        (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
    if(role==="ROLE_SUPPORT"){
        role="ROLE_ADMIN"
    }
    const [running, setRunning] = useState(0)
    const [success, setSuccess] = useState(0)
    const [loading, setLoading] = useState(false)

    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }


    const dispatch = useDispatch()
    const clickRefund100 = () => {
        if (window.confirm("⚠️ Bạn chắc chắn muốn hoàn 100% cho orderId "+item.order_id!
        ) == true) {
            dispatch(actions.requestUpdate(item.order_id.toString(),false,true))
        }
    }
    const clickPartial = () => {
        if (window.confirm("⚠️ Bạn chắc chắn muốn hoàn phần thiếu cho orderId "+item.order_id!
        ) == true) {
            dispatch(actions.requestUpdate(item.order_id.toString(),true,true))
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
                                order_id:item.order_id,
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
                 <span style={{ color:'white',fontSize:11,padding:2,backgroundColor:"rgba(0,0,0,0.63)"}} className='badge badge-success'>{item.order_id}</span>
            </td>
            <td>
              <img style={{float:"left",marginRight:5,width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/svg/social-logos/'+item.platform+'.svg')} alt='metronic' />
            </td>
            <td>
                <span style={{ color:'white',fontSize:11,padding:4,backgroundColor:"#08a718"}} className='badge badge-success'>{item.mode.toUpperCase()}</span>
            </td>
            <td >
                <span style={{fontSize:11
                }}>
                     <span >
                       <span style={{color:"#009ef7"}}>
                                                     <a  target="_blank" style={{fontWeight:"bold",marginRight:5,marginBottom:5,color:"#b41313",}}
                                                         href={item.order_link}
                                                     >
                        {item.order_key}</a>
                                                   <span style={{color:'white',fontSize:10,padding:2,backgroundColor:"rgba(0,0,0,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                            {item.task.charAt(0).toUpperCase()}
                        </span>
                       </span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Charge: <span style={{color:"#009ef7"
                       }}>${item.charge} </span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Quantity: <span style={{color:"#090909"
                       }}>{item.quantity}</span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Start count: <span style={{color:"#090909"
                       }}>{item.start_count}</span></span>
                    </span>
                    <br/>
                    <span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Total: <span style={{color:"#090909"
                       }}>{item.total} </span></span>
                        <span style={{color:'white',fontSize:10,padding:2,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>
                            {Math.round((item.total/item.quantity)*100)}%
                        </span>
                    </span>
                    {item.total>0&&item.update_current_time>0&& <br/>}
                    {item.total>0&&item.update_current_time>0&&<span>
                       <span style={{fontWeight:"bold",color:"gray"}} >Realtime: <span style={{color:"#090909"
                       }}>{item.current_count-item.start_count}/{(item.quantity>item.total?item.total:item.quantity)} </span></span>
                        <span style={{color:'white',fontSize:10,padding:2,backgroundColor:item.current_count>=(item.quantity>item.total?item.total:item.quantity)+item.start_count?"#03d96e":"#dc7a30",marginRight:5,marginBottom:5}} className='badge badge-success'>
                            {Math.round(((item.current_count-item.start_count)/((item.quantity>item.total?item.total:item.quantity)))*100)}%
                        </span>
                    </span>}
                    <br/>
                     <span style={{fontSize:10,color:"darkgray"}}>{item.order_link.trim()}</span>
                </span>

            </td>
            <td className='text-dark fw-bolder text-hover-primary text-sm'>
                <span style={{color:'white',fontSize:10,backgroundColor:item.cancel==0?"#03d96e":item.cancel==2?"rgba(220,133,18,0.97)":"rgba(222,58,58,0.97)",padding:3,marginRight:5,marginBottom:5}} className='badge badge-dark'>{item.cancel==0?"Completed":item.cancel==1?"Canceled":"Partially Completed"}</span>
            </td>
            <td>

                <span style={{color:'white',fontSize:10,backgroundColor:"#b7080f",padding:3,marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {item.service_id} </span>
                <br/>
                <span style={{color:'white',fontSize:10,padding:3,marginRight:5,marginBottom:5}} className='badge badge-success'>
                            {item.task.toUpperCase()}
                        </span>
                <br/>
                <span style={{color:'white',fontSize:10,padding:2,backgroundColor:"rgba(31,155,229,0.66)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((item.end_time-item.start_time)/1000/60/60)>=24?((((item.end_time-item.start_time)/1000/60/60/24)).toFixed(2)+'D'):((item.end_time-item.start_time)/1000/60/60)>=1?((item.end_time-item.start_time)/1000/60/60).toFixed(2)+'H':((item.end_time-item.start_time)/1000/60).toFixed(2)+'m'}</span>

            </td>
            <td>
                <span style={{fontSize:11}}>
                <span>
                    <span style={{fontWeight:"bold",color:"gray"}} >Start: <span style={{color:"#009ef7"
                    }}><span style={{color:'rgba(34,126,231,0.97)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.start_time).toLocaleDateString('vn-VN').replace("/2025","") +" "+new Date(item.start_time).toLocaleTimeString('vn-VN')}</span>
                    </span>
                    </span>
                    </span>
                <br/>
                    {item.end_time!=null&&item.end_time>0&&<span>
                    <span style={{fontWeight:"bold",color:"gray"}} >End: <span><span style={{color:"#009ef7"
                    }}><span style={{color:'#050505',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.end_time).toLocaleDateString('vn-VN').replace("/2025","") +" "+new Date(item.end_time).toLocaleTimeString('vn-VN')}</span>
                    </span>
                    </span>
                    </span></span>}
                    <br/>
                    {item.update_current_time!=null&&item.update_current_time>0&&<span>
                    <span style={{fontWeight:"bold",color:"gray"}} >Current: <span><span style={{color:"#437491"
                    }}><span style={{color:'rgba(159,93,8,0.97)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.update_current_time).toLocaleDateString('vn-VN').replace("/2025","") +" "+new Date(item.update_current_time).toLocaleTimeString('vn-VN')}</span>
                    </span>
                    </span>
                    </span></span>}
                    {item.refund>0&&<br/>}
                    {item.refund_time!=null&&item.refund_time>0&&item.refund>0&&<span>
                    <span style={{fontWeight:"bold",color:"gray"}} >Refund: <span><span style={{color:"#009ef7"
                    }}><span style={{color:'rgba(218,30,30,0.97)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.refund_time).toLocaleDateString('vn-VN').replace("/2025","") +" "+new Date(item.refund_time).toLocaleTimeString('vn-VN')}</span>
                    </span>
                    <span style={{color:'white',fontSize:10,padding:2,backgroundColor:"rgba(218,30,30,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                            {item.refund}
                        </span>
                    </span>
                    </span></span>}
                    {item.refill>0&&<br/>}
                    {item.refill_time!=null&&item.refill_time>0&&item.refill>0&&<span>
                    <span style={{fontWeight:"bold",color:"gray"}} >Refill: <span><span style={{color:"#009ef7"
                    }}><span style={{color:'rgba(53,138,10,0.97)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.refill_time).toLocaleDateString('vn-VN').replace("/2025","") +" "+new Date(item.refill_time).toLocaleTimeString('vn-VN')}</span>
                    </span>
                    <span style={{color:'white',fontSize:10,padding:2,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>
                            {item.refill}
                        </span>
                    </span>
                    </span></span>}
                </span>


            </td>
            {role!="ROLE_USER"&&<td>
                <span className='badge badge-success' style={{color:'black',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.username.replace("@gmail.com","")}</span>
            </td>}
            <td>
                <span className='badge badge-success' style={{whiteSpace:"inherit",textAlign:"left",maxWidth:150,color:'black',fontSize:11,fontWeight:'normal',backgroundColor:"white"}} >{item.note}</span>
            </td>
            <td className='text-dark fw-bolder text-hover-primary text-sm'>
                {item.total>0&&item.update_current_time>0&&<span>
                        <span style={{color:'black',fontSize:10,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-dark'>{item.current_count}/{item.start_count+item.total}</span>
                        <span style={{color:'white',fontSize:10,padding:2,backgroundColor:item.current_count>=(item.quantity>item.total?item.total:item.quantity)+item.start_count?"#03d96e":"#dc7a30",marginRight:5,marginBottom:5}} className='badge badge-success'>
                                    {Math.round(((item.current_count-item.start_count)/item.total)*100)}%
                        </span>
                        <span style={{color:'white',fontSize:10,padding:2,backgroundColor:"rgba(31,155,229,0.66)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                  {((Date.now()-item.update_current_time)/1000/60/60)>=24?((((Date.now()-item.update_current_time)/1000/60/60/24)).toFixed(2)+'D'):((Date.now()-item.update_current_time)/1000/60/60)>=1?((Date.now()-item.update_current_time)/1000/60/60).toFixed(2)+'H':((Date.now()-item.update_current_time)/1000/60).toFixed(2)+'m'}</span>
                    </span>}
            </td>

            {item.status=="null"&&
                role !== "ROLE_USER"&&item.charge!=0&&<td >
                    <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"rgba(213,143,51,0.97)",marginRight:5,marginBottom:5,color:"white",padding:8}} onClick={clickPartial} className='badge badge-danger'>
                        R
                    </a>
                    <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"rgba(220,13,13,0.97)",marginRight:5,marginBottom:5,color:"white",padding:8}} onClick={clickRefund100} className='badge badge-danger'>
                        R100
                    </a>
                </td>
            }
            {item.status!=null&&
                role !== "ROLE_USER"&&<td >
                    <span style={{color:'white',fontSize:11,backgroundColor:item.status.includes("✔")?"#03d96e":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.status}</span>
                </td>
            }
        </tr>
    )
}

export default OrderItem