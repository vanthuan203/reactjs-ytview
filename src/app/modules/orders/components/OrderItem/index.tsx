import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { OrderModel } from '../../models/Order'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import { getFunciton } from 'utils/ApiHelper'
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




    const dispatch = useDispatch()
    const clickUpdateHandler = () => {
        dispatch(actions.showcurrentOrder(item))
    }
    const clickDeleteHandler = () => {
        if (window.confirm("bạn có chắc chắn muốn xóa đơn của kênh: "+item.channel_title!) == true) {
            dispatch(actions.deleteOrderRequest(item.channel_id))
        }
    }


    //const subNeedRun = item.view_need - (item.current_view - item.start_view)
    //const increase = item.current_view - item.start_view
    return (
        <tr>
            <td className='w-25px'>
                <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt)=>{
                            dispatch(actions.checkedChange({
                                channel_id:item.channel_id,
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
                <span style={{fontWeight:'bold',fontSize:11}} className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>
            <td>

                    <a style={{textDecorationLine:'none',fontSize:11,backgroundColor:"#26695c"}} href={'https://www.youtube.com/channel/' + item.channel_id} className='badge badge-danger'>
                        {item.channel_title}
                    </a>
                    <span style={{ color:'black',margin:5,fontSize:11,backgroundColor:"#c0e1ce"}} className='badge badge-warning'>{Math.round(Number(item.view_need==null?0:item.view_need)/3600)+"/"+item.view_percent}</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-warning'>{Math.round(Number(item.like_rate==null?0:item.like_rate)/3600)}</span>
                    <span style={{ color:'black',margin:5,fontSize:11,backgroundColor:"#c0e1ce"}} className='badge badge-dark'>{item.view_total==null?0:item.view_total}</span>
                    <span style={{ color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-dark'>{item.comment_rate==null?0:item.comment_rate}</span>
                    <span style={{ color:'black',margin:5,fontSize:11,backgroundColor:"#c0e1ce"}} className='badge badge-success'>{Math.round((Math.round(Number(item.view_need==null?0:item.view_need)/3600)/item.view_percent*100))+'%'}</span>
            </td>
            <td className='text-dark fw-bolder text-hover-primary text-sm'>
                {loading ? <span className='text-muted fw-bold text-muted d-block text-sm'>
                    {"Đang lấy dữ liệu"}
                </span> :
                    <span style={{color:'black',fontSize:11,backgroundColor:"#c0e1ce"}} className='badge badge-dark'>{item.total==1?0:item.total}/{item.max_threads} running</span>
                }
            </td>
            <td>
                {
                    item.enabled === 1 ? <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-success'>Đang chạy</span> :item.enabled === 2 ?
                        <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-warning'>Test 1</span>:item.enabled === 3 ?
                        <span style={{color:'white',fontSize:11,backgroundColor:"#26695c"}} className='badge badge-primary'>Test 2</span>:
                            <span style={{color:'white',fontSize:11,backgroundColor:"#af171b"}} className='badge badge-danger'>Ngừng</span>

                }
                {
                    <span style={{color:'black',fontSize:11,margin:5,backgroundColor:"#c0e1ce"}} className='badge badge-primary'>{new Date(item.insert_date).toLocaleDateString('vn-VN')}</span>
                }

            </td>
            {
                 <td >
                    <a href='#' onClick={clickUpdateHandler} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mr-5'>
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a href='#' onClick={clickDeleteHandler} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                    </a>
                </td>
            }

        </tr>
    )
}

export default OrderItem