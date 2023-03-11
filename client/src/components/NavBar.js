import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Context } from "../index";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const role = user.isAuth
    ? jwt_decode(localStorage.getItem("token")).role
    : null;

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.clear();
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          КупиДевайс
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              Корзина
            </Button>
            {role === "ADMIN" && (
              <Button
                variant={"outline-light"}
                className="ms-4"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            )}
            <Button variant={"outline-light"} className="ms-4" onClick={logOut}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
