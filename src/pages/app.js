import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/PrivateRoute";
import MyProfile from "./app/myprofile";
import MyFamily from "./app/myfamily";
import FindFamily from "./app/findFamily";
import Login from "./app/login";

const App = () => (
  <>
    <Router>
      <PrivateRoute path="app/myprofile" component={MyProfile} />
      <PrivateRoute path="app/myfamily" component={MyFamily} />
      <PrivateRoute path="app/login" component={Login} />
      <PrivateRoute path="app/findfamily" component={FindFamily} />
      {/* <Login path="user/login" /> */}
    </Router>
  </>
);

export default App;
