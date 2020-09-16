import React from 'react';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import './UserListItem.css';
interface Props {
    getClickedUserId(): void,
    id: string,
    real_name: string
}


function UserListItem(props: Props) {
    return (
        <ListGroupItem className="shadow-lg p-3 mb-3 bg-white rounded user-list" onClick={props.getClickedUserId}>
                <p># {props.id}</p>
                <h4>{props.real_name}</h4>
        </ListGroupItem>
    )
}

export default UserListItem;