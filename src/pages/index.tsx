import React from "react";
import { Link } from "gatsby";

const index = () => {
  return (
    <div>
      <h1>Wellcome in home page @@@</h1>
      <Link to="/login">Go to login page</Link>
      <br></br>
      <Link to="/protected">Go to PROTECTED SITE</Link>
    </div>
  );
};

export default index;
