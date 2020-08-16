import React, { ReactElement } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./Header.scss";
import { CountriesEnum } from "../../Service/CountriesEnum";
import { NavPagesEnum } from "../../Service/NavPagesEnum";
import { Link, NavLink } from "react-router-dom";

// Used to extract values from PagesEnum as its keys and values differ
declare type enumTypePages = keyof typeof NavPagesEnum;

const header = (props: {
  countryCode: CountriesEnum;
  countryDisabled: boolean;
  history: any;
  onCountryEvent: (country: CountriesEnum) => void;
  onPageEvent: (page: NavPagesEnum) => void;
}): ReactElement => {
  // Get current route
  const route: string = props.history.location.pathname
    .split("/")
    .slice(2)
    .join("/");

  return (
    <Navbar sticky="top" bg="light" expand="lg">
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
        {/* <div>
          <Link
            className="nav-link"
            to={`/${props.countryCode}/topNews`}
            onClick={() => props.onPageEvent(NavPagesEnum.topNews)}
          >
            Top News
          </Link>
        </div>
        <div>
          <Link
            className="nav-link"
            to={`/${props.countryCode}/categories`}
            onClick={() => props.onPageEvent(NavPagesEnum.categories)}
          >
            Categories
          </Link>
        </div>
        <div>
          <Link
            className="nav-link"
            to={`/${props.countryCode}/search`}
            onClick={() => props.onPageEvent(NavPagesEnum.search)}
          >
            Search
          </Link>
        </div> */}
      </Nav>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      {/* <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Top news</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Categories</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Search</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse> */}
      <Nav>
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
                onClick={() => props.onCountryEvent(it)}
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
