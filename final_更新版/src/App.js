import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import firebase from './Firebase/Firebase';
import Header from './component/Header';
import Newpost from './pages/Newpost';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Home from './pages/Home';
import My from './pages/My';



const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentuser) => {
      setUser(currentuser)
    });
  }, []);

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:postId" element={<Posts />} />
        <Route path="/my" element={user ? <My user={user} /> : <Navigate to="/" />} />
        <Route path="/new-post" element={user ? <Newpost user={user} /> : <Navigate to="/" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </>
  )
}

export default App