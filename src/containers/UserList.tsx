import React, { Fragment, useEffect, useState } from 'react';
import './UserList.css'
import * as UserSlice from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  Col, Container, Row } from 'react-bootstrap';
import { MONTHS } from '../services/user.service';
import UsersList from '../components/UsersList';
import UserModel from '../components/UserModel';


function UserList() {
    const dispatch = useDispatch();
    const usersList = useSelector(UserSlice.selectUser);
    const selectedUserActivity = useSelector(UserSlice.selectUserActivity);
    const [show, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [dateValue, setDateValue] = useState<Date>(new Date());
    const [selectedUserId, setSelectedUserId] = useState('');
    

    const handleClose = () => {
        setShow(false);
        setSelectedUserId('')
        setToggle(false)
        setDateValue(new Date());
    }
    const handleShow = () => setShow(true);
    

    

    const handleUserClick = (userId: string) => {
        setSelectedUserId(userId);
    }

    const getUserById = () => {
        if (!selectedUserId) {
            return;
        }
        if (toggle) {
            let data = null;
            let payLoad: any = { id: selectedUserId }
            if (dateValue) {
                data = {
                    month: MONTHS[dateValue.getMonth()],
                    day: dateValue.getDate(),
                    year: dateValue.getFullYear()
                }
                payLoad['filterDate'] = data
            }

            dispatch(UserSlice.selectUserById(payLoad));
        } else {
            dispatch(UserSlice.selectUserById({ id: selectedUserId }));
        }

    }

    useEffect(() => {

        if (selectedUserId) {
            getUserById();
            handleShow();
        }
    }, [selectedUserId, dateValue, toggle])

    
    const getData = () => {
        dispatch(UserSlice.getUsers());
    }
    const handleToggle = () => {
        setToggle(!toggle);
        getData();
    }

    useEffect(() => {
        getData();
    }, []);

    let month = (dateValue.getMonth() + 1).toString();
    month = month.length === 2 ? month : '0' + month;
    const year = dateValue.getFullYear();
    let date = (dateValue.getDate()).toString();
    date = date.length === 2 ? date : '0' + date;

    const handleDateValue = (date: string) => {
        const temp = date.split('-');

        let month = +temp[1] - 1
        const y = new Date(`${MONTHS[month]} ${temp[0]}, ${temp[2]}`);;
        setDateValue(y)
    }


    return (
        <Fragment>
            <Container className="mt-5">
                <UserModel 
                    show={show} 
                    toggle={toggle} 
                    selectedUserActivity={selectedUserActivity}
                    date={`${year}-${month}-${date}`}
                    handleClose={handleClose}
                    handleToggle={handleToggle}
                    handleDateValue={(val) => handleDateValue(val)}
                    />

                <Col xs="12">
                    <Row>
                        <UsersList userList={usersList} getSelectedUser={(id) => handleUserClick(id)}/>
                    </Row>
                </Col>
            </Container>
        </Fragment>
    );
}

export default UserList;