import * as React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import GradeIcon from '@mui/icons-material/Grade';


export default function MediaCard({ post }) {

    const { sendRequest } = useHttpClient();
    const [user, setUser] = useState({
        "name": "",
        "img": "",
        "id": ""
    });

    const [likes, setLikes] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:3000/users?userId=${post.userId}`, 'GET', null);
                const [userData] = responseData;
                setUser({
                    "name": userData.name,
                    "img": userData.img,
                    "id": userData.id
                });

            } catch (err) {

            }
        };
        fetchUsers();

    }, [sendRequest, post.userId]);

    useEffect(() => {
        setIsLiked(post.likes.includes(user.id));
    },[user.id])
    console.log(isLiked);


    const likeHandler = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);

    }

    return (
        <Grid container justifyContent="center"  >
            <Card
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 2,
                    borderRadius: 2,
                    m: 4,
                    maxWidth: 400
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar src={user.img} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }

                    title={<Link style={{ textDecoration: 'none', color: 'black' }} to={`/users/${post.userId}`}>
                        {user.name}
                    </Link>}
                />
                <CardMedia
                    component="img"
                    width="440"
                    image={post.images[0]}
                    alt="green iguana"
                />
                <CardContent>
                    <Box style={{ display: "flex", alignItems: 'center' }} >
                        <Button
                            style={{ minWidth: "0.2rem", padding: '0' }}
                            onClick={likeHandler}
                        >
                            {!isLiked ? <GradeOutlinedIcon />  :<GradeIcon />}
                        </Button>
                        {likes}
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {post.body}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link style={{ display: "block", margin: "1rem 0" }} to={`/posts/${post.id}`}>
                        Learn More
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
}