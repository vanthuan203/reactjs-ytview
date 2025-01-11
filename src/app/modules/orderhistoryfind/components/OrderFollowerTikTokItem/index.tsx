import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModelFollower } from '../../models/Order'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
import {RootState} from "../../../../../setup";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
    item: OrderModelFollower,
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

    const clickUpdateHandler1 = () => {
        if (window.confirm("Bạn có chắc chắn muốn refund cho orderId "+item.orderid!
        ) == true) {
            dispatch(actions.requestUpdateFollower(item.orderid.toString()))
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
                            dispatch(actions.checkedChangeFollower({
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
                <br/>
                {item.info.length>0&&<span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.info.split(',')[0]}</span>}
            </td>
            <td>

                <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.tiktok.com/' + item.tiktok_id} className='badge badge-danger'>
                    {item.tiktok_id}
                </a>
                <span>
                  <span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"rgba(241,133,133,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"rgb(9,9,9)"}}>{item.price==null?0:item.price.toPrecision()}</span>$</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#ffffff"}}>{item.follower_order}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"black"}}>{item.follower_start}</span></span>
                    <span style={{ color:'black',fontSize:11,backgroundColor:"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#000000"}}>{item.follower_total==null?0:item.follower_total}</span></span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:Math.round((Math.round(Number(item.follower_total==null?0:item.follower_total))/item.follower_order*100))>=100?"rgba(234,100,100,0.97)":"#26695c",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"#fafafa"}}>{Math.round((Math.round(Number(item.follower_total==null?0:item.follower_total))/item.follower_order*100))+'%'}</span></span>
                    <span style={{color:'white',fontSize:11,backgroundColor:item.time_start!=0?"#03d96e":"rgba(218,30,30,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                        {item.time_start!=0?(((item.end_date-item.time_start)/1000/60/60)>=24?((((item.end_date-item.time_start)/1000/60/60/24)).toFixed(2)+'D'):((item.end_date-item.time_start)/1000/60/60)>=1?((item.end_date-item.time_start)/1000/60/60).toFixed(2)+'H':((item.end_date-item.time_start)/1000/60).toFixed(0)+'m'):'C'}</span>
                    <br/>
                      {item.info.length>0&&<span>
                      <a target="_blank" style={{textDecorationLine:'none',fontWeight:'normal',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.tiktok.com/' + item.tiktok_id} className='badge badge-danger'>
                        Previous Order
                      </a>
                      <span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"white"}}>{parseFloat(item.info.split(',')[2])==null?0:parseFloat(item.info.split(',')[2]).toPrecision()}</span>$</span>
                      <span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"white"}}>{item.info.split(',')[3]}</span></span>
                      <span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"white"}}>{item.info.split(',')[4]}</span></span>
                      <span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"white"}}>{item.info.split(',')[5]}</span></span>
                      <span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'><span style={{color:"white"}}>{Math.round((Math.round(Number(parseInt(item.info.split(',')[5])==null?0:parseInt(item.info.split(',')[5])))/parseInt(item.info.split(',')[3])*100))+'%'}</span></span>
                      </span>
                      }
                </span>
                </span>
            </td>
            <td >
                <span style={{color:'white',fontSize:11,backgroundColor:item.service>1000?"rgba(3,37,80,0.97)":(item.service<600?"rgba(34,126,231,0.97)":"#b7080f"),marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.service}</span>

                    <span style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.insert_date).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(item.insert_date).toLocaleTimeString('vn-VN')}</span>

                <br/>
                {item.info.length>0&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.info.split(',')[6]}</span>}

                {item.info.length>0&&<span style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(parseFloat(item.info.split(',')[7])).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(parseFloat(item.info.split(',')[7])).toLocaleTimeString('vn-VN')}</span>}

            </td>
            <td >
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.time_start!=0?(new Date(item.time_start).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(item.time_start).toLocaleTimeString('vn-VN')):""}</span>
                }
                <br/>
                {
                    item.info.length>0&&<span className='badge badge-success' style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{parseFloat(item.info.split(',')[8])!=0?(new Date(parseFloat(item.info.split(',')[8])).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(parseFloat(item.info.split(',')[8])).toLocaleTimeString('vn-VN')):""}</span>
                }
            </td>
            <td>
                {
                    item.cancel === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>D</span> :
                        item.cancel === 2 ? <span style={{color:'white',fontSize:11,backgroundColor:"#dc7a30",marginRight:5,marginBottom:5}} className='badge badge-success'>P</span> :
                            <span style={{color:'white',fontSize:11,backgroundColor:"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-danger'>C</span>

                }
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.end_date).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(item.end_date).toLocaleTimeString('vn-VN')}</span>
                }
                <br/>
                { item.info.length>0&&
                   parseInt(item.info.split(',')[9]) === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success'>D</span> :
                    item.info.length>0&&parseInt(item.info.split(',')[9]) === 2 ? <span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success'>P</span> :
                        item.info.length>0&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-danger'>C</span>

                }
                {
                    item.info.length>0&&<span style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(parseFloat(item.info.split(',')[10])).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(parseFloat(item.info.split(',')[10])).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            <td >
                {(item.follower_end>-1&&item.follower_end!=null)&&<span style={{color:'white',fontSize:11,backgroundColor:item.follower_end>=(item.follower_start+item.follower_total)?"rgba(16,128,201,0.66)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.follower_end}</span>}
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{item.time_check_refill>0?(new Date(item.time_check_refill).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(item.time_check_refill).toLocaleTimeString('vn-VN')):""}</span>
                }
                <br/>
                {(parseInt(item.info.split(',')[12])>-1&&parseInt(item.info.split(',')[12])!=null)&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)"}} className='badge badge-success'>
                    {parseInt(item.info.split(',')[12])}</span>}
                {
                    <span style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,margin:5}} >{parseFloat(item.info.split(',')[11])>0?(new Date(parseFloat(item.info.split(',')[11])).toLocaleDateString('vn-VN').replace("/2025","") +" "+ new Date(parseFloat(item.info.split(',')[11])).toLocaleTimeString('vn-VN')):""}</span>
                }
            </td>
            {role!="ROLE_USER"&&<td>
                <span className='badge badge-success' style={{color:'black',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.user.replace("@gmail.com","")}</span>
                <br/>
                {item.info.length>0&&<span className='badge badge-success' style={{color:'rgba(9,9,9,0.58)',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.info.split(',')[13].replace("@gmail.com","")}</span>}
            </td>}
            <td>
                <span className='badge badge-success' style={{overflow:"hidden",maxWidth:100,color:'black',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.note}</span>
                <br/>
                {item.info.length>0&&<span className='badge badge-success' style={{overflow:"hidden",maxWidth:100,color:'rgba(9,9,9,0.58)',fontSize:11,fontWeight:'bold',marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.info.split(',')[14]}</span>}
            </td>

            {item.status==null&&
                role === "ROLE_ADMIN"&&item.price!=0&&<td >
                    <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"rgba(213,143,51,0.97)",marginRight:5,marginBottom:5,color:"white",padding:8}} onClick={clickUpdateHandler1} className='badge badge-danger'>
                        R
                    </a>
                </td>
            }
            {item.status!=null&&
                role === "ROLE_ADMIN"&&<td >
                    <span style={{color:'white',fontSize:11,backgroundColor:item.status.includes("Đã")?"#03d96e":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.status}</span>
                </td>
            }
        </tr>
    )
}

export default OrderItem