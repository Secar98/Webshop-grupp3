import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import FetchKit from "../utils/fetchKit";
import { UserContext } from "../context/userContext";

export default function RegisterPage() {
  const history = useHistory();
  const { setNewUser } = useContext(UserContext);

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
        setNewUser(true);
        history.push("/login");
      });
  };

  return (
    <div>
      <form method="POST" onSubmit={handleOnSubmit}>
        <input name="fullName" type="text" placeholder="Fullname" />
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="phoneNumber" type="tel" placeholder="Phone" />
        <input name="postalCode" type="number" placeholder="Postalcode" />
        <input name="streetAddress" type="text" placeholder="Streetadress" />
        <input name="city" type="text" placeholder="City" />
        <input type="submit" value="register" />
      </form>
    </div>
  );
}
