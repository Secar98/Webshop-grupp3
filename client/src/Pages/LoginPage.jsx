import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FetchKit from "../utils/fetchKit";
import {Col, Form} from "react-bootstrap";
import Navigation from "../components/Navigation";
import Auth from "../utils/auth"
import { UserContext } from "../context/userContext";

export default function LoginPage() {
  const token = localStorage.getItem('token')
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {setIsLoggedin} = useContext(UserContext);

  useEffect(() => {
    authToken(token);
  }, [token]);

  const authToken = async (token) => {
    const res = await Auth.authenticateToken(token)
    if(res[0]) {
      history.push('/');
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await FetchKit.loginFetch(formData)
    const data = await res.json();
    if (res.ok) {
      setIsLoggedin(true);
      localStorage.setItem("token", data.token);
      history.push("/")
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navigation />
      <Col
        md={{ span: 6, offset: 3 }}
        className="colorBackground lightText mt-5 p-5 rounded shadow"
      >
        <h2>Log in</h2>
        <Form method="POST" onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={handleOnChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleOnChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <input className="btn lightText" type="submit" value="login" />
        </Form>
      </Col>
    </>
  );
}
