import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModelCmt } from '../../models/Order'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
import {RootState} from "../../../../../setup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: OrderModelCmt,
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
    const clickUpdateHandler = () => {
        if (window.confirm("Bạn có chắc chắn muốn refund orderId "+item.orderid!
        ) == true) {
            dispatch(actions.requestUpdateCmt(item.orderid.toString()))
        }
    }
    const clickDeleteHandler = () => {
        if (window.confirm("bạn có chắc chắn muốn xóa đơn : "+item.videoid!) == true) {
            dispatch(actions.deleteOrderRequest(item.videoid))
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
                            dispatch(actions.checkedChangeCmt({
                                orderid:item.orderid,
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
                <span style={{marginLeft:5}} className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>
            <td>
                <span style={{ color:'white',fontSize:11,backgroundColor:item.service>1000?"rgba(3,37,80,0.97)":(item.service<600?"rgba(34,126,231,0.97)":"#b7080f"),marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.orderid}</span>
            </td>
            <td>

                <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.youtube.com/watch?v=' + item.videoid} className='badge badge-danger'>
                    {item.videoid}
                </a>
                <span>
                  <span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"rgba(241,133,133,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"rgb(9,9,9)"}}>{item.price==null?0:item.price.toPrecision()}</span>$</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Order <span style={{color:"#ffffff"}}>{item.commentorder}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Start <span style={{color:"black"}}>{item.commentstart}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Total <span style={{color:"#000000"}}>{item.commenttotal==null?0:item.commenttotal}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:Math.round((Math.round(Number(item.commenttotal==null?0:item.commenttotal))/item.commentorder*100))>=100?"rgba(234,100,100,0.97)":"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#fafafa"}}>{Math.round((Math.round(Number(item.commenttotal==null?0:item.commenttotal))/item.commentorder*100))+'%'}</span></span>
                    <br/>
                </span>
                </span>
            </td>
            <td >
                {//{item.service<600?<img style={{width:20,height:20,marginRight:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:
                    //   <img style={{width:20,height:20,marginRight:5,borderImage:"-moz-initial",float:"left",borderRadius:3}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />}
                }
                <span style={{color:'white',fontSize:11,backgroundColor:item.service>1000?"rgba(3,37,80,0.97)":(item.service<600?"rgba(34,126,231,0.97)":"#b7080f")}} className='badge badge-success'>
                    {item.service}</span>
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.insertdate).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>
                }
            </td>
            <td>
                {
                    item.cancel === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e"}} className='badge badge-success'>D</span> :
                        item.cancel === 2 ? <span style={{color:'white',fontSize:11,backgroundColor:"#dc7a30"}} className='badge badge-success'>P</span> :
                            <span style={{color:'white',fontSize:11,backgroundColor:"#b7080f"}} className='badge badge-danger'>C</span>

                }
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,margin:5}} >{new Date(item.enddate).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.enddate).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            {role!="ROLE_USER"&&<td>
                <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.user.replace("@gmail.com","")}</span>
            </td>}
            <td>
                <span style={{color:'black',fontSize:11,fontWeight:'bold'}} >{item.note}</span>
            </td>
            {
                role === "ROLE_ADMIN"&&item.price!=0&&<td >
                    <a href='#' onClick={clickUpdateHandler} style={{color:'white',backgroundColor:'rgba(220,13,13,0.97)'}} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mr-5'>
                        R
                    </a>
                </td>
            }
        </tr>
    )
}

export default OrderItem