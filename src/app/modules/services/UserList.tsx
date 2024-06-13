/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { AccountModel ,OrderModelChecked} from 'app/modules/services/models/Account'
import UserItem from './components/UserItem'
import {actions} from "./redux/AccountRedux";
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {ComputerModel} from "../history/models/Account";
import {RootState} from "../../../setup";
import {Input} from "reactstrap";
import {round} from "@popperjs/core/lib/utils/math";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DateRangePicker } from 'rsuite';
import DatePicker from "react-date-picker";
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
  let [totalService, setTotalService] = useState(0)
  let [totalServiceShow, setTotalServiceShow] = useState(0)
  const [vpstpye, setvpstpye] = useState('')
  const [keytrue, setKeyTrue] = useState(0)
  const [keystatus, setKeyStatus] = useState('')
  const [keystatustrue, setKeyStatusTrue] = useState(0)
  const [key, setKey] = useState("")
  const [category, setCategory] = useState("Category")
  const [geo, setGeo] = useState("Geo")
  const [platform, setPlatform] = useState("Platform")
  const [enabled, setEnabled] = useState("1")
  const [type, setType] = useState("Type")
  let [useEff, setuseEff] = useState(0)
  const [nameExport, setNameExport] = useState('Services')
  const [listcategory,setlistCategory]=useState([{
    category:"Category"
  },])
  const [listplatform,setlistPlatform]=useState([{
    platform:"Platform"
  },])
  const [listgeo,setlistGeo]=useState([{
    geo:"Geo"
  },])
  const [listtype,setlistType]=useState([{
    type:"Type"
  },])
  const role: string =
      (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const isShowFixMulti = accounts.find((item) => {
    if (item.checked) {

      return true
    }
    return false
  })
  const [listService,setListService]=useState([{
    id: 0,
    service: 0,
    platform:"",
    category:"",
    type:"",
    quantity:"",
    name:"",
    source:"",
    geo:"",
    rate: 0,
    guarantee:"",
    retention:""
  }])
  async function getOptionService() {
    let  requestUrl = API_URL+'servive/getOptionService';
    const response = await fetch(requestUrl, {
      method: 'get',
      headers: new Headers({
        'Authorization': '1',
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    console.log(response)
    const responseJson = await response.json();
    const {listType} = responseJson;
    const {listGeo} = responseJson;
    const {listPlatform} = responseJson;
    const {listCategory} = responseJson;
    let typeList =listType.split(',');
    for(var i=0;i<typeList.length;i++){
      let typeItem = {
        type: typeList[i]
      }
      setlistType([...listtype, typeItem])
      listtype.push(typeItem)
    }
    let geoList =listGeo.split(',');
    for(var i=0;i<geoList.length;i++){
      let geoItem = {
        geo: geoList[i]
      }
      setlistGeo([...listgeo, geoItem])
      listgeo.push(geoItem)
    }
    let platformList =listPlatform.split(',');
    for(var i=0;i<platformList.length;i++){
      let platformItem = {
        platform: platformList[i]
      }
      setlistPlatform([...listplatform, platformItem])
      listplatform.push(platformItem)
    }
    let categoryList =listCategory.split(',');
    for(var i=0;i<categoryList.length;i++){
      let categoryItem = {
        category: categoryList[i]
      }
      setlistCategory([...listcategory, categoryItem])
      listcategory.push(categoryItem)
    }
  }

  useEffect(() => {
    if(accounts.length!=0){
      setLoading(false)
    }
    totalServiceShow=totalService
    setTotalServiceShow(totalServiceShow)
    setTotalService(0)
    setListService([])
    useEff=useEff+1
    setuseEff(useEff)
    if(useEff<=1){
    getOptionService()
    }
  },[enabled,keytrue,key,geo,category,type,platform,accounts.length,,]);

  async function Export(csvData:OrderModelChecked[],fileName:string){
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  }
  return (

    <div className={`card ${className}`}>
      <div className="page-header" style={{backgroundColor:'#c0e1ce'}}>
        <div className="page-header__content">
          <div className="align-items-center row" style={{margin:10}}>
            <div className="col-lg-6 col-sm-12 c-order__header">
              <span  className='fw-bolder fs-3 mb-1'>Danh sách Service</span>
              <span  className='ml-2 fw-bold fs-7'>({totalServiceShow})</span>
            </div>
          </div>
          <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>


            <div style={{width:"100%"}}>
              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:200,height:40,fontSize:12,backgroundColor:'rgba(57,121,77,0.68)',color:"white",textAlign:"center",float:"right"}}
                  //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                           onChange={(e) => {
                                             setGeo(e.target.value)
                                             //setKeyRate(keyrate)
                                           }}
                                           className="form-control form-control-solid"
                                           type="select"
                                           value={geo}
              >
                {
                  listgeo.map((item, index) => {
                    return(
                        <option key={item.geo.indexOf("All")>=0?"":item.geo} value={item.geo.indexOf("Al")>=0?"":item.geo}>
                          {item.geo.toUpperCase()}</option>)
                  })
                }
              </Input>}
              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:200,height:40,fontSize:12,backgroundColor:'rgba(57,121,77,0.68)',color:"white",textAlign:"center",float:"right"}}
                  //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                           onChange={(e) => {
                                             setType(e.target.value)
                                             //setKeyRate(keyrate)
                                           }}
                                           className="form-control form-control-solid"
                                           type="select"
                                           value={type}
              >
                {
                  listtype.map((item, index) => {
                    return(
                        <option key={item.type.indexOf("All")>=0?"":item.type} value={item.type.indexOf("Al")>=0?"":item.type}>
                          {item.type.toUpperCase()}</option>)
                  })
                }
              </Input>}
              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:200,height:40,fontSize:12,backgroundColor:'rgba(57,121,77,0.68)',color:"white",textAlign:"center",float:"right"}}
                  //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                           onChange={(e) => {
                                             setCategory(e.target.value)
                                             //setKeyRate(keyrate)
                                           }}
                                           className="form-control form-control-solid"
                                           type="select"
                                           value={category}
              >
                {
                  listcategory.map((item, index) => {
                    return(
                        <option key={item.category.indexOf("All")>=0?"":item.category} value={item.category.indexOf("Al")>=0?"":item.category}>
                          {item.category.toUpperCase()}</option>)
                  })
                }
              </Input>}

              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:200,height:40,fontSize:12,backgroundColor:'rgba(57,121,77,0.68)',color:"white",textAlign:"center",float:"right"}}
                  //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                           onChange={(e) => {
                                             setPlatform(e.target.value)
                                             //setKeyRate(keyrate)
                                           }}
                                           className="form-control form-control-solid"
                                           type="select"
                                           value={platform}
              >
                {
                  listplatform.map((item, index) => {
                    return(
                        <option key={item.platform.indexOf("All")>=0?"":item.platform} value={item.platform.indexOf("Al")>=0?"":item.platform}>
                          {item.platform.toUpperCase()}</option>)
                  })
                }
              </Input>}
              {role==='ROLE_ADMIN'&&<Input style={{margin:10,width:"auto",maxWidth:100,height:40,fontSize:12,backgroundColor:'rgba(57,121,77,0.68)',color:"white",textAlign:"center",float:"right"}}
                  //onChange={(e) => setKeyRate(parseInt(e.target.value))}
                                           onChange={(e) => {
                                             setEnabled(e.target.value)
                                             //setKeyRate(keyrate)
                                           }}
                                           className="form-control form-control-solid"
                                           type="select"
                                           value={enabled}
              >

                <option key={"on"} value={"1"}>
                  ON</option>)
                <option key={"off"} value={"0"}>
                  OFF</option>)

              </Input>}

            </div>


          </div>
          <div className="align-items-center row" style={{backgroundColor:"white",margin:10}}>
            <div style={{width:"60%"}}>
              <div>
                <Input style={{margin:10,width:"48%",maxWidth:130,minWidth:60,height:40,float:"left"}}
                       id="note"
                       name="note"
                       value={key}
                       placeholder="Search..."
                       onChange={(e) => setKey(e.target.value)
                       }
                       type="text"
                />
                <button style={{ fontWeight:'bold',maxWidth:80,color:"black",backgroundColor:"#c0e1ce",height:40,marginTop:10,float:"left"}}
                        onClick={() => {
                          setKeyTrue(1)
                        }}
                        className='btn btn-sm'
                >
                  Search
                </button>
              </div>
            </div>
            <div style={{width:"40%"}}>
              <button style={{height:40,margin:10,float:"right"}}
                      onClick={() => {Export(listService,nameExport+"_"+(new Date().toLocaleDateString('vn-VN')).toString())
                      }}
                      className='btn btn-success'
              >
                Export
              </button>
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

                <th className='w-5px'>STT</th>
                <th className='min-w-200px '>Service</th>
                <th className='min-w-500px'>Option</th>
                <th className='min-w-100px'>MaxOrder</th>
                <th className='min-w-100px'>Threads</th>
                <th className='min-w-100px'>Geo</th>
                <th className='min-w-100px'>Enabled</th>
                <th className='min-w-100px'>Guarantee</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}

            <tbody>
              {accounts&&
                  accounts?.map((item: AccountModel,index:number) => {
                    console.log(geo)
                    if (keytrue==0&&((geo.indexOf("Geo")>=0?true:item.geo.indexOf(geo)>=0)
                            &&(type.indexOf("Type")>=0?true:item.type.indexOf(type)>=0))
                        &&(platform.indexOf("Platform")>=0?true:item.platform.indexOf(platform)>=0)
                        &&(category.indexOf("Category")>=0?true:item.category.indexOf(category)>=0)
                        &&(enabled.indexOf("Enabled")>=0?true:item.enabled.toString().indexOf(enabled)>=0)
                    ) {
                      // @ts-ignore
                      totalService=totalService+1;
                      let orderitem = {
                        id: totalService,
                        service: item.service,
                        platform:item.platform,
                        category:item.category,
                        type:item.type,
                        quantity:item.min+"-"+item.max,
                        name:item.name,
                        source:(item.dtn>0?("Browse features "+item.dtn+"%"):"")+
                            (item.direct>0?(" Direct "+item.direct+"%"):"")+
                            (item.suggest>0?((item.platform.indexOf("Website")>=0?" Referral ":" Suggest ")+item.suggest+"%"):"")+
                            (item.external>0?((item.platform.indexOf("Website")>=0?" Social  ":" External")+item.external+"%"):"")+
                            (item.search>0?(" Search "+item.search+"%"):"")+
                            (item.embed>0?(" Embed "+item.embed+"%"):"")+
                            (item.platform.indexOf("Website")>=0?(" CTR "+item.click_web+"%"):"")
                                ,
                        geo:item.geo,
                        rate: item.rate,
                        guarantee:item.refill==0?("No Refill"):(item.maxtimerefill+" days Refill"),
                        retention:item.mintime+"-"+item.maxtime+" minutes",
                      }
                      listService.push(orderitem)
                      return (
                          <UserItem key={item.service+index} item={item} index={index} />
                      )
                    }else if ((keytrue==1&&(item.service==parseInt(key)))&&((geo.indexOf("Geo")>=0?true:item.geo.indexOf(geo)>=0)
                            &&(type.indexOf("Type")>=0?true:item.type.indexOf(type)>=0))
                        &&(platform.indexOf("Platform")>=0?true:item.platform.indexOf(platform)>=0)
                        &&(category.indexOf("Category")>=0?true:item.category.indexOf(category)>=0)
                        &&(enabled.indexOf("Enabled")>=0?true:item.enabled.toString().indexOf(enabled)>=0)
                    ) {
                      // @ts-ignore
                      totalService=totalService+1;
                      let orderitem = {
                        id: totalService,
                        service: item.service,
                        platform:item.platform,
                        category:item.category,
                        type:item.type,
                        quantity:item.min+"-"+item.max,
                        name:item.name,
                        source:(item.dtn>0?("Browse features "+item.dtn+"%"):"")+
                            (item.direct>0?(" Direct "+item.direct+"%"):"")+
                            (item.suggest>0?((item.platform.indexOf("Website")>=0?" Referral ":" Suggest ")+item.suggest+"%"):"")+
                            (item.external>0?((item.platform.indexOf("Website")>=0?" Social  ":" External")+item.external+"%"):"")+
                            (item.search>0?(" Search "+item.search+"%"):"")+
                            (item.embed>0?(" Embed "+item.embed+"%"):"")+
                            (item.platform.indexOf("Website")>=0?(" CTR "+item.click_web+"%"):"")
                        ,
                        geo:item.geo,
                        rate: item.rate,
                        guarantee:item.refill==0?("No Refill"):(item.maxtimerefill+" days Refill"),
                        retention:item.mintime+"-"+item.maxtime+" minutes",
                      }
                      listService.push(orderitem)
                      return (
                          <UserItem key={item.service+index} item={item} index={index} />
                      )
                    }

                    return null
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
export  { UserList }