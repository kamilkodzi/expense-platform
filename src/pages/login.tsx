import { Link, navigate } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";

const LoginInputs = styled.div`
  display: block;
  flex-direction: column;

  input {
    display: block;
  }
  button {
    margin: 10px 0 10px 0;
  }
`;

const Index = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const loginUser = async () => {
    const dataToBeSent = JSON.stringify(loginData);
    let results = await fetch("/api/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: dataToBeSent,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(results);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginUser();
    navigate("/");
  };

  const changeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, name } = target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <LoginInputs>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={changeHandler}
          ></input>

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={changeHandler}
          ></input>
          <button type="submit">Login</button>
        </LoginInputs>
      </form>
      You don't have an account? Just sing up <Link to="/register">here</Link>
    </section>
  );
};

export default Index;
