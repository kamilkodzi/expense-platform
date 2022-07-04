import { Link, navigate } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { isLoggedIn, setUser } from "../../services/auth";

const LoginInputs = styled.div`
  display: block;
  flex-direction: column;

  input {
    display: block;
  }
  button {
    margin: 10px 0 10px 0;
  }
  .errMessage {
    color: red;
    margin-top: 10px;
  }
`;

const ErrMessage = () => {
  return (
    <div className="errMessage" style={{ color: "red", margin: "10px" }}>
      username or password are not correct
    </div>
  );
};
const Index = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [errorWhileLogIn, setErrorWhileLogin] = useState(false);

  const loginUser = async () => {
    const dataToBeSent = JSON.stringify(loginData);
    let results = await fetch(
      "https://socialist-keener-62500.herokuapp.com/user/login",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: dataToBeSent,
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    if (results.ok) {
      return true;
    } else {
      false;
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const loginResult = await loginUser();
    if (loginResult) {
      navigate("/app/myprofile");
    } else {
      setErrorWhileLogin(true);
    }
  };

  const changeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, name } = target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <Layout>
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
              autoComplete="off"
            ></input>

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={changeHandler}
            ></input>
            {errorWhileLogIn ? <ErrMessage /> : null}
            <button type="submit">Login</button>
          </LoginInputs>
        </form>
        You don't have an account? Just sing up{" "}
        <Link to="/user/register">here</Link>
      </section>
    </Layout>
  );
};

export default Index;
