import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import FetchKit from '../utils/fetchKit';
import {UserContext} from '../context/userContext';
import Navigation from '../components/Navigation';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default function RegisterPage() {
    const history = useHistory();
    const {setNewUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "", 
        password:"" 
    })


    const handleOnSubmit =  (e) =>{
        e.preventDefault()

        FetchKit.registerFetch(formData)
        .then((res) => res.json())
        .then(item =>{
            setNewUser(true);
            history.push('/login')
        });
    }

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

  return (
    <>
    <Navigation/>
    <Col md={{ span: 6, offset: 3 }} className="colorBackground lightText mt-5 p-5 rounded shadow">
      <h2>Register</h2>
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

        <input className="btn lightText" type="submit" value="Register" />
      </Form>
    </Col>
  );
}
