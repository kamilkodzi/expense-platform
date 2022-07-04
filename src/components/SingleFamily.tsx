import { navigate } from "gatsby";
import React from "react";

const SingleFamily = (props) => {
  const clickHandler = async () => {
    const id = props.family._id;
    const results = await fetch(
      `https://socialist-keener-62500.herokuapp.com/families/${id}/join`,
      {
        method: "PATCH",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const resultdata = await results.json();
    if (results.ok) {
      navigate("/app/myprofile");
    } else {
      alert(resultdata.message);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        {props.family.familyName},&nbsp;
        <span style={{ fontSize: "0.8em" }}>
          guided by {props?.family?.headOfFamily?.firstName}
          {props?.family?.headOfFamily?.lastName}
        </span>
      </div>

      <button onClick={clickHandler} style={{ marginRight: "1em" }}>
        Join
      </button>
    </div>
  );
};

export default SingleFamily;
