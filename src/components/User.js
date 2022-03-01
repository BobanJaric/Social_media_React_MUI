import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

import { useHttpClient } from '../shared/hooks/http-hook';

import './Posts.css';

const User = () => {

    const { isLoading, sendRequest } = useHttpClient();
    const [user, setUser] = useState([]);

    const userId = useParams().userId;

    useEffect(() => {
        const fetchUser = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:3000/users/${userId}?_embed=posts&?_embed=friends`, 'GET', null);
                setUser(responseData);
            } catch (err) {

            }
        };
        fetchUser();

    }, [sendRequest, userId]);
    console.log(user);

    return (<React.Fragment>
        {isLoading && (
            <div className="center" >
                <CircularProgress />
            </div>
        )}
        <div key={user.id}>
            <Avatar
                alt={user.name}
                src={user.img}
                sx={{ width: 100, height: 100 }}
            />
            <p>{user.name}</p>
        </div>
    </React.Fragment>
    );
}

export default User;