import React,{useEffect,useState} from 'react'
import {UserList} from './UserList'
import {UserListLimit} from './UserListLimit'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from './redux/AccountRedux'
import {AccountModel,AccountLimitModel} from 'app/modules/setting/models/Account'
import {RootState} from 'setup'
import EditModal  from './modals/EditModal'
import EditLimitModal  from './modals/EditLimitModal'
import {Input} from "reactstrap";
const AccountPage: React.FC = () => {
  const dispatch = useDispatch()
  const [vpstype, setvpstype] = useState('')
  const accounts: AccountModel[] = useSelector<RootState>(({setting}) => setting.accounts, shallowEqual) as AccountModel[] || []
  const currentAccount: AccountModel = useSelector<RootState>(({setting}) => setting.currentAccount, shallowEqual) as AccountModel || undefined
  const accountlimit: AccountLimitModel[] = useSelector<RootState>(({setting}) => setting.accountlimit, shallowEqual) as AccountLimitModel[] || []
  const currentAccountLimit: AccountLimitModel = useSelector<RootState>(({setting}) => setting.currentAccountLimit, shallowEqual) as AccountLimitModel || undefined

  useEffect(() => {
    dispatch(actions.requestAccounts())
    dispatch(actions.requestAccountLimit())
  },[]);

  return (
    <>
      <div className='row gy-5 gx-xl-12'>

        <div className='col-xl-12'>
          <UserList accounts={accounts} className='card-xxl-stretch mb-5 mb-xl-12' />
        </div>
        {
         currentAccount&&<EditModal key={currentAccount?.id} item={currentAccount} />
        }
      </div>
      <div className='row gy-5 gx-xl-12'>

        <div className='col-xl-12'>
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
