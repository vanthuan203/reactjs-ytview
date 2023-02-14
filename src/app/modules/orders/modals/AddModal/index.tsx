import React, { useState, useEffect } from 'react'
import { KTSVG, toAbsoluteUrl } from '_metronic/helpers'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/OrdersRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Modal,
  Form, FormGroup, Input, Label
} from "reactstrap"
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from 'setup'
import { Group } from '../../models/Order'
type Props = {
  show: boolean
  close: () => void
}

const AddModal: React.FC<Props> = ({ show, close }) => {
  const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
  const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
  const adding: boolean = useSelector<RootState>(({ orders }) => orders.adding, shallowEqual) as boolean || false
  const groups: Group[] = useSelector<RootState>(({ orders }) => orders.groups, shallowEqual) as Group[] || []


  const dispatch = useDispatch()
  const [max_thread, setMax_thread] = useState(100)
  const [channel_id, setChannel_id] = useState("")
  //const [list_video, setList_video] = useState("")
  //
  const [view_need, setView_need] = useState(1000)
  const [premium_rate,setPremium_rate]=useState(5)
  const [view_percent,setView_percent]=useState(4000)
  //
  const [home_rate,setHome_rate]=useState(0)
  const [search_rate,setSearch_rate]=useState(80)
  const [suggest_rate,setSuggest_rate]=useState(0)
  const [direct_rate,setDirect_rate]=useState(20)
  //
  const [like_rate,setLike_rate]=useState(25)
  const [comment_rate,setComment_rate]=useState(25)
  const [mobile_rate,setMobile_rate]=useState(0)
  //
  const [note, setNote] = useState("")
  const [keyword, setKeyword] = useState("")
  const [comment_list, setComment_list] = useState("")
  const [group_id, setGroup] = useState(0)
  //
  const [enabled,setEnabled]=useState(1)


  const dismissModal = () => {
    dispatch(actions.clearcurrentOrder())
  }

  const submit = () => {

    if (channel_id.trim() === "") {
      alert("Điền list kênh cần chạy")
      return
    }
    if(home_rate+search_rate+suggest_rate+direct_rate !=100){
      alert("Tổng nguồn view không đúng")
      return
    }

    if(view_percent>10000000||view_percent<0){
      alert("phần trăm xem video không đúng")
      return
    }
    dispatch(actions.addOrderRequest({
      channel_id,
      home_rate,
      //note: string,
      direct_rate,
      //view_need: number,
      //comment_rate: number,
      //mobile_rate: number,
      search_rate,
      enabled,
      max_thread,
      view_percent,
      //group_id: number,
      //like_rate: number,
      //comment_list: string,
      suggest_rate,
      //premium_rate: number,
    }))

  }

  useEffect(() => {
    if (!adding) {
      close()
    }
  }, [adding])

  return (
      <Modal isOpen={show}
             modalTransition={{ timeout: 500 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thêm nhiệm vụ với danh sách kênh</h5>
            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
              <span className="svg-icon svg-icon-2x"></span>
            </div>
          </div>
          <div className="modal-body">
            <p>Cài đặt đơn</p>
            <Form>
              <FormGroup>
                <Label for="exampleEmail" className="required form-label">
                  Danh sách id kênh cần chạy sub
                </Label>
                <Input
                    id="list_id"
                    name="list_id"
                    className="form-control form-control-solid"
                    placeholder={"Id kênh"}
                    value={channel_id}
                    type={"textarea"}
                    onChange={(e) => setChannel_id(e.target.value)}
                />
              </FormGroup>
              <p>Nguồn view tổng = 100%</p>
              <div className='flex flex-row justify-between space-x-3'>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Home
                  </Label>
                  <Input
                      id="home_rate"
                      name="home_rate"
                      value={home_rate}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      onChange={(e) => setHome_rate(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Search
                  </Label>
                  <Input
                      id="search_rate"
                      name="search_rate"
                      value={search_rate}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      onChange={(e) => setSearch_rate(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Suggest
                  </Label>
                  <Input
                      id="suggest_rate"
                      name="suggest_rate"
                      value={suggest_rate}
                      disabled={role === "ROLE_ADMIN" ? false : true}
                      onChange={(e) => setSuggest_rate(parseInt(e.target.value))}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Direct
                  </Label>
                  <Input
                      id="direct_rate"
                      name="direct_rate"
                      value={direct_rate}
                      disabled={role === "ROLE_ADMIN" ? false : true}
                      onChange={(e) => setDirect_rate(parseInt(e.target.value))}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      type="number"
                  />
                </FormGroup>
              </div>
              <p>Cài đặt tương tác</p>
              <div className='flex flex-row justify-between space-x-3'>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Tỉ lệ Like
                  </Label>
                  <Input
                      id="like_rate"
                      name="like_rate"
                      value={like_rate}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      onChange={(e) => setLike_rate(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Tỉ lệ comment
                  </Label>
                  <Input
                      id="comment_rate"
                      name="comment_rate"
                      value={comment_rate}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      onChange={(e) => setComment_rate(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Luồng max
                  </Label>
                  <Input
                      id="max_thread"
                      name="max_thread"
                      value={max_thread}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 1000"
                      onChange={(e) => setMax_thread(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Time Buff(h)
                  </Label>
                  <Input
                      id="mobile_rate"
                      name="mobile_rate"
                      value={view_percent}
                      className="form-control form-control-solid"
                      placeholder="ví dụ : 100"
                      onChange={(e) => setView_percent(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label for="exampleEmail" className="required form-label">
                  Trạng thái
                </Label>
                <Input
                    onChange={(e) => setEnabled(parseInt(e.target.value))}
                    className="form-control form-control-solid"
                    type="select"
                    value={enabled}
                >
                  <option key={1} value={1}>
                    {"Chạy"}
                  </option>
                  <option key={0} value={0}>
                    {"Ngừng"}
                  </option>
                </Input>
              </FormGroup>
            </Form>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={close} className="btn btn-light" >Thoát</button>
            <button disabled={adding} type="button" onClick={submit} className="btn btn-primary">{adding ? "Chờ" : "Thêm đơn"}</button>
          </div>
        </div>
      </Modal>
  )
}

export default AddModal