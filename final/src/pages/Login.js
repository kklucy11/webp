import React, { useState } from 'react'
import { Menu, Form, Container, Message, Button, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import 'firebase/compat/auth'
import LoginGoogle from '../component/LoginGoogle';

const Login = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit() {
        console.log("firebase", firebase)
        setIsLoading(true);
        if (activeItem === 'register') {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                navigate("/posts");
                setIsLoading(false);
            }
            ).catch((error) => {
                setIsLoading(false);
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setErrorMessage("信箱已存在");
                        break;
                    case "auth/invalid-email":
                        setErrorMessage("信箱格式錯誤");
                        break;
                    case "auth/weak-password":
                        setErrorMessage("密碼強度不足");
                        break;
                    default:
                }
            })
        } else if (activeItem === 'signin') {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                navigate("/posts");
                setIsLoading(false);
            }).catch((error) => {
                setIsLoading(false);
                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorMessage("信箱格式錯誤");
                        break;
                    case "auth/user-not-found":
                        setErrorMessage("信箱不存在");
                        break;
                    case "auth/wrong-password":
                        setErrorMessage("密碼錯誤");
                        break;
                    default:
                }
            })
        }
    }


    return (
        <>
            <Container>
                <Menu widths="2">
                    <Menu.Item active={activeItem === 'register'} onClick={() => { setActiveItem("register"); setErrorMessage(""); }}>註冊</Menu.Item>
                    <Menu.Item active={activeItem === 'signin'} onClick={() => { setActiveItem("signin"); setErrorMessage(""); }}>登入</Menu.Item>
                </Menu>
                <Form >
                    <Form.Input label="信箱" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="請輸入信箱" />
                    <Form.Input label="密碼" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="請輸入密碼" />
                    {errorMessage && <Message negative>{errorMessage}</Message>}
                    <Button.Group fluid>
                        <Button loading={isLoading} onClick={onSubmit}>
                            {activeItem === 'register' && "註冊"}
                            {activeItem === 'signin' && "登入"}
                        </Button>
                        <Button.Or />
                        <Button onClick={LoginGoogle}><Icon className="google" />Sign In with Google</Button>
                    </Button.Group>
                </Form>
            </Container>
        </>
    )
}

export default Login