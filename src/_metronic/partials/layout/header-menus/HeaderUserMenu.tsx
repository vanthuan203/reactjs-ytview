/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {shallowEqual, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {UserModel} from '../../../../app/modules/auth/models/UserModel'
import {RootState} from '../../../../setup'
import {Languages} from './Languages'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import {useDispatch} from 'react-redux'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
  }
  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/Blank-Avatar.jpg')} />
          </div>
          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              <span className='badge badge-success fw-bolder fs-8 px-2 py-1 ms-2'> {user.role}</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user.username}
            </a>
          </div>
        </div>
      </div>
      <div className='separator my-2'></div>
      <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
         Nạp tiền
        </a>
      </div>
      <div className='separator my-2'></div>
      {/*<div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
        Cài đặt tài khoản
        </Link>
        </div>*/}
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Đăng xuất
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
