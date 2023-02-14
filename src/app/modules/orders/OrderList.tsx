import {ChevronDownIcon, SortAscendingIcon, UsersIcon} from '@heroicons/react/solid'
import {Group, OrderModel} from './models/Order'
import {Popover, Transition} from '@headlessui/react'
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Fragment, useEffect, useState} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'

import AddManualModal from './modals/AddManualModal'
import AddModal from './modals/AddModal'
import EditMulti from './modals/EditMulti'
import {KTSVG} from '../../../_metronic/helpers'
import OrderItem from './components/OrderItem'
import {RootState} from 'setup'
import {actions} from './redux/OrdersRedux'

type Props = {
  className: string
  orders: OrderModel[]
}
const OrderList: React.FC<Props> = ({className, orders}) => {
  const dispatch = useDispatch()
  const [showAdd, setShowAdd] = useState(false)
  const [showAddManual, setShowAddManual] = useState(false)
  const [showEditMulti, setShowEditMulti] = useState(false)

  const [groupName, setGroupName] = useState('')
  const role: string =
    (useSelector<RootState>(({auth}) => auth.user?.role, shallowEqual) as string) || ''
  const groups: Group[] =
    (useSelector<RootState>(({orders}) => orders.groups, shallowEqual) as Group[]) || []
  const currentGroup: Group =
    (useSelector<RootState>(({orders}) => orders.currentGroup, shallowEqual) as Group) || undefined

  const selectGroup = (item: Group) => {
    dispatch(actions.selectGroup(item))
  }

  const addGroup = () => {
    if (groupName.length === 0) {
      alert('vui lòng điền tên nhóm')
      return
    }
    dispatch(actions.addGroupRequest(groupName))
    setGroupName('')
  }

  const isShowFixMulti = orders.find((item) => {
    if (item.checked) {
      return true
    }
    return false
  })

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>Danh sách đơn của bạn</span>
          <span className='text-muted mt-1 fw-bold fs-7'>{orders.length} Đơn</span>
        </h3>
        <div className='card-toolbar'>
          <div className='card-toolbar w-100'>
            {/* begin::Menu */}
            {isShowFixMulti && (

              <button style={{fontWeight:'bold',margin:5,color:"white",backgroundColor:"#26695c"}}
                onClick={() => {
                  setShowEditMulti(true)
                }}
                className='btn btn-sm '
              >
                Sửa nhiều
              </button>
            )}
            <button style={{fontWeight:'bold',color:"white",backgroundColor:"#26695c"}}
              onClick={() => {
                setShowAddManual(true)
              }}
              className='btn btn-sm '
            >
              Tạo đơn
            </button>

            <Popover className='z-0 relative'>
              {({open}) => (
                <>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 -translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 -translate-y-1'
                  >
                    <Popover.Panel className='absolute z-10 inset-x-0 transform shadow-lg'>
                      <div className='absolute inset-0 flex' aria-hidden='true'>
                        <div className='bg-white w-full' />
                      </div>
                      <div className='relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2'>
                        <nav
                          className='grid gap-y-10 px-4 py-8 bg-white'
                          aria-labelledby='solutions-heading'
                        >
                          <div>
                            <ul role='list' className='space-y-2 flex flex-col'>
                              {groups.map((item: Group) => {
                                return (
                                  <li
                                    key={item.id}
                                    onClick={() => {
                                      selectGroup(item)
                                    }}
                                    className='flex-1 w-96 cursor-pointer hover:text-blue focus:bg-blue'
                                  >
                                    {item.name}{' '}
                                    <button
                                      className='w-12 rounded-sm bg-danger text-white p-1 ml-5 cursor-pointer '
                                      onClick={() => {
                                        if (
                                          window.confirm('bạn có chắc chắn muốn xóa nhóm này') ==
                                          true
                                        ) {
                                          dispatch(actions.deleteGroupRequest(item.id))
                                        }
                                      }}
                                    >
                                      Xóa
                                    </button>
                                  </li>
                                )
                              })}
                            </ul>
                            <div>
                              <div className='mt-1 flex rounded-md shadow-sm w-80'>
                                <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                                  <input
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300'
                                    placeholder='Nhập tên nhóm '
                                  />
                                </div>
                                <button
                                  type='button'
                                  onClick={addGroup}
                                  className='-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                                >
                                  <SortAscendingIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                  <span>Thêm</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      onChange={(evt) => {
                        dispatch(actions.checkedAllChange(evt.target.checked))
                      }}
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-13-check'
                    />
                  </div>
                </th>
                <th className='min-w-10px text-sm'>
                  <span className='text-sm'>STT</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span className='text-sm'># Tênh kênh</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span className='text-sm'>Đang chạy</span>
                </th>
                <th className='min-w-10px text-sm'>
                  <span className='text-sm'>Status</span>
                </th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {orders &&
                orders.map((order: OrderModel, index: number) => {
                  if (currentGroup === undefined) {
                    return (
                      <OrderItem
                        index={index}
                        showEdit={role === 'ROLE_ADMIN'}
                        key={order.channel_id}
                        item={order}
                      />
                    )
                  }
                  if (order.group_id === currentGroup.id) {
                    return (
                      <OrderItem
                        index={index}
                        showEdit={role === 'ROLE_ADMIN'}
                        key={order.channel_id}
                        item={order}
                      />
                    )
                  }
                  return null
                })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
      {showAdd && (
        <AddModal
          show={true}
          close={() => {
            setShowAdd(false)
          }}
        />
      )}

      <EditMulti
        show={showEditMulti}
        close={() => {
          setShowEditMulti(false)
        }}
      />
      <AddManualModal
        show={showAddManual}
        close={() => {
          setShowAddManual(false)
        }}
      />
    </div>
  )
}

export {OrderList}
