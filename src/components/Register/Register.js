import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../contexts/AuthContext";
import { NotificationContext } from '../../contexts/NotificationContext';
import styles from './Register.module.css';

const RegisterFormKeys = {
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirmPassword",
};

export const Register = () => {
  const notifications = useContext(NotificationContext);

  const { onRegisterSubmit } = useContext(AuthContext);
  const { values, changeHandler, onSubmit } = useForm(
    {
      [RegisterFormKeys.Email]: "",
      [RegisterFormKeys.Password]: "",
      [RegisterFormKeys.ConfirmPassword]: "",
    },
    onRegisterSubmit
  );

  useEffect(() => {
    return () => {
      notifications.showMessage('You registered successfully!', 'success');
    }
  }, []);

  return (
    <div className={styles.container}>
      
      <Container className="auth">
        <Form id="register" onSubmit={onSubmit}>
          <h1>Register</h1>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name={RegisterFormKeys.Email}
              placeholder="Enter email"
              value={values[RegisterFormKeys.Email]}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name={RegisterFormKeys.Password}
              placeholder="Password"
              value={values[RegisterFormKeys.Password]}
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name={RegisterFormKeys.ConfirmPassword}
              placeholder="Confirm Password"
              value={values[RegisterFormKeys.ConfirmPassword]}
              onChange={changeHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

          <p className="field">
            <span>
              If you already have a profile click{" "}
              <Link to="/login">here</Link>
            </span>
          </p>
        </Form>
      </Container>
    </div>
  );
};
