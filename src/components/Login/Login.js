import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuthContext } from "../../contexts/AuthContext";
import { useForm } from "../../hooks/useForm";
import { NotificationContext } from '../../contexts/NotificationContext';
import styles from './Login.module.css';

const LoginFormKeys = {
    Email: 'email',
    Password: 'password'
};

export const Login = () => {
    const notifications = useContext(NotificationContext);

    const { onLoginSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm({
        [LoginFormKeys.Email]: '',
        [LoginFormKeys.Password]: '',
    }, onLoginSubmit);

    useEffect(() => {
        return () => {

            notifications.showMessage('Logged in successfully!', 'success');
        }
    }, []);



    return (
        <div className={styles.container}>
            <section id="login-page" className="auth">
                <Form id="login" method="POST" onSubmit={onSubmit}>
                    <div className="container">
                        <div className="brand-logo"></div>
                        <h1>Login</h1>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name={LoginFormKeys.Email}
                                value={values[LoginFormKeys.Email]}
                                onChange={changeHandler}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name={LoginFormKeys.Password}
                                value={values[LoginFormKeys.Password]}
                                onChange={changeHandler}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <p className="field">
                            <span>If you don't have profile click <Link to="/register">here</Link></span>
                        </p>
                    </div>
                </Form>
            </section>
        </div>
    );
};