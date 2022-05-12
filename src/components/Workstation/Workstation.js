import React, { useState, useEffect } from 'react';
import WSAv from '../../hooks/WSSrvc';
import { STATUS_LBL, STATUS_CLR, WS_SLOTS } from "../../utils/constants"; // STATUS_LBL = ['Unavailable', 'Available'];  --  const STATUS_CLR = ['green', 'red'];

import { Container, Table, Button, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { MdOutlineDesktopMac } from 'react-icons/md';

import Wsi from '../../assets/i/favicon.png';
import './Workstation.scss';

export default function Workstation(props) {
    // Assuming we've received this props
    props = {id: 247623, deskNo: 4, status: 0, usr: 400140};
    props = {id: 247623, deskNo: 4, status: 1, usr: null};

    // Props for Workstation
    const {id, deskNo, status, usr} = props;

    // Workstation Slots Blocked { Availability for WS }
    // const wsAvList = WSAv('https://jsonplaceholder.typicode.com/todos/');
    // console.log(wsAvList);

    // State for WS Pick Component
    const [pickWS, setpickWS] = useState(status ? 1 : 0);
    const ocWSPick = () => setpickWS(!status ? 1 : 0); // const ocWSPick = () => {setpickWS(!status ? 1 : 0); setstatusWS(!status)};
    props.pickWS = pickWS;
    props.ocWSPick = ocWSPick;

    useEffect(() => {

        document.title = `Invicara - WS ${deskNo} is ${STATUS_LBL[pickWS]}`;

      });

    return(
        <div className="ws">
            <Container>
                <div className="ws__mainHead"><img src={Wsi} alt="Invicara"/><span className="ws__lblMain">Invicara Workstation Hub</span></div>
                <hr />
                <WSInfoGrid wsData={props} />
            </Container>
        </div>
    )

} // Main

function WSInfoGrid(props) {

    const {wsData: {id, deskNo, usr, pickWS, ocWSPick}} = props;
    const wsStyClr = {color: STATUS_CLR[pickWS]};

    let usrLbl = 'User: ' + usr;

    if (pickWS === 1) {
        usrLbl = 'Available';
    } else {
        usrLbl = 'Not Available';
    }


    return (
        <div>

            <Container className="p-10">
                <Row>
                    <Col sm={2}>

                        <Row>
                            <Col sm={12}>
                                <OverlayTrigger overlay={<Tooltip>{usrLbl}</Tooltip>} placement="bottom">
                                    <span className="d-flex align-items-center justify-content-center" style={{fontSize: '5rem'}}><MdOutlineDesktopMac style={wsStyClr}/></span>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row style={{ display: pickWS ? "block" : "none" }}>
                            <Col sm={12}>
                                <span className="d-flex align-items-center justify-content-center">
                                    <WSPick ocWSPick={ocWSPick} />
                                </span>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={5}>

                        <Row>
                            <Col sm={3} className="ws-grid__lbl">Status:</Col>
                            <Col sm={3} className="ws-grid__data" style={wsStyClr}>{STATUS_LBL[pickWS]}</Col>
                        </Row>
                        <Row>
                            <Col sm={3} xm={3} className="ws-grid__lbl">WS ID:</Col>
                            <Col sm={3} xm={3} className="ws-grid__data">{id}</Col>
                        </Row>
                        <Row>
                            <Col sm={3} className="ws-grid__lbl">Desk No.:</Col>
                            <Col sm={3} className="ws-grid__data">{deskNo}</Col>
                        </Row>

                    </Col>

                    <Col sm={5}>
                        <WSSlots />
                    </Col>

                </Row>

            </Container>

        </div>
    )

} // WSInfoGrid()

function WSPick(props) {

    const { ocWSPick } = props;

    return (
        <div className="WSPick">
            <Button variant="outline-success" size="sm" onClick={ocWSPick}>Pick it !</Button>{' '}
        </div>

    )

} // WSPick()

function WSSlots() {

    return (
        <div>
            <small><span style={{color: 'red', fontWeight: 'bold'}}>WS Unavailable Slots</span>
            <table className="table" width={4}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        WS_SLOTS.map((item) => (
                            <tr key={item.id}>
                                <td>{item.date} {item.start}</td>
                                <td>{item.idUser}</td>
                                <td/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </small>
        </div>
    )

} // WSSlots()