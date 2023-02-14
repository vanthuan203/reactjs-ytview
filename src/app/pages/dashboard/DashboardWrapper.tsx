/* eslint-disable jsx-a11y/anchor-is-valid */
import { StaticList } from 'app/modules/history/StaticList'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../_metronic/layout/core'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 gx-xl-12'>
      <div className='col-xl-12'>

      </div>
    </div>
    {/* end::Row */}
    <div className='row gy-5 gx-xl-12'>
      <div className='col-xl-12'>
        <StaticList className='card-xxl-stretch mb-5 mb-xl-12' />
      </div>
    </div>

  </>
)

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{'Thống kê'}</PageTitle>
      {
        <DashboardPage />
      }
    </>
  )
}

export { DashboardWrapper }
