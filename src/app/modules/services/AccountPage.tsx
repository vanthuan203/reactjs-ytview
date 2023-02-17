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

  useEffect(() => {
    dispatch(actions.requestAccounts())
  },[]);

  return (
    <>
      <div className='row gy-5 gx-xl-12'>

        <div className='col-xl-12'>
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
