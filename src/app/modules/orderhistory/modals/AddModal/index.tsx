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
  const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
  const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
  const adding: boolean = useSelector<RootState>(({ orderhistory }) => orderhistory.adding, shallowEqual) as boolean || false
  const groups: Group[] = useSelector<RootState>(({ orderhistory }) => orderhistory.groups, shallowEqual) as Group[] || []


  const dispatch = useDispatch()
  const [maxthreads, setMaxthreads] = useState(100)
  const [videoid, setVideoid] = useState("")
  //const [list_video, setList_video] = useState("")
  //
  const [view_need, setView_need] = useState(1000)
  const [premium_rate,setPremium_rate]=useState(5)
  const [view_percent,setView_percent]=useState(4000)
  //
  const [homerate,setHome_rate]=useState(0)
  const [searchrate,setSearch_rate]=useState(80)
  const [suggestrate,setSuggest_rate]=useState(0)
  const [directrate,setDirect_rate]=useState(20)
  const [user,setUser]=useState(username)
  const [likerate,setLike_rate]=useState(25)
  const [commentrate,setComment_rate]=useState(25)
  const [mobilerate,setMobile_rate]=useState(0)
  const [optionbuff, setOptionbuff] = useState(10)
  const [note, setNote] = useState("")
  const [viewstart, setViewstart] = useState(0)
  const [timebuff, setTimebuff] = useState(0)
  //
  const [enabled,setEnabled]=useState(1)


  const dismissModal = () => {
    dispatch(actions.clearcurrentOrder())
  }

  const submit = () => {

    if (videoid.trim() === "") {
      alert("??i???n list k??nh c???n ch???y")
      return
    }
    if(homerate+searchrate+suggestrate+directrate !=100){
      alert("T???ng ngu???n view kh??ng ????ng")
      return
    }

    if(view_percent>10000000||view_percent<0){
      alert("ph???n tr??m xem video kh??ng ????ng")
      return
    }
    dispatch(actions.addOrderRequest({
      videoid,
      homerate,
      note,
      directrate,
      commentrate,
      mobilerate,
      searchrate,
      enabled,
      maxthreads,
      viewstart,
      likerate,
      suggestrate,
      timebuff,
      optionbuff,user
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
            <h5 className="modal-title">Th??m nhi???m v??? v???i danh s??ch k??nh</h5>
            <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
              <span className="svg-icon svg-icon-2x"></span>
            </div>
          </div>
          <div className="modal-body">
            <p>C??i ?????t ????n</p>
            <Form>
              <FormGroup>
                <Label for="exampleEmail" className="required form-label">
                  Danh s??ch id k??nh c???n ch???y sub
                </Label>
                <Input
                    id="list_id"
                    name="list_id"
                    className="form-control form-control-solid"
                    placeholder={"Id k??nh"}
                    value={videoid}
                    type={"textarea"}
                    onChange={(e) => setVideoid(e.target.value)}
                />
              </FormGroup>
              <p>Ngu???n view t???ng = 100%</p>
              <div className='flex flex-row justify-between space-x-3'>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Home
                  </Label>
                  <Input
                      id="home_rate"
                      name="home_rate"
                      value={homerate}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
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
                      value={searchrate}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
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
                      value={suggestrate}
                      disabled={role === "ROLE_ADMIN" ? false : true}
                      onChange={(e) => setSuggest_rate(parseInt(e.target.value))}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
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
                      value={directrate}
                      disabled={role === "ROLE_ADMIN" ? false : true}
                      onChange={(e) => setDirect_rate(parseInt(e.target.value))}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
                      type="number"
                  />
                </FormGroup>
              </div>
              <p>C??i ?????t t????ng t??c</p>
              <div className='flex flex-row justify-between space-x-3'>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    T??? l??? Like
                  </Label>
                  <Input
                      id="like_rate"
                      name="like_rate"
                      value={likerate}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
                      onChange={(e) => setLike_rate(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    T??? l??? comment
                  </Label>
                  <Input
                      id="comment_rate"
                      name="comment_rate"
                      value={commentrate}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
                      onChange={(e) => setComment_rate(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail" className="required form-label">
                    Lu???ng max
                  </Label>
                  <Input
                      id="max_thread"
                      name="max_thread"
                      value={maxthreads}
                      className="form-control form-control-solid"
                      placeholder="v?? d??? : 1000"
                      onChange={(e) => setMaxthreads(parseInt(e.target.value))}
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
                      placeholder="v?? d??? : 100"
                      onChange={(e) => setView_percent(parseInt(e.target.value))}
                      type="number"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Label for="exampleEmail" className="required form-label">
                  Tr???ng th??i
                </Label>
                <Input
                    onChange={(e) => setEnabled(parseInt(e.target.value))}
                    className="form-control form-control-solid"
                    type="select"
                    value={enabled}
                >
                  <option key={1} value={1}>
                    {"Ch???y"}
                  </option>
                  <option key={0} value={0}>
                    {"Ng???ng"}
                  </option>
                </Input>
              </FormGroup>
            </Form>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={close} className="btn btn-light" >Tho??t</button>
            <button disabled={adding} type="button" onClick={submit} className="btn btn-primary">{adding ? "Ch???" : "Th??m ????n"}</button>
          </div>
        </div>
      </Modal>
  )
}

export default AddModal