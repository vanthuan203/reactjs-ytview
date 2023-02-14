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
        {
            role === "ROLE_ADMIN" &&       <AsideMenuItem
                to='/dashboard'
                icon='/media/icons/duotune/general/gen032.svg'
                title='Thống kê'
                fontIcon='bi-app-indicator'
            />
        }

      {
        role === "ROLE_ADMIN11" && <AsideMenuItem
          to='/crafted/vps'
          title='Danh sách Vps'
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
          role === "ROLE_ADMIN11" && <AsideMenuItem
              to='/crafted/proxy'
              title='Danh sách Proxy'
              icon='/media/icons/duotune/abstract/abs018.svg'
              fontIcon='bi-person'
          />
      }
      <AsideMenuItem
            to='/crafted/orders'
            title='Đơn chạy & Thêm đơn'
            icon='/media/icons/duotune/graphs/gra008.svg'
            fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
            to='/crafted/orderhistory'
            title='Lịch sử đơn'
            icon='/media/icons/duotune/graphs/gra011.svg'
            fontIcon='bi-app-indicator'
      />
        <AsideMenuItem
            to='/crafted/balance'
            title='Biến động số dư'
            icon='/media/icons/duotune/finance/fin002.svg'
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
