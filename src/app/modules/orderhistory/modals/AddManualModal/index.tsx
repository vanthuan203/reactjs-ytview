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

const AddManualModal: React.FC<Props> = ({ show, close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const adding: boolean = useSelector<RootState>(({ orderhistory }) => orderhistory.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ orderhistory }) => orderhistory.groups, shallowEqual) as Group[] || []

    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(100)
    const [videoid, setVideoid] = useState("")
    const [homerate,setHome_rate]=useState(0)
    //
    const [searchrate,setSearch_rate]=useState(80)
    const [suggestrate,setSuggest_rate]=useState(0)
    const [directrate,setDirect_rate]=useState(20)
    //
    const [likerate,setLike_rate]=useState(25)
    const [commentrate,setComment_rate]=useState(25)
    const [mobilerate,setMobile_rate]=useState(0)
    const [user,setUser]=useState(username)
    const [note, setNote] = useState("")
    const [viewstart, setViewstart] = useState(0)
    const [timebuff, setTimebuff] = useState(4000)
    const [optionbuff, setOptionbuff] = useState(0)
    const [enabled,setEnabled]=useState(1)


    const dismissModal = () => {
        dispatch(actions.clearcurrentOrder())
    }
    
    const submit = () => {


        if (videoid.trim() === "") {
            alert("VideoId không để trống!")
            return
        }
        if(homerate+searchrate+suggestrate+directrate !=100){
            alert("Tổng nguồn view không đúng!")
            return
        }

        async function getcounts(){
            let videoidlist=videoid.split('\n')
            for (var i = 0; i < videoidlist.length; i++) {
                const requestUrl = 'http://localhost:8000/videobuffh/checkduration?listvideo='+videoidlist[i];
                const response= await fetch(requestUrl,{
                    method: 'get',
                    headers: new Headers({
                        'Authorization': '1',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                });
                const responseJson= await  response.json();
                const {duration}=responseJson;
                if(duration<optionbuff){
                    alert("VideoId không để trống!"+duration.toString())
                }

            }


        }
        //getcounts()
        dispatch(actions.addOrderManualRequest({
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
            optionbuff,
            user
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
                    <h5 className="modal-title">Thêm nhiệm vụ với danh sách VideoId</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body">
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Danh sách VideoId
                            </Label>
                            <Input style={{height:200}}
                                id="list_id"
                                name="list_id"
                                className="form-control form-control-solid"
                                placeholder={"1 VideoId một dòng!"}
                                value={videoid}
                                type={"textarea"}
                                onChange={(e) => setVideoid(e.target.value)}
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
                                    value={homerate}
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
                                    value={searchrate}
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
                                    value={suggestrate}
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
                                    value={directrate}
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
                                    % Like
                                </Label>
                                <Input
                                    id="like_rate"
                                    name="like_rate"
                                    value={likerate}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setLike_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Comment
                                </Label>
                                <Input
                                    id="comment_rate"
                                    name="comment_rate"
                                    value={commentrate}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setComment_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    % Mobile
                                </Label>
                                <Input
                                    id="mobilerate"
                                    name="mobilerate"
                                    value={mobilerate}
                                    className="form-control form-control-solid"
                                    onChange={(e) => setMobile_rate(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Luồng
                                </Label>
                                <Input
                                    id="max_thread"
                                    name="max_thread"
                                    value={maxthreads}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 1000"
                                    onChange={(e) => setMaxthreads(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className="required form-label">
                                    Time(h)
                                </Label>
                                <Input
                                    id="timebuffh"
                                    name="timebuffh"
                                    value={timebuff}
                                    className="form-control form-control-solid"
                                    placeholder="ví dụ : 100"
                                    onChange={(e) => setTimebuff(parseInt(e.target.value))}
                                    type="number"
                                />
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail" >
                                    Ghi chú
                                </Label>
                                <Input
                                    id="note"
                                    name="note"
                                    value={note}
                                    className="form-control form-control-solid"
                                    placeholder="..."
                                    onChange={(e) => setNote(e.target.value)}
                                    type="text"
                                />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Chế độ buff
                            </Label>
                            <Input
                                onChange={(e) => setOptionbuff(parseInt(e.target.value))}
                                className="form-control form-control-solid"
                                type="select"
                                value={optionbuff}
                            >
                                <option key={10} value={10}>
                                    {"10 phút"}
                                </option>
                                <option key={30} value={30}>
                                    {"30 phút"}
                                </option>
                                <option key={60} value={60}>
                                    {"60 phút"}
                                </option>
                                <option key={120} value={120}>
                                    {"120 phút"}
                                </option>
                                <option key={0} value={0}>
                                    {"Auto"}
                                </option>
                            </Input>

                        </FormGroup>
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
                                <option key={2} value={2}>
                                    {"Test1"}
                                </option>
                                <option key={3} value={3}>
                                    {"Test2"}
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
                    <button disabled={adding} style={{color:'white',backgroundColor:"#26695c"}}  type="button" onClick={submit} className="btn btn-primary">{adding ? "Chờ" : "Thêm đơn"}</button>
                </div>
            </div>
        </Modal>
    )
}

export default AddManualModal