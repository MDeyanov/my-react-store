import React, { useState, useEffect, useContext } from 'react';
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

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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

  const validateForm = () => {
    let isValid = true;

    if (!values[RegisterFormKeys.Email].trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(values[RegisterFormKeys.Email])) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!values[RegisterFormKeys.Password].trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!values[RegisterFormKeys.ConfirmPassword].trim()) {
      setConfirmPasswordError("ConfirmPassword is required");
      isValid = false;
    } else if (values[RegisterFormKeys.Password] !== values[RegisterFormKeys.ConfirmPassword]) {
      setConfirmPasswordError("Passwords do NOT match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
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

      <Container className="auth">
        <Form id="register" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name={RegisterFormKeys.Email}
              placeholder="Enter email"
              value={values[RegisterFormKeys.Email]}
              onChange={changeHandler}
              onBlur={() => {
                if (!values[RegisterFormKeys.Email].trim()) {
                  setEmailError("Email is required");
                } else if (!/^\S+@\S+\.\S+$/.test(values[RegisterFormKeys.Email])) {
                  
                } else {
                  setEmailError("");
                }
              }}
            />
            {emailError && (
              <div className="text-danger">{emailError}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name={RegisterFormKeys.Password}
              placeholder="Password"
              value={values[RegisterFormKeys.Password]}
              onChange={changeHandler}
              onBlur={() => {
                if (!values[RegisterFormKeys.Password].trim()) {
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

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name={RegisterFormKeys.ConfirmPassword}
              placeholder="Confirm Password"
              value={values[RegisterFormKeys.ConfirmPassword]}
              onChange={changeHandler}
              onBlur={() => {
                if (!values[RegisterFormKeys.ConfirmPassword].trim()) {
                  setConfirmPasswordError("ConfirmPassword is required");
                } else if (values[RegisterFormKeys.Password] !== values[RegisterFormKeys.ConfirmPassword]) {
                }else {
                  setConfirmPasswordError("");
                }
              }}
            />
              {confirmPasswordError && (
              <div className="text-danger">{confirmPasswordError}</div>
            )}
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
