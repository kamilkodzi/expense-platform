import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import Layout from "../../components/Layout";

const RegisterInputs = styled.div`
  display: block;
  flex-direction: column;

  input {
    display: block;
  }
  button {
    margin: 10px 0 10px 0;
  }
`;

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const registerUser = async () => {
    const dataToBeSent = JSON.stringify(registerData);

    let resuls = await fetch("/api/user/register", {
      method: "POST",
      mode: "cors",
      body: dataToBeSent,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    resuls = await resuls.json();
    if (resuls) navigate("/app/login");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    registerUser();
    console.log("Refister form subbmited");
  };

  const changeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, name } = target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <Layout>
      <section>
        <div>
          <h2>Register yourself</h2>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <RegisterInputs>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={changeHandler}
            ></input>
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={registerData.firstName}
              onChange={changeHandler}
            ></input>

            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={registerData.lastName}
              onChange={changeHandler}
            ></input>
            <br />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={changeHandler}
            ></input>
            <br />
            <button type="submit">Submit</button>
          </RegisterInputs>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
