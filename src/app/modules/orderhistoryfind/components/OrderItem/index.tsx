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
    const clickUpdateHandler0 = () => {
        if (window.confirm("Bạn có chắc chắn muốn refund 100% cho orderId "+item.orderid!
        ) == true) {
            dispatch(actions.requestUpdate(item.orderid.toString(),0,1))
        }
    }
    const clickUpdateHandler1 = () => {
        if (window.confirm("Bạn có chắc chắn muốn refund phần thiếu cho orderId "+item.orderid!
        ) == true) {
            dispatch(actions.requestUpdate(item.orderid.toString(),1,1))
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
                            dispatch(actions.checkedChange({
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
                <span style={{ color:'white',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.orderid}</span>
                <br/>
                {item.info.length>0&&<span style={{ color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.info.split(',')[0]}</span>}
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
                      {item.info.length>0&&<span>
                      <a target="_blank" style={{textDecorationLine:'none',fontWeight:'normal',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5,color:"white",}} href={'https://www.youtube.com/watch?v=' + item.videoid} className='badge badge-danger'>
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
                <span style={{color:'white',fontSize:11,backgroundColor:item.service<600?"rgba(34,126,231,0.97)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.service}</span>

                    <span style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.insertdate).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.insertdate).toLocaleTimeString('vn-VN')}</span>

                <br/>
                {item.info.length>0&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.info.split(',')[6]}</span>}

                {item.info.length>0&&<span style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(parseFloat(item.info.split(',')[7])).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(parseFloat(item.info.split(',')[7])).toLocaleTimeString('vn-VN')}</span>}

            </td>
            <td >
                {
                    <span className='badge badge-success' style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{item.timestart!=0?(new Date(item.timestart).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.timestart).toLocaleTimeString('vn-VN')):""}</span>
                }
                <br/>
                {
                    item.info.length>0&&<span className='badge badge-success' style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5,backgroundColor:"white"}} >{parseFloat(item.info.split(',')[8])!=0?(new Date(parseFloat(item.info.split(',')[8])).toLocaleDateString('vn-VN').replace("/2023","") +" "+ new Date(parseFloat(item.info.split(',')[8])).toLocaleTimeString('vn-VN')):""}</span>
                }
            </td>
            <td>
                {
                    item.cancel === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>D</span> :
                        item.cancel === 2 ? <span style={{color:'white',fontSize:11,backgroundColor:"#dc7a30",marginRight:5,marginBottom:5}} className='badge badge-success'>P</span> :
                            <span style={{color:'white',fontSize:11,backgroundColor:"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-danger'>C</span>

                }
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(item.enddate).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.enddate).toLocaleTimeString('vn-VN')}</span>
                }
                <br/>
                { item.info.length>0&&
                   parseInt(item.info.split(',')[9]) === 0 ? <span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success'>D</span> :
                    item.info.length>0&&parseInt(item.info.split(',')[9]) === 2 ? <span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-success'>P</span> :
                        item.info.length>0&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)",marginRight:5,marginBottom:5}} className='badge badge-danger'>C</span>

                }
                {
                    item.info.length>0&&<span style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{new Date(parseFloat(item.info.split(',')[10])).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(parseFloat(item.info.split(',')[10])).toLocaleTimeString('vn-VN')}</span>
                }

            </td>
            <td >
                {(item.viewend>-1&&item.viewend!=null)&&<span style={{color:'white',fontSize:11,backgroundColor:item.viewend>=(item.vieworder)?"rgba(16,128,201,0.66)":"#b7080f",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.viewend}</span>}
                {
                    <span style={{color:'black',fontWeight:"bold",fontSize:11,marginRight:5,marginBottom:5}} >{item.timecheckbh>0?(new Date(item.timecheckbh).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(item.timecheckbh).toLocaleTimeString('vn-VN')):""}</span>
                }
                <br/>
                {(parseInt(item.info.split(',')[12])>-1&&parseInt(item.info.split(',')[12])!=null)&&<span style={{color:'white',fontSize:11,backgroundColor:"rgba(105,101,101,0.6)"}} className='badge badge-success'>
                    {parseInt(item.info.split(',')[12])}</span>}
                {
                    <span style={{color:'rgba(9,9,9,0.58)',fontWeight:"bold",fontSize:11,margin:5}} >{parseFloat(item.info.split(',')[11])>0?(new Date(parseFloat(item.info.split(',')[11])).toLocaleDateString('vn-VN').replace("/2024","") +" "+ new Date(parseFloat(item.info.split(',')[11])).toLocaleTimeString('vn-VN')):""}</span>
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
                    <a target="_blank" style={{textDecorationLine:'none',fontSize:11,backgroundColor:"rgba(220,13,13,0.97)",marginRight:5,marginBottom:5,color:"white",padding:8}} onClick={clickUpdateHandler0} className='badge badge-danger'>
                        R100
                    </a>
                </td>
            }
            {item.status!=null&&
                role === "ROLE_ADMIN"&&<td >
                    <span style={{color:'white',fontSize:11,backgroundColor:item.status.includes("No")?"#b7080f":"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success'>
                    {item.status}</span>
                </td>
            }
        </tr>
    )
}

export default OrderItem