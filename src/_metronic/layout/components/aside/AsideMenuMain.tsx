/* eslint-disable react/jsx-no-target-blank */
import React , { useState } from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'

export function AsideMenuMain() {
  const intl = useIntl()
  const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""

    const [isVPS, setIsVPS] = useState(false);
    const [isProxy, setIsProxy] = useState(false);
    const [isView, setIsView] = useState(false);
    const [isCmt, setIsCmt] = useState(false);
    const [isTraffic, setIsTraffic] = useState(false);
    const [isFollowerTiktok, setFollowerTiktok] = useState(false);

    // State to track button active state
    const [isActive, setIsActive] = useState(false);
    const [isActiveProxy, setIsActiveProxy] = useState(false);
    const [isActiveView, setIsActiveView] = useState(false);
    const [isActiveCmt, setIsActiveCmt] = useState(false);
    const [isActiveTraffic, setIsActiveTraffic] = useState(false);
    const [isActiveFollowerTiktok, setIsActiveFollowerTiktok] = useState(false);

    // Function to toggle the isAdmin state
    const toggleVPS = () => {
        setIsVPS(!isVPS);
        setIsActive( !isActive);
    };
    const toggleProxy = () => {
        setIsProxy(!isProxy);
        setIsActiveProxy( !isActiveProxy);
    };
    const toggleView = () => {
        setIsView(!isView);
        setIsActiveView( !isActiveView);
    };
    const toggleCmt = () => {
        setIsCmt(!isCmt);
        setIsActiveCmt( !isActiveCmt);
    };
    const toggleTraffic = () => {
        setIsTraffic(!isTraffic);
        setIsActiveTraffic( !isActiveTraffic);
    };
    const toggleFollowerTiktok = () => {
        setFollowerTiktok(!isFollowerTiktok);
        setIsActiveFollowerTiktok( !isActiveFollowerTiktok);
    };
    return (
    <>
        <AsideMenuItem
            to='/crafted/orderfindhistory'
            title='Tìm kiếm nhanh'
            icon='/media/icons/duotune/general/gen004.svg'
            fontIcon='bi-app-indicator'
        />
        {/*danh sach*/}
        {role === "ROLE_ADMIN" &&<button style={{backgroundColor:"rgba(175,202,234,0.97)"}}  onClick={toggleVPS} className={isActive ? "header-cus__active" : ""}> <div className="header-cus__menu-item ">
            <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span style={{fill:"red"}} className="svg-icon svg-icon-2">
                                <KTSVG  path="/media/icons/duotune/ecommerce/ecm009.svg" className='svg-icon-2' />
                         </span>
                      </span>
                <span className="header-cus__menu-title">Danh Sách VPS</span>
                <span className="header-cus__down">⇑</span>
            </div>
        </div>
        </button>}
        { isVPS && (
            <div>
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/vps'
                        title='Danh sách VPS View'
                        icon='/media/icons/duotune/ecommerce/ecm009.svg'
                        fontIcon='bi-person'
                    />
                }
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/listvpssub'
                        title='Danh sách VPS Sub'
                        icon='/media/icons/duotune/ecommerce/ecm009.svg'
                        fontIcon='bi-person'
                    />
                }
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/listvpstiktok'
                        title='Danh sách VPS TikTok'
                        icon='/media/icons/duotune/ecommerce/ecm009.svg'
                        fontIcon='bi-person'
                    />
                }
            </div>

        ) }

        {role === "ROLE_ADMIN" &&<button style={{backgroundColor:"rgba(198,240,246,0.84)"}}  onClick={toggleProxy} className={isActiveProxy ? "header-cus__active" : ""}>
            <div className="header-cus__menu-item">
                <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span className="svg-icon svg-icon-2">
                                <KTSVG path="/media/icons/duotune/abstract/abs018.svg" className='svg-icon-2' />
                         </span>
                      </span>
                    <span className="header-cus__menu-title">Danh Sách Proxy</span>
                    <span className="header-cus__down">⇑</span>
                </div>
            </div>
        </button>}
        { isProxy && (
            <div>
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/proxyview'
                        title='Danh sách Proxy View'
                        icon='/media/icons/duotune/abstract/abs018.svg'
                        fontIcon='bi-person'
                    />
                }
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/proxysub'
                        title='Danh sách Proxy Sub'
                        icon='/media/icons/duotune/abstract/abs018.svg'
                        fontIcon='bi-person'
                    />
                }
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/socklist'
                        title='Danh sách Proxy Socks5'
                        icon='/media/icons/duotune/abstract/abs018.svg'
                        fontIcon='bi-person'
                    />
                }
                {
                    role === "ROLE_ADMIN" && <AsideMenuItem
                        to='/crafted/authenlist'
                        title='Danh sách IP Authen'
                        icon='/media/icons/duotune/abstract/abs018.svg'
                        fontIcon='bi-person'
                    />
                }
            </div>
        ) }
        <button style={{backgroundColor:"rgba(238,184,184,0.97)"}}  onClick={toggleView} className={isActiveView ? "header-cus__active" : ""}>
            <div className="header-cus__menu-item">
                <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span className="svg-icon svg-icon-2">
                                <KTSVG path="/media/icons/duotune/social/soc007.svg" className='svg-icon-2' />
                         </span>
                      </span>
                    <span className="header-cus__menu-title">View Youtube</span>
                    <span className="header-cus__down">⇑</span>
                </div>
            </div>
        </button>
        { isView && (
            <div>
                <AsideMenuItem
                    children={AsideMenuMain}
                    to='/crafted/orders'
                    title='Đơn Views'
                    icon='/media/icons/duotune/social/soc007.svg'
                    fontIcon='bi-app-indicator'
                />
                <AsideMenuItem
                    children={AsideMenuMain}
                    to='/crafted/orderpending'
                    title='Đơn Views Pending'
                    icon='/media/icons/duotune/social/soc007.svg'
                    fontIcon='bi-app-indicator'
                />
                {
                    (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") &&  <AsideMenuItem
                        to='/crafted/ordercheck'
                        title='Đơn Views duyệt hủy'
                        icon='/media/icons/duotune/social/soc007.svg'
                        fontIcon='bi-app-indicator'
                    />
                }

                {
                    (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") &&  <AsideMenuItem
                        to='/crafted/orderbaohanh'
                        title='Bảo hành & Hoàn Tiền'
                        icon='/media/icons/duotune/social/soc007.svg'
                        fontIcon='bi-app-indicator'
                    />
                }
                <AsideMenuItem
                    to='/crafted/orderhistory'
                    title='Lịch sử Views'
                    icon='/media/icons/duotune/social/soc007.svg'
                    fontIcon='bi-app-indicator'
                />
            </div>
        ) }
        <button style={{backgroundColor:"rgba(243,238,224,0.46)"}}  onClick={toggleCmt} className={isActiveCmt ? "header-cus__active" : ""}>
            <div className="header-cus__menu-item">
                <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span className="svg-icon svg-icon-2">
                                <KTSVG path="/media/icons/duotune/communication/com003.svg" className='svg-icon-2' />
                         </span>
                      </span>
                    <span className="header-cus__menu-title">Comment Youtube</span>
                    <span className="header-cus__down">⇑</span>
                </div>
            </div>
        </button>
        { isCmt && (
            <div>
                <AsideMenuItem
                    to='/crafted/ordercomments'
                    title='Đơn Comments'
                    icon='/media/icons/duotune/communication/com003.svg'
                    fontIcon='bi-app-indicator'
                />
                <AsideMenuItem
                    to='/crafted/ordercommenthistory'
                    title='Lịch sử Comments'
                    icon='/media/icons/duotune/communication/com003.svg'
                    fontIcon='bi-app-indicator'
                />
            </div>
        ) }
        <button  style={{backgroundColor:"rgba(245,228,206,0.97)"}}  onClick={toggleTraffic} className={isActiveTraffic ? "header-cus__active" : ""}>
            <div className="header-cus__menu-item">
                <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span className="svg-icon svg-icon-2">
                                <KTSVG path="/media/icons/duotune/graphs/gra005.svg" className='svg-icon-2' />
                         </span>
                      </span>
                    <span className="header-cus__menu-title">Traffic Website</span>
                    <span className="header-cus__down">⇑</span>
                </div>
            </div>
        </button>
        { isTraffic && (
            <div>
                <AsideMenuItem
                    to='/crafted/ordertraffic'
                    title='Đơn Traffic Website'
                    icon='/media/icons/duotune/graphs/gra005.svg'
                    fontIcon='bi-app-indicator'
                />

                <AsideMenuItem
                    to='/crafted/ordertraffiwebhistory'
                    title='Lịch sử Traffic Website'
                    icon='/media/icons/duotune/graphs/gra005.svg'
                    fontIcon='bi-app-indicator'
                />
            </div>
        ) }
        <button  style={{backgroundColor:"rgb(236,227,253)"}}  onClick={toggleFollowerTiktok} className={isActiveFollowerTiktok ? "header-cus__active" : ""}>
            <div className="header-cus__menu-item">
                <div className="header-cus__menu-link header-cus__without-sub"  style={{textDecorationLine: 'none', fontWeight: 'bold',marginLeft:9}}>
                      <span className="header-cus__menu-icon">
                         <span className="svg-icon svg-icon-2">
                                <KTSVG path="/media/icons/duotune/social/soc008.svg" className='svg-icon-2' />
                         </span>
                      </span>
                    <span className="header-cus__menu-title">Follower TikTok</span>
                    <span className="header-cus__down">⇑</span>

                </div>
            </div>
        </button>
        { isFollowerTiktok && (
            <div>
                <AsideMenuItem
                    to='/crafted/orderfollowertiktok'
                    title='Đơn Follower TikTok'
                    icon='/media/icons/duotune/social/soc008.svg'
                    fontIcon='bi-app-indicator'
                />
                <AsideMenuItem
                    to='/crafted/orderfollowerstiktokhistory'
                    title='Lịch sử Follower Tiktok'
                    icon='/media/icons/duotune/social/soc008.svg'
                    fontIcon='bi-app-indicator'
                />
            </div>
        ) }
        {role != "ROLE_SUPPORT"&&<AsideMenuItem
            to='/crafted/balance'
            title='Biến động số dư'
            icon='/media/icons/duotune/finance/fin002.svg'
            fontIcon='bi-app-indicator'
        />}
        {
            role === "ROLE_ADMIN" &&       <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/general/gen032.svg'
                title='Thống kê doanh thu'
                fontIcon='bi-app-indicator'
            />
        }
        <AsideMenuItem
            to='/crafted/service'
            title='Danh sách dịch vụ'
            icon='/media/icons/duotune/general/gen025.svg'
            fontIcon='bi-app-indicator'
        />
        {
            (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") && <AsideMenuItem
                to='/crafted/user'
                title='Danh sách User'
                icon='/media/icons/duotune/communication/com006.svg'
                fontIcon='bi-person'
            />
        }
        {
            (role === "ROLE_ADMIN" || role==="ROLE_SUPPORT") && <AsideMenuItem
                to='/crafted/setting'
                title='Cài đặt hệ thống'
                icon='/media/icons/duotune/coding/cod001.svg'
                fontIcon='bi-person'
            />
        }
    </>
  )
}
