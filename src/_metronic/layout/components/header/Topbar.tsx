import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search} from '../../../partials'
import {useLayout} from '../../core'
import {UserModel} from "../../../../app/modules/auth/models/UserModel";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import {auto} from "@popperjs/core";
const API_URL = process.env.REACT_APP_API_URL
let total_user=0
const toolbarButtonMarginClass = 'ms-2 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const Topbar: FC = () => {
    const [toggle, setToggle] = useState(false)
    let [total_user, settotal_user] = useState("")
    let [useEff, setuseEff] = useState(0)
    async function getcounts(){
        settotal_user("")
        const requestUrl = API_URL+'auth/balanceNow';
        const response= await fetch(requestUrl,{
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson= await  response.json();
        const {balance}=responseJson;
        settotal_user(balance)
    }
    useEffect(() => {
        useEff=useEff+1
        setuseEff(useEff)
        if(useEff<=1){
            getcounts()
        }
    }, []);
  const {config} = useLayout()
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  return (

    <div className='d-flex align-items-stretch flex-lg-shrink-1'>
      {/* begin::User */}
        {user.role==='ROLE_ADMIN'&&<div className="align-items-center row" style={{backgroundColor:"#9de3bb",marginRight:15}}>
            <div style={{width:"100%", margin: auto}}>
                <div className="pl-0 text-left">
                    <button
                            onClick={() => {getcounts()
                            }}
                            className='btn btn-sm'
                    >
                        <div style={{color:"rgba(34,126,231,0.97)",fontWeight:"bold",textAlign:"center",marginBottom:5}} className="font-weight-bold">
                            <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"rgba(218,30,30,0.97)"}}>{total_user!=""?total_user.split(",")[0]:"Loading..."}</span>
                        </div>
                        <div style={{color:"rgba(34,126,231,0.97)",fontWeight:"bold",textAlign:"center"}} className="font-weight-bold">
                            <span className='badge badge-success 1' style={{fontSize:11,color:"#fcfcfc",backgroundColor:"rgba(34,126,231,0.97)"}}>{total_user!=""?total_user.split(",")[1]:"Loading..."}</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>}
      <div className="align-items-center row" style={{backgroundColor:"#c0e1ce"}}>
        {/* begin::Toggle */}
        <div style={{width:"70%"}}>
            <div className="pl-2 text-left">
                <div style={{color:"#26695c",fontWeight:"bold"}}>{user.username.substring(0,15)}...</div>
                <span style={{color:"#b7080f",fontWeight:"bold"}}  className="font-weight-bold" >{user.role}</span>
                <div style={{color:"#000000",fontWeight:"bold"}} className="font-weight-bold">{user.balance.toPrecision()}$</div>
            </div>
        </div>

          <div style={{width:"30%"}}
               data-kt-menu-trigger='click'
               data-kt-menu-attach='parent'
               data-kt-menu-placement='bottom-end'
               data-kt-menu-flip='bottom'
          >
              <button className="d-block p-0 avatar-icon-wrapper">
                  <div className="avatar-icon avatar-icon--custom">
                      <img style={{width:40,height:40,borderImage:"-moz-initial",borderRadius:"50%"}} src={toAbsoluteUrl('/media/avatars/Blank-Avatar.jpg')} alt='metronic' />
                  </div>
              </button>
          </div>

        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
    </div>
  )
}

export {Topbar}
