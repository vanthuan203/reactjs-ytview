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
import {
    checkbhordervideoidv2,
    htordervideoidv2,
    bhordervideoidv2
} from '../../redux/OrdersCRUD'
import {randomString} from "react-inlinesvg/lib/helpers";
import {getUserByToken} from "../../../auth/redux/AuthCRUD";
import {randomInt} from "crypto";
type Props = {
    show: boolean
    close: () => void
}

const CheckBhVideoIdManualModal: React.FC<Props> = ({ show, close }) => {
    const role: string = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual) as string || ""
    const username: string = useSelector<RootState>(({ auth }) => auth.user?.username, shallowEqual) as string || ""
    const balance: number = useSelector<RootState>(({ auth }) => auth.user?.balance, shallowEqual) as number || 0
    const discount: number = useSelector<RootState>(({ auth }) => auth.user?.discount, shallowEqual) as number || 0
    const adding: boolean = useSelector<RootState>(({ orderbaohanh }) => orderbaohanh.adding, shallowEqual) as boolean || false
    const groups: Group[] = useSelector<RootState>(({ orderbaohanh }) => orderbaohanh.groups, shallowEqual) as Group[] || []

    function format1(n:number) {
        return n.toFixed(0).replace(/./g, function(c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }

    const dispatch = useDispatch()
    const [maxthreads, setMaxthreads] = useState(50)
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
    //
    const [note, setNote] = useState("")
    const [viewstart, setViewstart] = useState(0)
    const [timebuff, setTimebuff] = useState(4000)
    const [optionbuff, setOptionbuff] = useState(0)
    const [enabled,setEnabled]=useState(1)
    const [user,setUser]=useState(username)
    const [showorder,setShowOrder]=useState(true)
    const [orderdonenum,setOrderDoneNum]=useState(0)

    async function clickBHHandler (videoid:string,id:string){
        await bh_video_ver2(videoid)
        //onst newList = list_order.filter((item) => item.id.indexOf(id)<0);
        //setList_Todo(newList);
    }
    async function clickHTHandler (videoid:string,id:string){
        await ht_video_ver2(videoid)
        //onst newList = list_order.filter((item) => item.id.indexOf(id)<0);
        //setList_Todo(newList);
    }

    const [list_order,setList_Todo]=useState([{
        id:"0000000000",
        orderid:0,
        videoid:"",
        state:"",
        timestart:0,
        timeend:0,
        vieworder:0,
        viewcount:0,
        viewstart:0,
        viewbh:0,
        refund:0,

    },])
    let [sumprice,setSumPrice]=useState(0)
    let [sumtime,setSumTime]=useState(0)
    let [sumorder,setSumOrder]=useState(0)
    const dismissModal = () => {
        close()
        setShowOrder(true)
        setVideoid("")
        setSumOrder(0)
        let or={
            id:"0000000000",
            orderid:0,
            videoid:"",
            state:"",
            timestart:0,
            timeend:0,
            vieworder:0,
            viewcount:0,
            viewbh:0,
            viewstart:0,
            refund:0
        }
        setList_Todo([or])
        if(orderdonenum>0){
            if(role.indexOf("ROLE_ADMIN")>=0){
                dispatch(actions.requestOrders(''))
            }else{
                dispatch(actions.requestOrders(user))
            }
        }
        setOrderDoneNum(0)
    }
    async function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function bh_video_ver2(video: string) {
        await bhordervideoidv2(video)
            .then((data: any) => {
                if (data.data.videoview == "true") {
                    const newList = list_order.map((item) => {
                        if (item.videoid.indexOf(video) >=0
                    ) {
                            const updatedItem = {
                                ...item,
                                state: "BH thành công!",
                            };

                            return updatedItem;
                        }

                        return item;
                    });

                    setList_Todo(newList);
                } else {
                    const newList = list_order.map((item) => {
                        if (item.videoid.indexOf(video) >=0|| item.orderid==parseInt(video)
                        ) {
                            const updatedItem = {
                                ...item,
                                state: data.data.videoview
                            };
                            return updatedItem;
                        }
                        return item;
                    });
                    setList_Todo(newList);
                }
            })
            .catch(() => {
            })
    }

    async function ht_video_ver2(video: string) {
        await htordervideoidv2(video)
            .then((data: any) => {
                if (data.data.videoview == "true") {
                    const newList = list_order.map((item) => {
                        if (item.videoid.indexOf(video) >=0
                        ) {
                            const updatedItem = {
                                ...item,
                                state: "Đã hoàn "+data.data.price+ "$",
                            };

                            return updatedItem;
                        }

                        return item;
                    });

                    setList_Todo(newList);
                } else {
                    const newList = list_order.map((item) => {
                        if (item.videoid.indexOf(video) >=0|| item.orderid==parseInt(video)
                        ) {
                            const updatedItem = {
                                ...item,
                                state: data.data.videoview
                            };
                            console.log(updatedItem)
                            return updatedItem;
                        }
                        return item;
                    });
                    setList_Todo(newList);
                }
            })
            .catch(() => {
            })
    }

    async function order_video_ver2(video: string) {
            await checkbhordervideoidv2(video)
                .then((data: any) => {
                    if (data.data.videoview == "true") {
                        const index = list_order.findIndex(list_order => list_order.videoid.indexOf(data.data.videoid)>=0);
                        if(index<0){
                            setOrderDoneNum(orderdonenum + 1)
                            let orderitem = {
                                id: randomString(10),
                                videoid: data.data.videoid,
                                state: "OK",
                                timestart:data.data.timestart,
                                timeend: data.data.timeend,
                                vieworder: data.data.vieworder,
                                viewcount: data.data.viewcount,
                                viewbh: data.data.viewbh,
                                viewstart:data.data.viewstart,
                                orderid: data.data.orderid,
                                refund:data.data.refund
                            }

                            //sumprice = sumprice + data.data.price
                            //setSumPrice(sumprice)
                            //sumtime = sumtime + timebuff;
                            //setSumTime(sumtime)
                            sumorder = sumorder + 1
                            setSumOrder(sumorder)
                            setList_Todo([...list_order, orderitem])
                            list_order.push(orderitem)
                        }
                    } else {
                        let orderitem = {
                            id: randomString(10),
                            orderid:0,
                            videoid:video,
                            state:data.data.videoview,
                            timestart:0,
                            timeend:0,
                            vieworder:0,
                            viewcount:0,
                            viewstart:0,
                            viewbh:0,
                            refund:0
                        }
                        setList_Todo([...list_order, orderitem])
                        list_order.push(orderitem)
                    }

                })
                .catch(() => {
                    let orderitem = {
                        id: randomString(10),
                        orderid:0,
                        videoid:video,
                        state:"Error",
                        timestart:0,
                        timeend:0,
                        vieworder:0,
                        viewcount:0,
                        viewstart:0,
                        viewbh:0,
                        refund:0
                    }
                    setList_Todo([...list_order, orderitem])
                    list_order.push(orderitem)
                })
    }
    const  submit = async () => {
        setSumOrder(0)
        setSumTime(0)
        setSumPrice(0)
        if (videoid.trim() === "") {
            alert("VideoId không để trống!")
            return
        }

        setShowOrder(false)
        const videoidlist = videoid.split('\n')
        for (var i = 0; i < videoidlist.length; i++) {
            let video = videoidlist[i]
            const videoidOnColum = videoidlist[i].split(',')
            for(var j=0;j<videoidOnColum.length;j++)
            {
                let videos = videoidOnColum[j]
                await order_video_ver2(videos)
                await sleep(200);

            }
            //await getUserByToken()
        }
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
                <div className="modal-header" style={{display: showorder == true ? "true" : "true"}}>
                    <h5 className="modal-title">{showorder==true?'Check bảo hành với DS VideoId hoặc OrderId':'Check thành công: '+sumorder}</h5>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className="modal-body" style={{display: showorder == true ? "true" : "none"}}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail" className="required form-label">
                                Danh sách VideoId
                            </Label>
                            <Input style={{minHeight:250}}
                                id="list_id"
                                name="list_id"
                                className="form-control form-control-solid"
                                placeholder={"1 VideoId hoặc Orderid một dòng( Hoặc phân cách bằng dấu phẩy)"}
                                value={videoid}
                                type={"textarea"}
                                onChange={(e) => setVideoid(e.target.value)}
                            />
                        </FormGroup>
                    </Form>
                </div>
                <div className="modal-body">
                    <div className="card-body" style={{width: "100%"}}>
                        {/* begin::Table container */}

                        {
                            list_order.map((item, index) => {
                                if (item.videoid.length >0) return (
                                    <ul className="list-group list-group-flush" id={item.videoid+randomString(10)} key={item.videoid+randomString(10)}>
                                        <li className="list-group-item" style={{minHeight: 10}}>
                                            <div className="row">
                                                <div className="col-1 d-flex align-items-center">{index}.</div>
                                                <div className="col-1 d-flex align-items-center">
                                                            <span className='symbol-label'>
                                                              <img
                                                                  src={toAbsoluteUrl(item.state.indexOf('OK')>=0?'/media/icons/duotune/general/gen048.svg':'/media/icons/duotune/general/gen050.svg')}
                                                                  className='svg-icon-1'
                                                                  alt=''
                                                              />
                                                            </span>
                                                </div>
                                                <div className="col-1 col-sm-auto align-items-center">{item.orderid!=0?item.orderid+' | ':''}{item.videoid}</div>
                                                <div style={{color:(item.state.indexOf('OK')>=0 || item.state.indexOf('$')>=0 || item.state.indexOf('BH')>=0)?'green':'red'}} className="col-1 col-sm-auto align-items-center">{(item.refund>0?"Refunded ":"")+ item.state}</div>
                                                {item.timestart>0&&<div className="col-1 col-sm-auto align-items-center">{new Date(item.timestart).toLocaleDateString('vn-VN') +" "+ new Date(item.timestart).toLocaleTimeString('vn-VN')}</div>}
                                                {item.timestart>0&&<div className="col-1 col-sm-auto align-items-center">{new Date(item.timeend).toLocaleDateString('vn-VN') +" "+ new Date(item.timeend).toLocaleTimeString('vn-VN')}</div>}
                                                {item.timestart>0&&<div className="col-1 col-sm-auto align-items-center">{item.viewstart}</div>}
                                                {item.timestart>0&&<div className="col-1 col-sm-auto align-items-center">{item.viewcount}/{item.vieworder+item.viewstart}</div>}
                                                {item.timestart>0&&<div style={{color:item.viewbh>0?"red":"black"}} className="col-1 col-sm-auto align-items-center">
                                                    {item.viewbh>0?item.viewbh:0}
                                                </div>}
                                                {item.viewbh<=0&&<div style={{color:"green"
                                                }} className="col-1 col-sm-auto align-items-center">Không cần BH</div>}
                                                {item.viewbh>0&&<button onClick={()=>clickBHHandler(item.videoid,item.id)} style={{backgroundColor:"red",borderRadius:10,color:"white",marginRight:5}} type="button"  className="col-1 col-sm-auto align-items-center" >Bảo hành</button>}
                                                {item.viewbh>0&&<button onClick={()=>clickHTHandler(item.videoid,item.id)} style={{backgroundColor:"orange",borderRadius:10,color:"black"}} type="button"  className="col-1 col-sm-auto align-items-center" >Hoàn tiền</button>}
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        {/* end::Table container */}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={dismissModal} className="btn btn-light" >Thoát</button>
                    <button disabled={adding} type="button" onClick={submit} style={{backgroundColor:"#26695c",color:"white",display: showorder == true ? "true" : "none"}}  className="btn">{adding ? "Chờ" : "Thực hiện"}</button>
                </div>
            </div>
        </Modal>
    )
}

export default CheckBhVideoIdManualModal