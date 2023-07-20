/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTSVG } from '../../../helpers'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'
export function AsideMenuMain() {
  const intl = useIntl()
  const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
  return (
    <>
        <AsideMenuItem
            to='/crafted/orderfindhistory'
            title='Tìm kiếm nhanh'
            icon='/media/icons/duotune/general/gen004.svg'
            fontIcon='bi-app-indicator'
        />
        {
            role === "ROLE_ADMIN" &&       <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/general/gen032.svg'
                title='Thống kê'
                fontIcon='bi-app-indicator'
            />
        }

      {
        role === "ROLE_ADMIN" && <AsideMenuItem
          to='/crafted/vps'
          title='Danh sách VPS'
          icon='/media/icons/duotune/ecommerce/ecm009.svg'
          fontIcon='bi-person'
        />
      }
        {
            role === "ROLE_ADMIN111" && <AsideMenuItem
                to='/crafted/threads'
                title='Danh sách luồng'
                icon='/media/icons/duotune/ecommerce/ecm009.svg'
                fontIcon='bi-person'
            />
        }
      {
          role === "ROLE_ADMIN" && <AsideMenuItem
              to='/crafted/user'
              title='Danh sách User'
              icon='/media/icons/duotune/communication/com006.svg'
              fontIcon='bi-person'
          />
      }
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
      <AsideMenuItem
            children={AsideMenuMain}
            to='/crafted/orders'
            title='Đơn Views'
            icon='/media/icons/duotune/social/soc007.svg'
            fontIcon='bi-app-indicator'
      />
        {
            role === "ROLE_ADMIN" &&  <AsideMenuItem
            to='/crafted/ordercheck'
            title='Đơn Views duyệt hủy'
            icon='/media/icons/duotune/general/gen042.svg'
            fontIcon='bi-app-indicator'
        />
        }

        {
            role === "ROLE_ADMIN" &&  <AsideMenuItem
                to='/crafted/orderbaohanh'
                title='Bảo hành & Hoàn Tiền'
                icon='/media/icons/duotune/general/gen026.svg'
                fontIcon='bi-app-indicator'
            />
        }
      <AsideMenuItem
            to='/crafted/orderhistory'
            title='Lịch sử Views'
            icon='/media/icons/duotune/graphs/gra011.svg'
            fontIcon='bi-app-indicator'
      />

        <AsideMenuItem
            to='/crafted/ordercomments'
            title='Đơn Comments'
            icon='/media/icons/duotune/communication/com003.svg'
            fontIcon='bi-app-indicator'
        />
        <AsideMenuItem
            to='/crafted/ordercommenthistory'
            title='Lịch sử Comments'
            icon='/media/icons/duotune/graphs/gra011.svg'
            fontIcon='bi-app-indicator'
        />

        <AsideMenuItem
            to='/crafted/balance'
            title='Biến động số dư'
            icon='/media/icons/duotune/finance/fin002.svg'
            fontIcon='bi-app-indicator'
        />
        <AsideMenuItem
            to='/crafted/service'
            title='Danh sách dịch vụ'
            icon='/media/icons/duotune/general/gen025.svg'
            fontIcon='bi-app-indicator'
        />
        {
            role === "ROLE_ADMIN" && <AsideMenuItem
                to='/crafted/setting'
                title='Cài đặt hệ thống'
                icon='/media/icons/duotune/coding/cod001.svg'
                fontIcon='bi-person'
            />
        }
    </>
  )
}
