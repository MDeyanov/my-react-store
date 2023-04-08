import React, { useState, useEffect, useContext } from 'react';
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

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        return () => {

            notifications.showMessage('Logged in successfully!', 'success');
        }
    }, []);

    const validateForm = () => {
        let isValid = true;

        if (!values[LoginFormKeys.Email].trim()) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(values[LoginFormKeys.Email])) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!values[LoginFormKeys.Password].trim()) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            onSubmit();
        }
    };



    return (
        <div className={styles.container}>
            <section id="login-page" className="auth">
                <Form id="login" method="POST" onSubmit={handleSubmit}>
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
                                onBlur={() => {
                                    if (!values[LoginFormKeys.Email].trim()) {
                                        setEmailError("Email is required");
                                    } else if (!/^\S+@\S+\.\S+$/.test(values[LoginFormKeys.Email])) {

                                    } else {
                                        setEmailError("");
                                    }
                                }}
                            />
                            {emailError && (
                                <div className="text-danger">{emailError}</div>
                            )}

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name={LoginFormKeys.Password}
                                value={values[LoginFormKeys.Password]}
                                onChange={changeHandler}
                                onBlur={() => {
                                    if (!values[LoginFormKeys.Password].trim()) {
                                        setPasswordError("Password is required");
                                    } else {
                                        setPasswordError("");
                                    }
                                }}
                            />
                            {passwordError && (
                                <div className="text-danger">{passwordError}</div>
                            )}
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