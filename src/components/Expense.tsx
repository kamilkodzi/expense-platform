import React from "react";

const Expense = (props) => {
  const deleteOne = async () => {
    props.deleteIt(props.data._id);
  };
  return (
    <div
      key={props.data._id}
      style={{
        display: "flex",
        margin: "10px",
        justifyContent: "space-between",
      }}
    >
      <strong style={{}}>- {props.data.value} $</strong>{" "}
      <i style={{ color: "#5a5252" }}>({props.data.name})</i>
      <button
        onClick={deleteOne}
        style={{
          marginLeft: "20px",
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Expense;
