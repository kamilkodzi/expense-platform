import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { getCurrentUser } from "../services/auth";
import { IUser } from "../services/auth";

const Nav = styled.nav`
  .top-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.6em;
  }
  .top-menu-item {
    text-decoration: none;
    color: black;
  }
  .list {
    margin-top: 0;
    padding: 4px;
  }
  .list-item {
    list-style: none;
  }
`;

const Navbar = () => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  useEffect(() => {
    async function checkIfLoogedIn() {
      const result = await getCurrentUser();
      setUser(result);
    }
    checkIfLoogedIn();
  }, [user]);

  return (
    <Nav>
      <div className="menu-links">
        <ul className="list">
          <li className="list-item">
            <Link
              to="/app/myprofile"
              className="nav-link"
              activeClassName="active-link"
            >
              My profile
            </Link>
          </li>
          <li className="list-item">
            <Link
              to="/app/myfamily"
              className="nav-link"
              activeClassName="active-link"
            >
              My Family
            </Link>
          </li>
          <li className="list-item">
            <Link
              to="/app/findfamily"
              className="nav-link"
              activeClassName="active-link"
            >
              Find family
            </Link>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

export default Navbar;
