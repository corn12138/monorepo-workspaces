import React from 'react';

import { connect } from 'react-redux'; //引入connect

interface Props {
        users: string[];
}

const useList:React.FC<Props> = ({users}) => {
    return (
        <>
            <ul>
                {
                    users.map((user, index) => {
                        return <li key={index}>{user}</li>
                    })
                }
            </ul>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps)(useList);   //连接redux