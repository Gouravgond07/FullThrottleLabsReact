import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import UserListItem from './UserListItem';

interface PropsUser {
    id: string;
    real_name: string;
}

interface Props {
    userList: PropsUser[];
    getSelectedUser(id: string): void;
}

function UsersList(props: Props) {
    return (
        <ListGroup style={{ width: '100%' }}>
            {
                props.userList.map((x, index) => (
                    <UserListItem 
                        key={index} 
                        id={x.id} 
                        real_name={x.real_name} 
                        getClickedUserId={() => props.getSelectedUser(x.id)} />
                ))
            }
        </ListGroup>
    );
}

export default UsersList;