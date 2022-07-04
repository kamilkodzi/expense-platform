import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import SingleFamily from "../../components/SingleFamily";

const FindFamily = () => {
  const [newFamilyName, setNewFamilyName] = useState({ familyName: "" });
  const [familyData, setFamilyData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      fetch("https://socialist-keener-62500.herokuapp.com/families", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setFamilyData(data));
    };
    fetchData().catch((e) => {
      console.log(e);
    });
  }, [newAdded]);

  const changeHandler = (e) => {
    setNewFamilyName({ familyName: e.target.value });
  };
  const addFamilyHandler = async (e) => {
    e.preventDefault();

    const results = await fetch(
      "https://socialist-keener-62500.herokuapp.com/families",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(newFamilyName),
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const resultData = await results.json();
    if (results.ok) {
      setNewAdded((prevState) => prevState + 1);
      navigate("/app/myprofile");
    } else {
      alert(resultData.message);
    }
  };

  return (
    <Layout>
      <form>
        <label>
          Family name:&nbsp;
          <input
            value={newFamilyName.familyName}
            onChange={changeHandler}
            type="text"
            name="familyName"
            autoComplete="off"
          ></input>
        </label>
        <button type="submit" onClick={addFamilyHandler}>
          Create new
        </button>
      </form>
      <h2>Families:</h2>
      <div style={{ paddingBottom: "100px" }}>
        {familyData.map((f) => {
          return <SingleFamily key={f._id} family={f}></SingleFamily>;
        })}
      </div>
    </Layout>
  );
};

export default FindFamily;
