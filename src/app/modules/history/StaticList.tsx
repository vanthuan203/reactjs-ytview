/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {ChannelStaticModel, HistoryModel} from 'app/modules/history/models/Account'
import ChannelStaticItem from './components/ChannelStaticItem'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { actions } from './redux/AccountRedux'
import { RootState } from 'setup'
import HistoryItem from "./components/HistoryItem";
type Props = {
  className: string,
}

const StaticList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  const API_URL = process.env.REACT_APP_API_URL
  const [loading, setLoading] = useState(true)
  let [useEff, setuseEff] = useState(0)
  const [totaltimeorder, setTotalTimeOrder] = useState(0)
  const [totaltimebuffedorder, setTotalTimeBuffedOrder] = useState(0)
  const bonus: number = useSelector<RootState>(({ auth }) => auth.user?.bonus, shallowEqual) as number || 0
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const user: string =
      (useSelector<RootState>(({auth}) => auth.user?.username, shallowEqual) as string) || ''
  const statics:HistoryModel[] = useSelector<RootState>(({ histories }) => histories.statics, shallowEqual) as HistoryModel[] || []

  async function getcounttimeorder(){
    let requestUrl=""
    if(role.indexOf("ROLE_ADMIN")>=0){
      requestUrl = API_URL+'videoview/getcountviewbufforder';
    }else{
      requestUrl = API_URL+'videoview/getcountviewbufforder?user='+user;
    }

    const response= await fetch(requestUrl,{
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson= await  response.json();
    const {totalvieworder}=responseJson;
    setTotalTimeOrder(totalvieworder);
  }

  async function getcounttimebuffedorder(){
    let requestUrl=""
    if(role.indexOf("ROLE_ADMIN")>=0){
      requestUrl = API_URL+'videoview/getcountviewbuffedorder';
    }else{
      requestUrl = API_URL+'videoview/getcountviewbuffedorder?user='+user;
    }
    const response= await fetch(requestUrl,{
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson= await  response.json();
    const {totalviewbuffedorder}=responseJson;
    setTotalTimeBuffedOrder(totalviewbuffedorder);
  }
async function getbyday(){
  if(role.indexOf("ROLE_ADMIN")>=0){
    await dispatch(actions.requestStatics(''))
  }else{
    await dispatch(actions.requestStatics(user))
  }
}
  useEffect(() => {
    setLoading(true)
    useEff=useEff+1
    setuseEff(useEff)
    if(useEff<=1){
      getbyday()
      getcounttimebuffedorder();
      getcounttimeorder();
    }
    if(statics.length>0){
      setLoading(false)
    }
  }, [statics])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-8 col-sm-12 c-order__header">
              <span  className='fw-bolder fs-3 mb-1'>Thống kê</span>
              <p className="fw-bold c-order__list">
                {console.log(totaltimeorder)}
                <span style={{fontSize:12,marginTop:5}}>Tổng đặt: {format1((totaltimeorder==null?0:totaltimeorder))} | Đã chạy: {format1(totaltimebuffedorder==null?0:totaltimebuffedorder)} | Còn tồn: {format1(totaltimeorder-totaltimebuffedorder)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='min-w-30px' style={{fontWeight:"bold",fontSize:12}}>#</th>
                <th className='min-w-100px'  style={{fontWeight:"bold",fontSize:12}}>Date</th>
                <th className='min-w-100px'  style={{fontWeight:"bold",fontSize:12}}>View buff </th>

              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {
                statics&&statics?.map((item: HistoryModel,index:number) => {
                  return <HistoryItem key={+index} item={item} index={index}/>
                })
              }

            </tbody>
            {/* end::Table body */}
          </table>
          {loading===true&&<div style={{width:'1%',margin:"auto"}}>
            <div  className="spinner-grow text-success" role="status" style={{}}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export { StaticList }
