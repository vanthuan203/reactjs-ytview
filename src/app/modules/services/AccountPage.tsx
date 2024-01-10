import React,{useEffect,useState} from 'react'
import {UserList} from './UserList'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from './redux/AccountRedux'
import {AccountModel} from 'app/modules/services/models/Account'
import {RootState} from 'setup'
import EditModal  from './modals/EditModal'
import {Input} from "reactstrap";
const AccountPage: React.FC = () => {
  const dispatch = useDispatch()
  const [vpstype, setvpstype] = useState('')
  const accounts: AccountModel[] = useSelector<RootState>(({services}) => services.accounts, shallowEqual) as AccountModel[] || []
  const currentAccount: AccountModel = useSelector<RootState>(({services}) => services.currentAccount, shallowEqual) as AccountModel || undefined
  const [refresh, setRefresh] = useState(true)
  useEffect(() => {
    if(refresh==true){
      dispatch(actions.requestAccounts())
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
          <UserList accounts={accounts} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
         currentAccount&&<EditModal key={currentAccount?.service} item={currentAccount} />
        }
      </div>
    </>
  )
}
export default AccountPage
