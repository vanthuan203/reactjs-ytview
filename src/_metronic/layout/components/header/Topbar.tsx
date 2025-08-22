import clsx from 'clsx'
import React, {FC, useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, QuickLinks, Search} from '../../../partials'
import {useLayout} from '../../core'
import {UserModel} from "../../../../app/modules/auth/models/UserModel";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../../../setup";
import {auto} from "@popperjs/core";
import moment from "moment";
const API_URL = process.env.REACT_APP_API_URL
let total_user=0
const toolbarButtonMarginClass = 'ms-2 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px',
  toolbarButtonIconSizeClass = 'svg-icon-1'
function format1(n:number) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}
const Topbar: FC = () => {
    const [toggle, setToggle] = useState(false)
    const [toggle5m, setToggle5m] = useState(false)
    let [total_user, settotal_user] = useState("")
    let [fluctuationsNow, sefluctuationsNow] = useState("")
    let [now, setnow] = useState(moment().format("hh:mm:s A").toString())
    let [useEff, setuseEff] = useState(0)
    const [isMobile, setIsMobile] = useState(false);
    const [countPrice, setCountPrice] = useState(0);
    async function getcounts(){
        settotal_user("")

        const requestUrl = API_URL+'auth/balanceNow';
        const response= await fetch(requestUrl,{
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson= await  response.json();
        const {balance}=responseJson;
        settotal_user(balance)
        setnow(moment().format("hh:mm:s A").toString())
    }
    async function getnow(){
        const requestUrl = API_URL+'auth/fluctuationsNow';
        const response= await fetch(requestUrl,{
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson= await  response.json();
        const {noti}=responseJson;

        if(noti!=fluctuationsNow){
            sefluctuationsNow(noti)
        }
    }
    async function get5M(){
        const requestUrl = API_URL+'auth/fluctuations5M';
        const response= await fetch(requestUrl,{
            method: 'get',
            headers: new Headers({
                'Authorization': '1',
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });
        const responseJson= await  response.json();
        const {price}=responseJson;
        setCountPrice(-price)
    }
    const handleWindowResize = () => {
        setIsMobile(window.innerWidth <= 800);
    };
    useEffect(() => {
        useEff=useEff+1
        setuseEff(useEff)
        if(useEff<=1&&user.role==='ROLE_ADMIN'){
            getcounts()
        }
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
    }, []);
    useEffect(() => {
        if(user.role==='ROLE_ADMIN'){
            setTimeout(() => setToggle((prevToggle) => !prevToggle), 10000);
            handleWindowResize();
            // Thêm sự kiện lắng nghe để kiểm tra kích thước cửa sổ khi cửa sổ thay đổi
            window.addEventListener('resize', handleWindowResize);
            if(window.innerWidth > 800){
                getnow()
            }
        }

    }, [toggle]);

    useEffect(() => {
        if(user.role==='ROLE_ADMIN'){
            setTimeout(() => setToggle5m((prevToggle) => !prevToggle), 60000);
            handleWindowResize();
            // Thêm sự kiện lắng nghe để kiểm tra kích thước cửa sổ khi cửa sổ thay đổi
            window.addEventListener('resize', handleWindowResize);
            if(window.innerWidth > 800){
                get5M()
            }
        }

    }, [toggle5m]);
    function animate_string() {
        const element = document.getElementById('target');
        // @ts-ignore
        const textNode = element.firstChild;
        // @ts-ignore
        let text = textNode.data;
        setInterval(() => {
            text = text[text.length - 1] + text.substring(0, text.length - 1);
            // @ts-ignore
            textNode.data = text;
        }, 100);
    }

  const {config} = useLayout()
  const user: UserModel = useSelector<RootState>(({auth}) => auth.user, shallowEqual) as UserModel
  return (

    <div className='d-flex align-items-stretch flex-lg-shrink-1'>
      {/* begin::User */}
        {user.role==='ROLE_ADMIN111'&&<div className="align-items-top row" style={{marginRight:15}}>
            <div style={{width:"100%",margin:auto}}>
                <div className="pl-0 text-left">
                        <div dangerouslySetInnerHTML={{ __html: now }} style={{color:"rgb(9,9,9)",fontSize:13,fontWeight:"bold",fontFamily:"monospace",textAlign:"center",margin:auto}}>
                        </div>
                </div>
            </div>
        </div>}
        {isMobile==false&&(user.role==='ROLE_ADMIN')&&<div className="align-items-top row" style={{marginRight:15}}>
            <div style={{width:"100%",display: "flex",alignItems:"center",justifyItems:"center"}}>
                <div className="pl-0 text-left">
                   <span  style={{textAlign:"center",fontWeight:"bold",fontFamily:"cursive"}}>{fluctuationsNow +" 🕐 𝐋𝐀𝐒𝐓 𝟓𝐌 "} <span style={{color:"#bb0707",fontFamily:"cursive",fontSize:15}}>{countPrice.toFixed(3)+"$"}</span></span>
                </div>
            </div>
        </div>}
        {user.role==='ROLE_ADMIN'&&<div className="align-items-top row" style={{backgroundColor:"#9de3bb",marginRight:15}}>
            <div style={{width:"100%"}}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }} className="pl-0 text-left">
                    <button
                            onClick={() => {getcounts()
                            }}
                            className='btn btn-sm'
                    >
                        <div style={{width:"100%",display: "flex",alignItems:"center",justifyItems:"center"}}>
                            <span style={{textAlign:"center",fontWeight:"bold",fontSize:isMobile==false?11:11,color:"rgb(9,9,9)",backgroundColor:"rgb(255,255,255)",padding:4,paddingRight:isMobile==false?7:2,paddingLeft:isMobile==false?6:2,flex: 1,alignItems: 'center',borderRadius:10}}>{total_user!=""?(isMobile==false?total_user.split(",")[0]:(parseInt(total_user.split(",")[0]).toFixed(0))):""}{isMobile==true?"$":""}</span>
                            <span style={{textAlign:"center",fontSize:isMobile==false?11:11,color:"#fcfcfc",backgroundColor:"rgba(218,30,30,0.97)",padding:4,paddingRight:isMobile==false?7:2,paddingLeft:isMobile==false?6:2,flex: 1,alignItems: 'center',borderRadius:10,marginLeft:3}}>{total_user!=""?(isMobile==false?total_user.split(",")[1]:(parseInt(total_user.split(",")[1]).toFixed(0))):""}</span>
                            <span  style={{textAlign:"center",fontSize:isMobile==false?11:11,color:"#fcfcfc",backgroundColor:"rgba(34,126,231,0.97)",padding:4,paddingRight:isMobile==false?7:2,paddingLeft:isMobile==false?6:2,flex: 1,alignItems: 'center',borderRadius:10,marginLeft:3}}>{total_user!=""?(isMobile==false?total_user.split(",")[2]:(parseInt(total_user.split(",")[2]).toFixed(0))):""}</span>
                            <span  style={{textAlign:"center",fontSize:isMobile==false?11:11,color:"#fcfcfc",backgroundColor:"rgba(3,37,80,0.97)",padding:4,paddingRight:isMobile==false?7:2,paddingLeft:isMobile==false?6:2,flex: 1,alignItems: 'center',borderRadius:10,marginLeft:3}}>{total_user!=""?(isMobile==false?total_user.split(",")[3]:(parseInt(total_user.split(",")[3]).toFixed(0))):""}</span>
                            <span  style={{textAlign:"center",fontSize:isMobile==false?11:11,color:"#fcfcfc",backgroundColor:"rgba(72,67,239,0.97)",padding:4,paddingRight:isMobile==false?7:2,paddingLeft:isMobile==false?6:2,flex: 1,alignItems: 'center',borderRadius:10,marginLeft:3}}>{total_user!=""?(isMobile==false?total_user.split(",")[4]:(parseInt(total_user.split(",")[4]).toFixed(0))):""}</span>

                        </div>
                    </button>
                </div>
            </div>
        </div>}
      <div className="align-items-center row" style={{backgroundColor:"#c0e1ce"}}>
        {/* begin::Toggle */}
        <div style={{width:"70%"}}>
            <div className="pl-2 text-left">
                <div style={{color:"#26695c",fontWeight:"bold"}}>{user.username.substring(0,15)}...</div>
                <span style={{color:"#b7080f",fontWeight:"bold"}}  className="font-weight-bold" >{user.role}</span>
                <div style={{color:"#000000",fontWeight:"bold"}} className="font-weight-bold">{user.balance.toPrecision()}$</div>
            </div>
        </div>

          <div style={{width:"30%"}}
               data-kt-menu-trigger='click'
               data-kt-menu-attach='parent'
               data-kt-menu-placement='bottom-end'
               data-kt-menu-flip='bottom'
          >
              <button className="d-block p-0 avatar-icon-wrapper">
                  <div className="avatar-icon avatar-icon--custom">
                      <img style={{width:40,height:40,borderImage:"-moz-initial",borderRadius:"50%"}} src={toAbsoluteUrl('/media/avatars/Blank-Avatar.jpg')} alt='metronic' />
                  </div>
              </button>
          </div>

        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
    </div>
  )
}

export {Topbar}
