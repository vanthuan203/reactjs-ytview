import React,{useEffect,useState} from 'react'
import {UserList} from './UserList'
import {UserListLimit} from './UserListLimit'
import {ProxySettingList} from './ProxySettingList'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from './redux/AccountRedux'
import {AccountModel,AccountLimitModel,ProxySettingModel} from 'app/modules/setting/models/Account'
import {RootState} from 'setup'
import EditModal  from './modals/EditModal'
import EditLimitModal  from './modals/EditLimitModal'
import EditProxyModal  from './modals/EditProxyModal'
import {Input} from "reactstrap";
const AccountPage: React.FC = () => {
  const dispatch = useDispatch()
  const [vpstype, setvpstype] = useState('')
  const accounts: AccountModel[] = useSelector<RootState>(({setting}) => setting.accounts, shallowEqual) as AccountModel[] || []
  const currentAccount: AccountModel = useSelector<RootState>(({setting}) => setting.currentAccount, shallowEqual) as AccountModel || undefined
  const accountlimit: AccountLimitModel[] = useSelector<RootState>(({setting}) => setting.accountlimit, shallowEqual) as AccountLimitModel[] || []
  const proxysetting: ProxySettingModel[] = useSelector<RootState>(({setting}) => setting.proxysetting, shallowEqual) as ProxySettingModel[] || []
  const currentAccountLimit: AccountLimitModel = useSelector<RootState>(({setting}) => setting.currentAccountLimit, shallowEqual) as AccountLimitModel || undefined
  const currentProxySetting: ProxySettingModel = useSelector<RootState>(({setting}) => setting.currentProxySetting, shallowEqual) as ProxySettingModel || undefined
  const [refresh, setRefresh] = useState(true)
  const [refresh1, setRefresh1] = useState(true)
  const [refresh2, setRefresh2] = useState(true)
  useEffect(() => {
    if(refresh===true){
      dispatch(actions.requestAccounts())
    }
    if(refresh1===true){
      dispatch(actions.requestAccountLimit())
    }
    if(refresh2===true){
      dispatch(actions.requestProxySetting())
    }
    setRefresh(false)
    setRefresh1(false)
    setRefresh2(false)
  },[refresh,refresh1,refresh2]);

  return (
    <>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12' style={{margin:0}}>
          <a style={{float:"right"}} href='#' onClick={() => {
            setRefresh(true)
          }} >
            <img style={{width:32,height:32}} src='/media/dowload/refresh-cw-alt-1-svgrepo-com.svg' className='svg-icon-6' />
          </a>
        </div>
        <div className='col-xl-12' style={{margin:0}}>
          <UserList accounts={accounts} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
         currentAccount&&<EditModal key={currentAccount?.id} item={currentAccount} />
        }
      </div>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12' style={{margin:0}}>
          <a style={{float:"right"}} href='#' onClick={() => {
            setRefresh2(true)
          }} >
            <img style={{width:32,height:32}} src='/media/dowload/refresh-cw-alt-1-svgrepo-com.svg' className='svg-icon-6' />
          </a>
        </div>
        <div className='col-xl-12' style={{margin:0}}>
          <ProxySettingList accounts={proxysetting} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
            currentProxySetting&&<EditProxyModal key={currentProxySetting?.id} item={currentProxySetting} />
        }
      </div>
      <div className='row gy-5 gx-xl-12'>
        <div className='col-xl-12' style={{marginTop:10}}>
          <a style={{float:"right"}} href='#' onClick={() => {
            setRefresh1(true)
          }} >
            <img style={{width:32,height:32}} src='/media/dowload/refresh-cw-alt-1-svgrepo-com.svg' className='svg-icon-6' />
          </a>
        </div>
        <div className='col-xl-12' style={{margin:0}}>
          <UserListLimit accounts={accountlimit} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
            currentAccountLimit&&<EditLimitModal key={currentAccountLimit?.id} item={currentAccountLimit} />
        }
      </div>
    </>
  )
}
export default AccountPage
