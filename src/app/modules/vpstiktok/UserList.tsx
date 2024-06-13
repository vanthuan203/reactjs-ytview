/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { AccountModel } from 'app/modules/vpstiktok/models/Account'

import UserItem from './components/UserItem'
import {actions} from "./redux/AccountRedux";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {ComputerModel} from "../history/models/Account";
import {RootState} from "../../../setup";
import EditMulti from "./modals/EditMulti";
import RestartMulti from "./modals/RestartMulti";
import {Input} from "reactstrap";
import {round} from "@popperjs/core/lib/utils/math";
import {randomInt} from "crypto";
type Props = {
  className: string,
  accounts: AccountModel[]
}

const UserList: React.FC<Props> = ({ className, accounts }) => {

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
  const [statusVNTrue, setstatusVNTrue] = useState(0)
  const [Checked, setChecked] = useState(false)
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const [list_vps,setList_VPS]=useState([{
    id:0,
    vps:"",
  },])
  let [useEff, setuseEff] = useState(0)


  var icount=0;
  const isShowFixMulti = accounts.find((item) => {

    if (item.checked) {
      icount=icount+1
    }
    if(icount>=2){
      return true
    }
    return false
  })
  let total_acc=0;
  let total_acc_live=0;
  let total_acc_follower=0;
  let total_tool_warning=0;
  let [totalvps, setTotalVps] = useState(0)
  let [totaldvpsshow, setTotalVpsShow] = useState(0)
  for(let i=0;i<accounts.length;i++){
    if(((Date.now()-accounts[i].timegettask)/1000/60)>30&&accounts[i].timegettask!=0){
      total_tool_warning=total_tool_warning+1;
    }
    total_acc=total_acc+accounts[i].acccount;
    total_acc_live=total_acc_live+accounts[i].acccountlive;
    total_acc_follower=total_acc_follower+accounts[i].follower;
  }
  async function getcounts(){
    const requestUrl = API_URL+'sub/countgmailslive';
    const response= await fetch(requestUrl,{
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson= await  response.json();
    const {counts}=responseJson;
    settotal_user(counts);
  }
  async function getcountsbyendtrial(){
    const requestUrl = API_URL+'sub/sumgmails';
    const response= await fetch(requestUrl,{
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson= await  response.json();
    const {counts}=responseJson;
    settotal_user_endtrial(counts);
  }

  useEffect(() => {
    setLoading(true)
    if(accounts.length!=0){
      setLoading(false)
    }
    setList_VPS([])
    useEff=useEff+1
    setuseEff(useEff)
    totaldvpsshow=totalvps
    setTotalVpsShow(totaldvpsshow)
    setTotalVps(0)
    if(useEff<=1){
      getcountsbyendtrial();
      getcounts();
    }

  },[keytrue,key,keystatus,vpstpye,accounts.length,,]);

  const clickDeleteHandler = () => {
    const arr:string[]=[]
    accounts.forEach(item=>{
      const myElem = list_vps.find(value => value.vps===item.vps)
      if(myElem && item.checked){
        arr.push(item.vps)
      }
    })
    const vps=arr.join(',')
    if (window.confirm("Bạn chắc chắn muốn xóa "+arr.length+" VPS!") == true) {
      dispatch(actions.deleteVpsRequest(vps))
    }
    setChecked(false)
    dispatch(actions.checkedAllChange(false))
  }

  return (

    <div className={`card ${className}`}>
      <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-8 col-sm-12 c-order__header">
              <span  className='fw-bolder fs-3 mb-1'>{totaldvpsshow} vps </span>
              <span className='badge badge-warning' style={{ color:'white',margin:4,backgroundColor:"rgba(220,133,18,0.97)"}}>Warning {total_tool_warning}</span>
              <span className='badge badge-secondary' style={{ color:'white',margin:4,backgroundColor:"rgba(187,11,11,0.97)"}}>Users {total_acc}</span>
              <span className='badge badge-secondary' style={{ color:'black',margin:4,backgroundColor:"#ffffff"}}>Live {total_acc_live} </span>
              <span className='badge badge-danger' style={{ color:'white',margin:4,backgroundColor:"#4d4c4b"}}>Die {total_acc-total_acc_live} </span>
              <span className='badge badge-danger' style={{ color:'white',margin:4,backgroundColor:"rgba(20,122,178,0.66)"}}>Follower {total_acc_follower} </span>
            </div>
          </div>
        </div>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-7 col-sm-12 c-order__header">
              {isShowFixMulti && (
                  <div>
                    <button style={{margin:5}}
                            onClick={() => {
                              setShowEditMulti(true)
                            }}
                            className='btn btn-light'>
                      Chỉnh sửa
                    </button>

                    <button style={{margin:5}}
                            onClick={() => {
                              setShowRestartMulti(true)
                            }}
                            className='btn btn-light'>
                      Restart
                    </button>

                    <button style={{margin:5}}
                            onClick={()=>clickDeleteHandler()}
                            className='btn btn-light'>
                      Xóa VPS
                    </button>
                  </div>

              )}
            </div>
          </div>
        </div>
        <div className="page-header__content">
          <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
            <div style={{width:"60%"}}>
              <div>
                <Input style={{margin:10,width:"48%",maxWidth:130,minWidth:60,height:40,float:"left"}}
                       id="note"
                       name="note"
                       value={key}
                       placeholder="Search..."
                       onChange={(e) => setKey(e.target.value)}
                       type="text"
                />
                <button style={{fontWeight:'bold',color:"black",backgroundColor:"#c0e1ce",height:40,marginTop:10,float:"left"}}
                        onClick={() => {setKeyTrue(1)
                        }}
                        className='btn btn-sm'
                >
                  Search
                </button>
              </div>
            </div>
            <div style={{width:"40%"}}>
              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:100,height:40,fontSize:12,backgroundColor:'#c0e1ce',color:"black",textAlign:"center",float:"right"}}
                  //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                           onChange={(e) => {
                                             setKeyStatus(e.target.value)
                                             setKeyStatusTrue(1)
                                           }}
                                           className="form-control form-control-solid"
                                           type="select"
                                           value={keystatus}
              >
                <option key={'all'} value={'all'}>All</option>
                <option key={'die'} value={'die'}>Die</option>
                <option key={'live'} value={'live'}>Live</option>

              </Input>}
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

                <th className='w-25px'>
                  <div style={{marginLeft:5}} className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                        onChange={(evt) => {
                          dispatch(actions.checkedAllChange(evt.target.checked))
                          setChecked(evt.target.checked)
                        }}
                        checked={Checked}
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='w-5px'>STT</th>
                <th className='min-w-100px '>VPS</th>
                <th className='min-w-100px'>VPS Option</th>
                <th className='min-w-100px'>Trạng thái</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}

            <tbody>
              {
                  accounts&&accounts?.map((item: AccountModel,index:number) => {
                    if (keystatustrue==0&&keytrue==0) {
                      if(index===0){
                        totalvps=1
                      }else {
                        totalvps=totalvps+1
                      }
                      let orderitem = {
                        id: index,
                        vps: item.vps
                      }
                      //setList_User([...list_user, orderitem])
                      list_vps.push(orderitem)
                      return <UserItem key={item.id} item={item} index={index} />
                    }else if((item.vps.indexOf(key)>=0  || item.vpsoption.indexOf(key)>=0)&&keystatustrue==0&&keytrue==1){
                      if(index===0){
                        totalvps=1
                      }else {
                        totalvps=totalvps+1
                      }
                      let orderitem = {
                        id: index,
                        vps: item.vps
                      }
                      //setList_User([...list_user, orderitem])
                      list_vps.push(orderitem)
                      return <UserItem key={item.id} item={item} index={index} />
                    }else if(keystatustrue==1&&keytrue==0){
                        if(keystatus.indexOf("all")>=0){
                          if(index===0){
                            totalvps=1
                          }else {
                            totalvps=totalvps+1
                          }
                          let orderitem = {
                            id: index,
                            vps: item.vps
                          }
                          //setList_User([...list_user, orderitem])
                          list_vps.push(orderitem)
                          return <UserItem key={item.id} item={item} index={index} />
                        }else if(keystatus.indexOf('live')>=0&&(round((Date.now()-item.timecheck)/1000/60)<=5)){
                          if(index===0){
                            totalvps=1
                          }else {
                            totalvps=totalvps+1
                          }
                          let orderitem = {
                            id: index,
                            vps: item.vps
                          }
                          //setList_User([...list_user, orderitem])
                          list_vps.push(orderitem)
                          return <UserItem key={item.id} item={item} index={index} />
                        }else if(keystatus.indexOf('die')>=0&&round((Date.now()-item.timecheck)/1000/60)>=5){
                          if(index===0){
                            totalvps=1
                          }else {
                            totalvps=totalvps+1
                          }
                          let orderitem = {
                            id: index,
                            vps: item.vps
                          }
                          //setList_User([...list_user, orderitem])
                          list_vps.push(orderitem)
                          return <UserItem key={item.id} item={item} index={index} />
                        }
                    }else if(keystatustrue==1&&keytrue==1){
                      if(keystatus.indexOf("all")>=0&&(item.vps.indexOf(key)>=0  || item.vpsoption.indexOf(key)>=0)){
                        if(index===0){
                          totalvps=1
                        }else {
                          totalvps=totalvps+1
                        }
                        let orderitem = {
                          id: index,
                          vps: item.vps
                        }
                        //setList_User([...list_user, orderitem])
                        list_vps.push(orderitem)
                        return <UserItem key={item.id} item={item} index={index} />
                      }else if((item.vps.indexOf(key)>=0  || item.vpsoption.indexOf(key)>=0)&&keystatus.indexOf('live')>=0&&(round((Date.now()-item.timecheck)/1000/60)<=5)){
                        if(index===0){
                          totalvps=1
                        }else {
                          totalvps=totalvps+1
                        }
                        let orderitem = {
                          id: index,
                          vps: item.vps
                        }
                        //setList_User([...list_user, orderitem])
                        list_vps.push(orderitem)
                        return <UserItem key={item.id} item={item} index={index} />
                      }else if((item.vps.indexOf(key)>=0 || item.vpsoption.indexOf(key)>=0)&&keystatus.indexOf('die')>=0&&round((Date.now()-item.timecheck)/1000/60)>=5){
                        if(index===0){
                          totalvps=1
                        }else {
                          totalvps=totalvps+1
                        }
                        let orderitem = {
                          id: index,
                          vps: item.vps
                        }
                        //setList_User([...list_user, orderitem])
                        list_vps.push(orderitem)
                        return <UserItem key={item.id} item={item} index={index} />
                      }
                    }
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
      <EditMulti
          list_vps={list_vps}
          show={showEditMulti}
          close={() => {
            setShowEditMulti(false)
          }}
      />
      <RestartMulti
          list_vps={list_vps}
          show={showRestartMulti}
          close={() => {
            setShowRestartMulti(false)
          }}
      />
    </div>
  )
}
export  { UserList }