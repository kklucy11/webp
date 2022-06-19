import React from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
const Header = ({ user }) => {
    return (
        <Menu size='small'>
            <Menu.Item as={Link} to="/" name='Home' />
            <Menu.Menu position='right'>
                {user ? <>
                    <Menu.Item as={Link} to="/new-post">發表文章</Menu.Item>
                    <Menu.Item as={Link} to="/my">會員</Menu.Item>
                    <Menu.Item onClick={() => { firebase.auth().signOut(); }}>登出</Menu.Item>
                </> : <Menu.Item as={Link} to="/login">註冊/登入</Menu.Item>
                }
            </Menu.Menu>
        </Menu>
    )
}

export default Header