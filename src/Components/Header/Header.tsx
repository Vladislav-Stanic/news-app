import React, { ReactElement } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./Header.scss";
import { CountriesEnum } from "../../Service/CountriesEnum";
import { NavPagesEnum } from "../../Service/NavPagesEnum";
import { Link, NavLink } from "react-router-dom";

import createHistory from "history/createBrowserHistory";

// Used to extract values from PagesEnum as its keys and values differ
declare type enumTypePages = keyof typeof NavPagesEnum;

const header = (props: {
  countryCode: CountriesEnum;
  countryDisabled: boolean;
  onCountryEvent: (country: CountriesEnum, route: string) => void;
  onPageEvent: (page: NavPagesEnum) => void;
}): ReactElement => {
  // Get current route
  const history = createHistory();
  const route: string = history.location.pathname.split("/").slice(2).join("/");

  return (
    <Navbar sticky="top" bg="light" expand="sm">
      <div className="nav-page">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            defaultActiveKey={`${props.countryCode}/topNews`}
          >
            {Object.keys(NavPagesEnum).map((it: string, index: number) => {
              const enumdata: string = NavPagesEnum[it as enumTypePages];
              return (
                <NavLink
                  key={index}
                  to={`/${props.countryCode}/${it}`}
                  className="nav-link"
                  activeClassName="active"
                  onClick={() => props.onPageEvent(enumdata as NavPagesEnum)}
                >
                  {" "}
                  {enumdata}
                </NavLink>
              );
            })}{" "}
          </Nav>
        </Navbar.Collapse>
      </div>
      <Nav className="nav-country">
        {Object.values(CountriesEnum).map(
          (it: CountriesEnum, index: number) => {
            return (
              <Link
                key={index}
                to={`/${it}/${route}`}
                className={`nav-link country
                ${props.countryCode === it ? "active" : ""}
                ${props.countryDisabled ? "disabled" : ""}
              `}
                onClick={() => props.onCountryEvent(it, route)}
              >
                {it}
              </Link>
            );
          }
        )}{" "}
      </Nav>
    </Navbar>
  );
};

export default header;
