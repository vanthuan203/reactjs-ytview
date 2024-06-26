import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { AccountModel } from 'app/modules/services/models/Account'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import moment from 'moment'
import {date} from "yup";
import {round} from "@popperjs/core/lib/utils/math";
import {RootState} from "../../../../../setup";
type Props = {
    item: AccountModel,
    index:number
}
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const UserItem : React.FC<Props> = ({ item ,index}) => {
    const dispatch = useDispatch()
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const [loading, setLoading] = useState(false)
    const clickHandler =()=>{
        dispatch(actions.showCurrentAccount(item))
    }
    const clickDeleteHandler = () => {
        if (window.confirm("Bạn chắc chắn muốn xóa service: "+item.service!) == true) {
            dispatch(actions.deleteVpsRequest(item.geo))
        }
    }
    return (

        <tr style={{margin:100}}>
            <td className='w-25px'>
                <span style={{marginLeft:5}} className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>

            <td>
                <span style={{fontSize:11,color:"white",backgroundColor:"#435e57",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.service}</span>
                <span style={{fontSize:11,color:"white",backgroundColor:"rgba(218,30,30,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.category}</span>
                <br/>
                <span style={{fontSize:11,color:"white",backgroundColor:"#b6191a",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.rate}$</span>
                <span style={{ color:item.checktime>0?'white':'black',fontSize:11,backgroundColor:item.checktime>0?"rgba(218,30,30,0.97)":"#c0e1ce",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.mintime}-{item.maxtime} minutes</span>
                <br/>
                <span style={{fontSize:11,color:"white",backgroundColor:"rgba(20,122,178,0.66)",marginRight:5,marginBottom:5}} className='badge badge-success 1' >
                                        {item.min>=1000?format1(item.min/1000)+"K":item.min}-{item.max>=1000?format1(item.max/1000)+"K":item.max}
                    </span>
                <span style={{ color:'white',fontSize:11,backgroundColor:"#435e57",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.type}</span>
            </td>
            <td >
                    <span>
                        {item.suggest>0&&<span style={{ color:'white',fontSize:11,backgroundColor:"#03d96e",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.platform.indexOf("Website")>=0?"Referral":"Suggest"} | <span style={{color:"#ffffff"}}>{item.suggest}%</span></span>}
                        {item.search>0&&<span style={{ color:'black',fontSize:11,backgroundColor:"#c0dee1",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Search | <span style={{color:"black"}}>{item.search}%</span></span>}
                        {item.dtn>0&&<span style={{ color:'black',fontSize:11,backgroundColor:"#f1b65f",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Browse features | <span style={{color:"#000000"}}>{item.dtn}%</span></span>}
                        {item.direct>0&&<span style={{ color:'white',fontSize:11,backgroundColor:"#6d7773",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Direct | <span style={{color:"#ffffff"}}>{item.direct}%</span></span>}
                        {item.embed>0&&<span style={{ color:'white',fontSize:11,backgroundColor:"#af171b",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Embed | <span style={{color:"#ffffff"}}>{item.embed}%</span></span>}
                        {item.external>0&&<span style={{ color:'white',fontSize:11,backgroundColor:"rgb(68,134,94)",marginRight:5,marginBottom:5}} className='badge badge-success 1'> {item.platform.indexOf("Website")>=0?"Social":"External"} | {item.external}%</span>}
                        {item.platform.indexOf("Website")>=0&&<span style={{ color:'white',fontSize:11,backgroundColor:"rgba(218,30,30,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>CTR | {item.click_web}%</span>}
                        {item.platform.indexOf("Website")>=0&&<span style={{ color:'white',fontSize:11,backgroundColor:"rgba(220,133,18,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Package | {item.expired} day</span>}
                        {item.niche==1&&<span style={{ color:'white',fontSize:11,backgroundColor:"rgba(34,126,231,0.97)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>Topic Videos</span>}
                    <br/>
                    <span style={{fontSize:10.5,fontWeight:"bold"}}>{item.name}</span>
                </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.maxorder}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.thread}
                                </text>
                    </span>
            </td>
            <td >
                                   <span >
                    {item.geo.indexOf('us')>=0?<img style={{width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/flags/united-states.svg')} alt='metronic' />:item.geo.indexOf('vn')>=0?
                        <img style={{width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/flags/vietnam.svg')} alt='metronic' />:item.geo.indexOf('kr')>=0?
                            <img style={{width:20,height:20,borderImage:"-moz-initial"}} src={toAbsoluteUrl('/media/flags/south-korea.svg')} alt='metronic' />:
                            <span style={{fontSize:11,color:"white",backgroundColor:"rgb(9,9,9)",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.geo.toUpperCase()}</span>}
                </span>
            </td>
            <td >
                <span style={{fontSize:11,color:"white",backgroundColor:item.enabled===1?"#b7080f":"#9ca1a0",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.enabled===1 ?"ON":"OFF"}</span>
            </td>
            <td >
                <span style={{fontSize:11,color:"white",backgroundColor:item.refill===1?"#00b65c":"#9ca1a0",marginRight:5,marginBottom:5}} className='badge badge-success 1'>{item.refill===1?(item.maxtimerefill==-1?"Lifetime":item.maxtimerefill+" days Refill"):"No Refill"}</span>
            </td>
            {role=="ROLE_ADMIN"&&<td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        onClick={()=>clickHandler()}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                        <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </button>
                </div>
            </td>}
        </tr>
    )
}

export default UserItem