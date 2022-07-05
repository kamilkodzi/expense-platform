import { Link } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

const index = () => {
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
