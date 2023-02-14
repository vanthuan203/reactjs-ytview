import clsx from 'clsx'
import React, {FC, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search} from '../../../partials'
import {useLayout} from '../../core'
import {UserModel} from "../../../../app/modules/auth/models/UserModel";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import {auto} from "@popperjs/core";

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
  const {config} = useLayout()
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  return (

    <div className='d-flex align-items-stretch flex-lg-shrink-1'>
      {/* begin::User */}
      <div className="align-items-center row" style={{backgroundColor:"#c0e1ce"}}>
        {/* begin::Toggle */}
        <div style={{width:"70%"}}>
            <div className="pl-2 text-left">
                <div style={{color:"#26695c",fontWeight:"bold"}}>{user.username.substring(0,15)}...</div>
                <span style={{color:"#b7080f",fontWeight:"bold"}}  className="font-weight-bold" >{user.role}</span>
                <div style={{color:"#000000",fontWeight:"bold"}} className="font-weight-bold">{format1(user.balance)}đ</div>
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
