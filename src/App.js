import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Posts from './components/Posts';
import Users from './components/Users';
import User from './components/User';
import Post from './components/Post';
import Header from './components/Appbar';

const loggedUser=
  {
    "id": 1,
    "name": "User One",
    "email": "user1@mail.com",
    "password": "password1",
    "postId":1,
    "img":"https://avatars.githubusercontent.com/u/61892232?v=4",
    "friends":[2,3]

};

function App() {

  return (
    <Router>
      <Header loggedUser={loggedUser} />
      <main>
        <Routes>
          <Route path="users/" element={<Users />} />
          <Route path="users/:userId" element={<User />} />
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;
