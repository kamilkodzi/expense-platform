import { Link, navigate } from "gatsby";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { getCurrentUser } from "../services/auth";

const index = () => {
  useEffect(() => {
    isLoggedIn();
  }, []);
  const isLoggedIn = async () => {
    const logCheck = await getCurrentUser();
    if (logCheck?.username) {
      console.log("juz zalogowany");
      navigate("/app/myprofile");
    } else {
      console.log("jeszcze nie zalogowany zalogowany");
    }
  };
  return (
    <Layout>
      <div style={{ padding: " 90px 10px 10px 10px" }}>
        <h2>Family Expense App!</h2>
        <h3>use on mobile device for "better" experience</h3>
        <Link
          to="/app/login"
          className="nav-link"
          activeClassName="active-link"
        >
          Create your profile!
        </Link>
        <p>Add some expense!</p>
      </div>
    </Layout>
  );
};

export default index;
