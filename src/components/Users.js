import React, { useState, useEffect } from "react";

import { useHttpClient } from '../shared/hooks/http-hook';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Grid from '@mui/material/Grid';


import './Posts.css';

const Users = () => {

    const { isLoading, sendRequest } = useHttpClient();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const responseData = await sendRequest(`http://localhost:3000/users?_embed=posts`, 'GET', null);
                setUsers(responseData);
            } catch (err) {

            }
        };
        fetchUsers();

    }, [sendRequest]);

    console.log(users);

    return (<Grid container justifyContent="center"  >
        {!isLoading && users.map(user => (
            <Card key={user.userId} sx={{ maxWidth: 345, m: 2 }}>
                <CardHeader
                    avatar={
                        isLoading ? (
                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                        ) : (
                            <Avatar
                                alt="Ted talk"
                                src={user.img}
                            />
                        )
                    }
                    action={
                        isLoading ? null : (
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        )
                    }
                    title={
                        isLoading ? (
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{ marginBottom: 6 }}
                            />
                        ) : (
                            <p>{user.name}</p>
                        )
                    }
                    subheader={
                        isLoading ? (
                            <Skeleton animation="wave" height={10} width="40%" />
                        ) : (
                            <p>{user.email}</p>
                        )
                    }
                />
                {!isLoading ? user.posts.map(post => (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src={post.images[0]} />
                            </ListItemAvatar>
                            <ListItemText primary={post.id} secondary={post.body} />
                        </ListItem>
                    </List>
                )) :
                    <Skeleton animation="wave" height={10} width="40%" />
                }

                <CardContent>
                    {isLoading ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>
                    ) : (
                        <Typography variant="body2" color="text.secondary" component="p">
                            Number of posts: {user.posts.length}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        )
        )
        }
    </Grid>
    )
}

export default Users;