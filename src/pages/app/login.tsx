import React, { useState } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import Layout from "../../components/Layout";
import { setUser } from "../../services/auth";

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
    username: "",
  });

  const registerUser = async () => {
    const dataToBeSent = JSON.stringify(registerData);

    let resuls = await fetch(
      "https://socialist-keener-62500.herokuapp.com/user/registerorlogin",
      {
        method: "POST",
        mode: "cors",
        body: dataToBeSent,
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const resulss = await resuls.json();
    if (resulss) {
      setUser({ username: registerData?.username, id: resulss?.message });
      navigate("/app/myprofile");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    registerUser();
  };

  const changeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, name } = target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <Layout>
      <section style={{ padding: " 90px 10px 10px 10px" }}>
        <div>
          <h2>Login yourself</h2>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <RegisterInputs>
            <label>Username</label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              value={registerData.username}
              onChange={changeHandler}
            ></input>
            <button type="submit">Submit</button>
          </RegisterInputs>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
