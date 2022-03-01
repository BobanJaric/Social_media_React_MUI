import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';

import { useHttpClient } from '../shared/hooks/http-hook';

import MediaCard from '../shared/components/UIElements/Card';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import './Posts.css';

const Posts = () => {

    const { isLoading,  sendRequest } = useHttpClient();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:3000/posts`, 'GET', null);
                setPosts(responseData);
            } catch (err) {

            }
        };
        fetchPosts();

    }, [sendRequest]);


    return (<React.Fragment>

        {isLoading && (
            <div className="center" >
                <CircularProgress />
            </div>
        )}
        <Grid container justifyContent="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
            {!isLoading && posts.map(post => (
                <MediaCard post={post} key={post.id} />
            )
            )}
            <Outlet />
        </Grid>
    </React.Fragment>
    );
}

export default Posts;