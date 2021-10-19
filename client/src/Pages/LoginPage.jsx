import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import FetchKit from "../utils/fetchKit";
import { UserContext } from "../context/userContext";

export default function LoginPage() {
  const history = useHistory();
  const { newUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      history.push("/");
    }
  }, [history]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    FetchKit.loginFetch(formData)
      .then((res) => res.json())
      .then((item) => {
        if (item) {
          localStorage.setItem("token", item.token);
          history.push("/");
        }
      });
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form method="POST" onSubmit={handleOnSubmit}>
        <input
          name="email"
          onChange={handleOnChange}
          type="text"
          placeholder="email"
          required
        />
        <input
          name="password"
          onChange={handleOnChange}
          type="password"
          placeholder="password"
          required
        />
        <input type="submit" value="login" />
      </form>
      {newUser && <p>Ny användare</p>}
    </div>
  );
}
