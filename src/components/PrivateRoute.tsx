import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { isLoggedIn } from "../services/auth";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [loged, setLoged] = useState({});
  useEffect(() => {
    async function checkIfLoogedIn() {
      const result = await isLoggedIn();
      setLoged(result);
    }
    checkIfLoogedIn();
  }, [loged]);

  if (loged === true && location.pathname === `/app/login`) {
    navigate(`/`);
    return null;
  }
  if (loged === false && location.pathname === `/app/login`) {
    return <Component {...rest} />;
  }
  if (loged === false && location.pathname !== `/app/login`) {
    navigate("/app/login");
    return null;
  }
  if (loged === false) {
    navigate("/");
    return null;
  }
  return <>{loged ? <Component {...rest} /> : <></>}</>;
};

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
