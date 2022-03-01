import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import { useHttpClient } from '../shared/hooks/http-hook';

import './Posts.css';

const Post = () => {

    const { isLoading,  sendRequest} = useHttpClient();
    const [post, setPost] = useState([]);

    const postId = useParams().postId;

    useEffect(() => {
        const fetchPosts = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:3000/posts/${postId}`, 'GET', null);
                setPost(responseData);
            } catch (err) {

            }
        };
        fetchPosts();

    }, [sendRequest, postId]);

    return (<React.Fragment>
        {isLoading && (
            <div className="center" >
                <CircularProgress />
            </div>
        )}
        <div key={post.id}>
            <p>{post.id}</p>
            <p>{post.body}</p>

        </div>
    </React.Fragment>
    );
}

export default Post;