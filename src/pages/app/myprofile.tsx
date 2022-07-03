import { Link, navigate } from "gatsby";
import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { logout } from "../../services/auth";

type IUser = {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  family: IFamily;
};
type IFamily = {
  _id?: string;
  familyName: string;
};

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    fetch("/api/user/myprofile")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logOutHandler = async () => {
    await logout();
    const result = await fetch("/api/user/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      navigate("/");
    }
  };
  // const result = async () => {
  //   let data = await fetch("/api/api/post");
  //   data = await data.json();
  //   return data;
  // };
  if (loading) return <Layout>Loading...</Layout>;
  if (error) return "Error";
  const joinHandler = () => {
    if (data?.family?.familyName) {
      alert("You have family already - leave current first");
    } else {
      navigate("/app/findfamily");
    }
  };
  const leaveHandler = async () => {
    // PATCH  http://localhost:3000/families/62c02f0fd042319f16a1b236/quit
    if (data?.family?._id) {
      const id = data?.family?._id;
      const results = await fetch(`/api/families/${id}/quit`, {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const resultdata = await results.json();
      if (results.ok) {
        setData((prevState) => ({ ...prevState, family: null }));
      } else {
        alert(resultdata.message);
      }
    } else {
      alert("You don't have family - go find one");
    }
  };
  return (
    <Layout>
      <div>
        <div className="welcome">
          <h2>Hi, wellcome {data?.username}</h2>
          <button onClick={logOutHandler}>Logout</button>
        </div>

        <p>First name: {data?.firstName}</p>
        <p>Last name: {data?.lastName}</p>
        <p>
          Family: <Link to="/app/myfamily">{data?.family?.familyName}</Link>
        </p>
        <button style={{ marginRight: "10px" }} onClick={joinHandler}>
          Join family
        </button>
        <button onClick={leaveHandler}>Leave family</button>
      </div>
    </Layout>
  );
};

export default MyProfile;
