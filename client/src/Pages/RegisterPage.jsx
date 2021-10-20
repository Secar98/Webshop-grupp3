import React from "react";
import { useHistory } from "react-router-dom";
import FetchKit from "../utils/fetchKit";
import { Form, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";

export default function RegisterPage() {
  const history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      phoneNumber: e.target[3].value,
      deliveryAddress: {
        postalCode: e.target[4].value,
        streetAddress: e.target[5].value,
        city: e.target[6].value,
      },
    };

    FetchKit.registerFetch(formData)
      .then((res) => res.json())
      .then((item) => {
        if (item) {
          localStorage.setItem("token", item.token);
          history.push("/");
        }
      });
  };

  return (
    <>
      <Navigation />
      <Col
        md={{ span: 6, offset: 3 }}
        className="colorBackground lightText mt-5 p-5 rounded shadow"
      >
        <h2>Register</h2>
        <Form method="POST" onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formBasicFullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              name="fullName"
              required
              type="text"
              placeholder="Enter Fullname"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              required
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phonenumber</Form.Label>
            <Form.Control
              name="phoneNumber"
              required
              type="number"
              placeholder="Enter Phonenumber"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPostaCode">
            <Form.Label>Postalcode</Form.Label>
            <Form.Control
              name="postalCode"
              required
              type="number"
              placeholder="Enter Postalcode"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStreetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              name="adress"
              required
              type="text"
              placeholder="Enter Street Adress"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>Email City</Form.Label>
            <Form.Control
              name="city"
              required
              type="text"
              placeholder="Enter City"
            />
          </Form.Group>
          <input className="btn lightText" type="submit" value="Register" />
        </Form>
      </Col>
    </>
  );
}
