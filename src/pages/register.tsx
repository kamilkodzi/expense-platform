import React, { useState } from "react";
import styled from "styled-components";

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

function register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Refister form subbmited");
  };

  const changeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, name } = target;
    setRegisterData({ ...registerData, [name]: [value] });
  };

  return (
    <section>
      <div>
        <h2>Register yourself</h2>
      </div>
      <form onSubmit={handleSubmit} className="register-form">
        <RegisterInputs>
          <label>E-mail</label>
          <input
            type="text"
            name="email"
            value={registerData.email}
            onChange={changeHandler}
          ></input>

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={registerData.username}
            onChange={changeHandler}
          ></input>

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={changeHandler}
          ></input>

          <button type="submit">Submit</button>
        </RegisterInputs>
      </form>
    </section>
  );
}

export default register;
