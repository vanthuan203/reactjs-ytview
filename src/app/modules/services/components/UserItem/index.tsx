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
            dispatch(actions.deleteVpsRequest(item.note))
        }
    }
    return (

        <tr>
            <td className='w-25px'>
                <span className='text-muted fw-bold text-muted d-block text-sm'>{index+1}</span>
            </td>

            <td>
                <span >
                    <text style={{fontSize:12,fontWeight:"bold"}}>
                        {item.service}
                    </text>
                            </span>
            </td>
            <td>
                <span className='badge badge-dark' style={{fontSize:11, backgroundColor:"#e5121c"}}>
                    <text >
                    {item.category}
                    </text>
                </span>

            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                      {item.name}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.rate}$
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.min}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.max}
                                </text>
                    </span>
            </td>
            <td >
                    <span style={{fontSize:11}} >
                                <text style={{fontWeight:"bold"}} >
                                        {item.note}
                                </text>
                    </span>
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