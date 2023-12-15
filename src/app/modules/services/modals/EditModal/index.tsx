import React, {useState, useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {AccountModel} from 'app/modules/services/models/Account'
import {useDispatch} from 'react-redux'
import {actions} from '../../redux/AccountRedux'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody, Input, FormGroup, Label
} from "reactstrap"


type Props = {
    item: AccountModel
}

function format1(n: number) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

const EditModal: React.FC<Props> = ({item}) => {
    const dispatch = useDispatch()
    const API_URL = process.env.REACT_APP_API_URL
    const [min, setmin] = useState(item.min)
    const [max, setmax] = useState(item.max)
    const [rate, setrate] = useState(item.rate)
    const [geo, setgeo] = useState(item.geo)
    const [name, setname] = useState(item.name)
    const [enabled, setenabled] = useState(item.enabled)
    const [maxorder, setmaxorder] = useState(item.maxorder)
    const [search, setsearch] = useState(item.search)
    const [suggest, setsuggest] = useState(item.suggest)
    const [dtn, setdtn] = useState(item.dtn)
    const [direct, setdirect] = useState(item.direct)
    const [external, setexternal] = useState(item.external)
    const [embed, setembed] = useState(item.embed)
    const [mintime, setmintime] = useState(item.mintime)
    const [maxtime, setmaxtime] = useState(item.maxtime)
    const [refill, setrefill] = useState(item.refill)
    const [maxtimerefill, setmaxtimerefill] = useState(item.maxtimerefill)
    const [thread, setthread] = useState(item.thread)
    const [type, settype] = useState(item.type)
    const [live, setlive] = useState(item.live)
    const [checktime, setchecktime] = useState(item.checktime)

    const dismissModal = () => {
        dispatch(actions.clearCurrentAccount())
    }
    const updateUser = () => {
        if (rate < 0) {
            alert("rate phải lớsn hơn 0!")
            return
        }
        if (min < 0) {
            alert("Giá trị min không hợp lệ!")
            return
        }
        if (max < 0) {
            alert("Giá trị max không hợp lệ!")
            return
        }
        dispatch(actions.requestUpdate({
            ...item,
            min,
            max,
            rate,
            name,
            geo,
            enabled,
            maxorder,
            search,
            suggest,
            dtn,
            direct,
            external,
            embed,
            mintime,
            maxtime,
            maxtimerefill,
            refill,
            thread,
            type,
            live,
            checktime,
        }))
    }

    return (
        <Modal isOpen={true}
               modalTransition={{timeout: 500}}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 style={{fontWeight: 'bold', fontFamily: 'monospace'}}
                        className="modal-title">Update Service: {item?.service}</h3>
                    <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" aria-label="Close">
                        <span className="svg-icon svg-icon-2x"></span>
                    </div>
                </div>
                <div className='modal-body'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Name Service
                        </Label>
                        <Input style={{fontWeight: 'bold'}} value={name} type="text" className="form-control"
                               aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={(e) => setname(e.target.value)}></Input>
                    </FormGroup>

                </div>
                <div className='modal-body flex flex-row justify-between space-x-6'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Suggest
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={suggest}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setsuggest(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Search
                        </Label>
                        <Input
                            id="search"
                            name="search"
                            value={search}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setsearch(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Browse Features
                        </Label>
                        <Input
                            id="dtn"
                            name="dtn"
                            value={dtn}
                            onChange={(e) => setdtn(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            External
                        </Label>
                        <Input
                            id="external"
                            name="external"
                            value={external}
                            onChange={(e) => setexternal(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Embed
                        </Label>
                        <Input
                            id="embed"
                            name="embed"
                            value={embed}
                            onChange={(e) => setembed(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Direct
                        </Label>
                        <Input
                            id="direct"
                            name="direct"
                            value={direct}
                            onChange={(e) => setdirect(parseInt(e.target.value))}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            type="number"
                        />
                    </FormGroup>
                </div>
                <div className='modal-body flex flex-row justify-between space-x-6'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Min Quantity
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={min}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setmin(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Quantity
                        </Label>
                        <Input
                            id="search"
                            name="search"
                            value={max}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setmax(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Orders
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={maxorder}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setmaxorder(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Default Threads
                        </Label>
                        <Input
                            id="thread"
                            name="thread"
                            value={thread}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setthread(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Min Retention
                        </Label>
                        <Input
                            id="suggest"
                            name="suggest"
                            value={mintime}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setmintime(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Retention
                        </Label>
                        <Input
                            id="maxtime"
                            name="maxtime"
                            value={maxtime}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setmaxtime(parseInt(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                </div>


                <div className='modal-body flex flex-row justify-between space-x-8'>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Live-Pre
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setlive(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={live}
                        >
                            <option key={"0"} value={0}>
                                No
                            </option>
                            <option key={"1"} value={1}>
                                Yes
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Geo
                        </Label>
                        <Input
                            id="thread"
                            name="thread"
                            value={geo}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setgeo(e.target.value)}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Type Service
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => settype(e.target.value)}
                               className="form-control form-control-solid"
                               type="select"
                               value={type}
                        >
                            <option key={"Default"} value={"Default"}>
                                Default
                            </option>
                            <option key={"Special"} value={"Special"}>
                                Special
                            </option>
                            <option key={"Custom Comments"} value={"Custom Comments"}>
                                Custom Comments
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Guarantee
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setrefill(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={refill}
                        >
                            <option key={"1"} value={1}>
                                Yes Guarantee
                            </option>
                            <option key={"0"} value={0}>
                                No Guarantee
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Max Day Refill
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setmaxtimerefill(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={maxtimerefill}
                        >
                            <option key={"0"} value={0}>
                                No Refill
                            </option>
                            <option key={"7"} value={7}>
                                7 days Refill
                            </option>
                            <option key={"15"} value={15}>
                                15 days Refill
                            </option>
                            <option key={"30"} value={30}>
                                30 days Refill
                            </option>
                            <option key={"60"} value={60}>
                                60 days Refill
                            </option>
                            <option key={"90"} value={90}>
                                90 days Refill
                            </option>
                            <option key={"-1"} value={-1}>
                                Lifetime
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Check Time
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setchecktime(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={checktime}
                        >
                            <option key={"1"} value={1}>
                                Yes
                            </option>
                            <option key={"0"} value={0}>
                                No
                            </option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Rate($)
                        </Label>
                        <Input
                            id="rate"
                            name="rate"
                            value={rate}
                            className="form-control form-control-solid"
                            placeholder="ví dụ : 100"
                            onChange={(e) => setrate(parseFloat(e.target.value))}
                            type="number"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label style={{fontWeight: 'bold'}} for="exampleEmail" className="required form-label">
                            Enabled
                        </Label>
                        <Input style={{fontWeight: "bold"}}
                               onChange={(e) => setenabled(parseInt(e.target.value))}
                               className="form-control form-control-solid"
                               type="select"
                               value={enabled}
                        >
                            <option key={"on"} value={1}>
                                ON
                            </option>
                            <option key={"off"} value={0}>
                                OFF
                            </option>
                        </Input>
                    </FormGroup>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" onClick={dismissModal} className="btn btn-light">Thoát</button>
                <button type="button" onClick={updateUser} style={{backgroundColor: "#26695c", color: "white"}}
                        className="btn ">Lưu
                </button>
            </div>

        </Modal>
    )
}

export default EditModal