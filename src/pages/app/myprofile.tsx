import { Link, navigate } from "gatsby";
import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { getCurrentUser, logout } from "../../services/auth";

type IUser = {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  family: IFamily;
};
type IFamily = {
  headOfFamily: any;
  budget: number;
  _id?: string;
  familyName: string;
};

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [newBudget, setNewBudget] = useState({
    value: "",
  });
  const [toRefresh, setToRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user?.id) {
        return null;
      }
      // if (user === undefined) {
      //   return null;
      // }
      fetch(
        //@ts-ignore
        `https://socialist-keener-62500.herokuapp.com/user/${user?.id}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
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
    });
  }, [toRefresh]);

  const logOutHandler = async () => {
    await logout();
    navigate("/");
  };

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
    const currentUser = await getCurrentUser();

    if (data?.family?._id) {
      const id = data?.family?._id;
      const results = await fetch(`https://socialist-keener-62500.herokuapp.com/families/${id}/quit`, {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify({ id: currentUser.id }),
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
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
  const changeHandler = (e) => {
    setNewBudget({ value: e.target.value });
  };
  const setBudget = async (e) => {
    e.preventDefault();
    const results = await fetch(`https://socialist-keener-62500.herokuapp.com/families/${data.family._id}/budget`, {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify(newBudget),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    const resultdata = await results.json();
    if (results.ok) {
      setNewBudget((prev) => null);
      setToRefresh((prev) => !prev);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    } else {
      alert(resultdata.message);
    }
  };
  return (
    <Layout>
      <div style={{ padding: " 90px 10px 10px 10px" }}>
        <div className="welcome">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2
              style={{
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              Hello, {data?.username}
            </h2>
            <button style={{}} onClick={logOutHandler}>
              Logout
            </button>
          </div>

          <h3 style={{ marginTop: "5px" }}>What you gonna do?</h3>
        </div>
        <p>
          Family: <Link to="/app/myfamily">{data?.family?.familyName}</Link>
        </p>

        <button style={{ marginRight: "10px" }} onClick={joinHandler}>
          Join family
        </button>
        <button onClick={leaveHandler}>Leave family</button>
        {data?._id === data?.family?.headOfFamily?._id && (
          <div style={{ marginTop: "30px" }}>
            <hr />
            <h4>As head of family you can set the budget! </h4>
            <strong>Current budget is: {data?.family?.budget} $</strong>
            <br></br>
            <br></br>
            <input
              onChange={changeHandler}
              type="number"
              placeholder="value $"
              name="value"
              value={newBudget?.value}
            ></input>
            <button onClick={setBudget}>Set budget</button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyProfile;
