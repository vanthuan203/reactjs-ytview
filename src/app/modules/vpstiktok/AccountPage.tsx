import React,{useEffect,useState} from 'react'
import {UserList} from './UserList'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from './redux/AccountRedux'
import {AccountModel} from 'app/modules/vpstiktok/models/Account'
import {RootState} from 'setup'
import EditModal  from './modals/EditModal'
import DeviceModal  from './modals/DeviceModal'
import {Input} from "reactstrap";
import DeviceShow from "./modals/DeviceModal";
const AccountPage: React.FC = () => {
  const dispatch = useDispatch()
  const [vpstype, setvpstype] = useState('')
  const accounts: AccountModel[] = useSelector<RootState>(({vpstiktok}) => vpstiktok.accounts, shallowEqual) as AccountModel[] || []
  const currentAccount: AccountModel = useSelector<RootState>(({vpstiktok}) => vpstiktok.currentAccount, shallowEqual) as AccountModel || undefined
  const currentEditAccount: AccountModel = useSelector<RootState>(({vpstiktok}) => vpstiktok.currentEditAccount, shallowEqual) as AccountModel || undefined
    const [refresh, setRefresh] = useState(true)
 let vps=currentAccount?.vps
  useEffect(() => {
      if(refresh===true){
          dispatch(actions.requestAccounts())
          vps=currentAccount?.vps
      }
    setRefresh(false)
  },[refresh]);


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
            <UserList accounts={vpstype.length==0?accounts:(accounts.filter(vps=>vps.vps.search(vpstype)!=-1))} className='card-xxl-stretch mb-5 mb-xl-12' />
          </div>
              {
                  currentAccount&&<DeviceShow  key={currentAccount?.vps} vps={currentAccount?.vps} />
            }
            {
                currentEditAccount&&<EditModal key={currentEditAccount?.vps} item={currentEditAccount} />
            }

        </div>

      </>
  )
}
export default AccountPage