/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {useEffect, useState} from 'react'
import {AuthenModel} from 'app/modules/history/models/Account'
import AuthenItem from './components/AuthenItem'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { actions } from './redux/AccountRedux'
import { RootState } from 'setup'
import {Input, Label} from "reactstrap";
import {randomString} from "react-inlinesvg/lib/helpers";
type Props = {
  className: string,
}

const AuthenList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()


  const API_URL = process.env.REACT_APP_API_URL
  const [ipv4, setipv4] = useState("")
  const [keytrue, setKeyTrue] = useState(0)
  const [addtrue, setAddTrue] = useState(0)
  const [status, setStatus] = useState(true)
  const authens:AuthenModel[] = useSelector<RootState>(({ histories }) => histories.authens, shallowEqual) as AuthenModel[] || []
  let sum_total=0;
  let sum_die=0;
  useEffect(() => {
    if(status===true){
      dispatch(actions.requestAuthens())
      setipv4('')
      setKeyTrue(0)
    }
    setStatus(false)
  }, [status])
  async function delipv4(ipv4:string) {
    let  requestUrl = API_URL+'proxy/delauthen?ipv4='+ipv4;
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson = await response.json();
    const {status} = responseJson;
    return status
  }
  async function addipv4(ipv4:string) {
    let  requestUrl = API_URL+'proxy/addauthen?ipv4='+ipv4;
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const responseJson = await response.json();
    const {status} = responseJson;
    return status
  }
  const clickDeleteHandler = () => {
    const arr:string[]=ipv4.split('\n');
    if (window.confirm("Bạn chắc chắn muốn xóa "+arr.length+" IP!") == true) {
      for(var i=0;i<arr.length;i++){
        delipv4(arr[i])
      }
      setStatus(true)
    }
  }
  const clickAddHandler = () => {
    const arr:string[]=ipv4.split('\n');
    for(var i=0;i<arr.length;i++){
      addipv4(arr[i])
    }
    setStatus(true)
  }
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-6 col-sm-12 c-order__header">
              <span  className='fw-bolder fs-3 mb-1'>IP Authen</span>
              <span  className='ml-2 fw-bold fs-7'>(Tổng: {authens.length})</span>
            </div>
            {keytrue==0&&<div className="col-lg-6 col-sm-12 text-right">
              <button
                  onClick={() => {
                    setKeyTrue(1)
                    setAddTrue(1)
                  }}
                  className='btn btn-success'
              >
                Thêm
              </button>
                <button style={{margin:5}}
                    onClick={() => {
                      setKeyTrue(1)
                    }}
                    className='btn btn-success'
                >
                  Xóa
                </button>
            </div>}

          </div>
        </div>
        {keytrue==1&&<div className="page-header__content">
          <div className="align-items-center row" style={{backgroundColor:"white"}}>
            <div >
                <Input style={{height:500,width:'100%',float:"left"}}
                       id="list_id"
                       name="list_id"
                       className="form-control form-control-solid"
                       placeholder={"1 ipv4 một dòng!"}
                       value={ipv4}
                       type={"textarea"}
                       onChange={(e) => setipv4(e.target.value)}
                />
              {addtrue==0&&<button style={{maxWidth:120,color:"white",height:40,marginTop:10,float:"right",marginBottom:20}}
                        onClick={() => {
                          clickDeleteHandler()
                        }}
                    /*
                    if(key.trim().length==0){
                      if(role.indexOf("ROLE_ADMIN")>=0){
                        dispatch(actions.requestOrders(''))
                      }else{
                        dispatch(actions.requestOrders(user))
                      }
                    }else{
                      if(role.indexOf("ROLE_ADMIN")>=0){
                        dispatch(actions.showordersfilter(key,''))
                      }else{
                        dispatch(actions.showordersfilter(key,user))
                      }
                    }
                    //setKey("")
                  }}

                     */
                        className='btn btn-success'
                >
                  Xóa
                </button>}
              {addtrue==1&&<button style={{maxWidth:140,color:"white",height:40,marginTop:10,float:"right",marginBottom:20}}
                                   onClick={() => {
                                     clickAddHandler()
                                   }}
                  /*
                  if(key.trim().length==0){
                    if(role.indexOf("ROLE_ADMIN")>=0){
                      dispatch(actions.requestOrders(''))
                    }else{
                      dispatch(actions.requestOrders(user))
                    }
                  }else{
                    if(role.indexOf("ROLE_ADMIN")>=0){
                      dispatch(actions.showordersfilter(key,''))
                    }else{
                      dispatch(actions.showordersfilter(key,user))
                    }
                  }
                  //setKey("")
                }}

                   */
                                   className='btn btn-success'
              >
                Thêm
              </button>}
            </div>


          </div>
        </div>}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      {keytrue==0&&<div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='min-w-10px'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>STT</span>
                </th>
                <th className='min-w-50px'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Ipv4</span>
                </th>
                <th className='min-w-50px'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Time</span>
                </th>
                <th className='min-w-50px'>
                  <span style={{fontSize:12,color:"black"}} className='text-sm'>Lock</span>
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {
                authens&&authens?.map((item: AuthenModel,index:number) => {
                  return <AuthenItem key={"ipv4-"+index} item={item} index={index}/>
                })
              }

            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>}
      {/* begin::Body */}
    </div>
  )
}

export default AuthenList
