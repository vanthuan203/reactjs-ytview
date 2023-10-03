/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { AccountModel ,AccountLimitModel} from 'app/modules/setting/models/Account'

import UserItemLimit from './components/UserItemLimit'
import {actions} from "./redux/AccountRedux";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {ComputerModel} from "../history/models/Account";
import {RootState} from "../../../setup";
import {Input} from "reactstrap";
import {round} from "@popperjs/core/lib/utils/math";
type Props = {
  className: string,
  accounts: AccountLimitModel[]
}

const UserListLimit: React.FC<Props> = ({ className, accounts }) => {

  const dispatch = useDispatch()
  const API_URL = process.env.REACT_APP_API_URL
  const [loading, setLoading] = useState(true)
  const [showEditMulti, setShowEditMulti] = useState(false)
  const [showRestartMulti, setShowRestartMulti] = useState(false)
  const [showAddManual, setShowAddManual] = useState(false)
  const [total_user, settotal_user] = useState(0)
  const [total_user_endtrial, settotal_user_endtrial] = useState(0)
  const [vpstpye, setvpstpye] = useState('')
  const [keytrue, setKeyTrue] = useState(0)
  const [keystatus, setKeyStatus] = useState('')
  const [keystatustrue, setKeyStatusTrue] = useState(0)
  const [key, setKey] = useState("")
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const isShowFixMulti = accounts.find((item) => {
    if (item.checked) {

      return true
    }
    return false
  })
  useEffect(() => {
  },[]);


  return (

    <div className={`card ${className}`}>
      <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-12 col-sm-12 c-order__header">
              <span  className='fw-bolder fs-3 mb-1'>Giới hạn service</span>
            </div>
          </div>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Menu */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-100px'>User</th>
                <th className='min-w-100px'>Service</th>
                <th className='min-w-100px'>MaxOrder</th>
                <th className='min-w-100px'>MaxRunning</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}

            <tbody>
              {
                  accounts&&accounts?.map((item: AccountLimitModel,index:number) => {
                      return <UserItemLimit key={item.id+index} item={item} index={index} />
                    })
              }

            </tbody>
            {/* end::Table body */}
          </table>
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}
export  { UserListLimit }