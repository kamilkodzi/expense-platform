import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import Expense from "../../components/Expense";
import Layout from "../../components/Layout";
import { getCurrentUser } from "../../services/auth";
import { IUser } from "../../services/auth";

interface IExpense {
  name: string;
  value: number;
  _id: string;
}

interface IMember {
  _id: string;
  username: string;
}
interface IFamily {
  _id: string;
  familyName: string;
  headOfFamily: IUser;
  budget: number;
  members: [IMember];
  expenses: [IExpense];
}
interface IProfile {
  _id: string;
  username: string;
  family: IFamily;
}

const Myfamily = () => {
  const [familyData, setFamilyData] = useState<IProfile>();
  const [newValue, setNewValue] = useState("");
  const [newName, setNewName] = useState("");
  const [add, setAdd] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser?.id) {
        return null;
      }
      fetch(
        `https://socialist-keener-62500.herokuapp.com/user/myprofile/${currentUser.id}`,
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
        .then((response) => response.json())
        .then((data) => setFamilyData(data));
    };
    fetchData().catch((e) => {
      console.log(e);
    });
  }, [add]);
  const valueChange = (e) => {
    setNewValue(e.target.value);
  };
  const nameChange = (e) => {
    setNewName(e.target.value);
  };
  const beInCharge = async () => {
    if (!familyData?.family?.headOfFamily?._id) {
      if (!familyData?.family?._id) alert("Find family first");
      const results = await fetch(
        `https://socialist-keener-62500.herokuapp.com/families/${familyData?.family?._id}/user/${familyData?._id}/becomehead`,
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
      if (results.ok) {
        setAdd(add + 1);
      }
    } else {
      alert(
        "There ia someone alerady in charge, so you can't take this position"
      );
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    const currentUser = await getCurrentUser();
    const dataToSend = {
      name: newName,
      value: newValue,
      author: currentUser.id,
    };
    const familyId = familyData.family._id;
    const results = await fetch(
      `https://socialist-keener-62500.herokuapp.com/families/${familyId}/expenses`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(dataToSend),
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
    const resultdata = await results.json();
    if (results.ok) {
      setAdd(add + 1);
      setNewName(() => null);
      setNewValue(() => null);
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
    } else {
      alert(resultdata.message);
    }
  };

  const deleteOne = async (id) => {
    const results = await fetch(
      `https://socialist-keener-62500.herokuapp.com/families/${familyData.family._id}/expenses/${id}`,
      {
        method: "DELETE",
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
      setAdd(add + 1);
    } else {
      alert(resultdata.message);
    }
  };
  return (
    <Layout>
      <div style={{ padding: " 90px 10px 10px 10px" }}>
        <h2
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{familyData?.family?.familyName}</span>
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4 style={{ margin: "0px" }}>Head of this family: &nbsp;</h4>
            <span>{familyData?.family?.headOfFamily?.username}</span>
            <button style={{ marginLeft: "10px" }} onClick={beInCharge}>
              Take position
            </button>
          </div>

          <br />
        </div>
        <div>
          <div>
            <strong>Budget: &nbsp;</strong>
            {familyData?.family?.budget}
          </div>
          <div>
            <strong>Members:&nbsp;&nbsp;</strong>
            <span>
              {familyData?.family?.members.map((data) => {
                return data.username + ", ";
              })}
            </span>
          </div>
        </div>
        <hr />
        <div>
          <h3 style={{ margin: "5px" }}>Expenses</h3>
          <form>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <input
                onChange={valueChange}
                style={{ width: "25%", margin: "5px" }}
                name="value"
                type="number"
                placeholder="value $"
              ></input>
              <input
                onChange={nameChange}
                style={{ width: "35%", margin: "5px" }}
                name="name"
                type="text"
                placeholder="name"
              ></input>

              <button
                onClick={addExpense}
                style={{ width: "25%", margin: "5px" }}
              >
                Add
              </button>
            </div>
          </form>
          <div
            style={{
              paddingBottom: "80px",
              display: "block",
            }}
          >
            {familyData?.family?.expenses.map((data) => {
              return (
                <Expense key={data._id} data={data} deleteIt={deleteOne} />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Myfamily;
