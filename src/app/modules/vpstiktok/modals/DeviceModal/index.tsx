import React,{useEffect,useState} from 'react'
import {DeviceList} from 'app/modules/vpstiktok/DeviceList'
import { useDispatch ,useSelector,shallowEqual} from 'react-redux'
import {actions} from 'app/modules/vpstiktok/redux/AccountRedux'
import {DeviceModel} from 'app/modules/vpstiktok/models/Account'
import {RootState} from 'setup'
import EditModal  from 'app/modules/vpstiktok/modals/EditModal'
import {Input} from "reactstrap";


type Props = {
    vps: string
}
const DeviceShow: React.FC<Props> = ({ vps }) => {
    const dispatch = useDispatch()
    const devices: DeviceModel[] = useSelector<RootState>(({vpstiktok}) => vpstiktok.devices, shallowEqual) as DeviceModel[] || []
    const currentDevice: DeviceModel = useSelector<RootState>(({vpstiktok}) => vpstiktok.currentDevice, shallowEqual) as DeviceModel || undefined
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        if(refresh===true){
            dispatch(actions.requestDevicesByVPS(vps))
        }
        setRefresh(false)
    },[refresh]);
    return (
        <>
            <div className='row gy-5 gx-xl-12'>
                <div className='col-xl-12' style={{margin:0}}>
                    <DeviceList devices={devices} className='card-xxl-stretch mb-5 mb-xl-12' />
                </div>
            </div>
        </>
    )
}

export default DeviceShow