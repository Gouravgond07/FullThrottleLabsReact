import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Modal from 'react-bootstrap/esm/Modal';
import Row from 'react-bootstrap/esm/Row';
import './UserModel.css';

interface SelectedUserActivity{
    date: string;
    startTime: string | undefined;
    endTime: string | undefined;
    dateObj: Date;
}

interface Props {
    show: boolean;
    toggle: boolean;
    selectedUserActivity: SelectedUserActivity[];
    date: string
    handleClose: () => void;
    handleToggle: () => void;
    handleDateValue: (data: any) => void;
}

function UserModelBody(props: {selectedUserActivity: SelectedUserActivity[]}) {
    const { selectedUserActivity } = props
    return (
        <>
            {selectedUserActivity.length === 0 ? <Col xs="12" className="text-center"><h4>No Activity Periods Found</h4></Col> : null}
                            {
                                selectedUserActivity.map((x, index) =>
                                    <Col xs={12} sm={9} className="m-auto" key={index}>
                                        <Row className="my-2 justify-content-center">
                                            <Col xs="4">
                                                <h4 style={{ color: 'green' }}>{x.date.replace(x.dateObj.getFullYear().toString(), '')}</h4>
                                                <h4 style={{ color: '#00000096' }}>{x.dateObj.getFullYear().toString()}</h4>
                                            </Col>
                                            <Col xs="8" className="d-flex align-items-center">
                                                <h5 style={{ color: '#00000096' }}>{x.startTime} to {x.endTime}</h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            }
        </>
    )
}




function UserModel(props: Props) {
    const {show, toggle, date, selectedUserActivity,handleClose, handleToggle, handleDateValue} = props;
    return (
        <Modal show={show} onHide={handleClose} centered={true}>
                    <Modal.Header closeButton>
                        <Row className="w-100">
                            <Col xs="12" className="text-center">
                                <Modal.Title>Activity Periods</Modal.Title>
                            </Col>
                            <Col xs="12" className="mt-3 d-flex justify-content-center">
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <p className="m-0">Date Filter</p>
                                        <label className="switch mx-3">
                                            <input type="checkbox" checked={toggle} onChange={handleToggle} />
                                            <span className="slider round"></span>
                                        </label>
                                    </Col>
                                    <Col xs="12" className="text-center">
                                        {
                                            toggle ? <input className="dateSelector" type="date" value={date} onChange={(evt) => handleDateValue(evt.target.value)} style={{ border: '0px' }} /> : null
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body className="userModelBody">
                        <Row>
                            <UserModelBody selectedUserActivity ={selectedUserActivity}/>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
    )
}


export default UserModel;