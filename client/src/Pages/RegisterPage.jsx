import React from "react";
import { useHistory } from "react-router-dom";
import FetchKit from "../utils/fetchKit";

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
    <div>
      <form method="POST" onSubmit={handleOnSubmit}>
        <input required name="fullName" type="text" placeholder="Fullname" />
        <input required name="email" type="email" placeholder="email" />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
        />
        <input required name="phoneNumber" type="tel" placeholder="Phone" />
        <input
          required
          name="postalCode"
          type="number"
          placeholder="Postalcode"
        />
        <input
          required
          name="streetAddress"
          type="text"
          placeholder="Streetadress"
        />
        <input required name="city" type="text" placeholder="City" />
        <input required type="submit" value="register" />
      </form>
    </div>
  );
}
