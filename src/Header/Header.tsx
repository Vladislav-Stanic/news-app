import React, { ReactElement } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./Header.scss";
import { CountriesEnum } from "../Service/CountriesEnum";
import { NavPagesEnum } from "../Service/NavPagesEnum";
import { PagesEnum } from "../Service/PagesEnum";

// Used to extract values from PagesEnum as its keys and values differ
declare type enumTypePages = keyof typeof NavPagesEnum;

const header = (props: {
  country: CountriesEnum;
  countryDisabled: boolean;
  currentPage: PagesEnum;
  onCountryEvent: (country: CountriesEnum) => void;
  onPageEvent: (page: NavPagesEnum) => void;
}): ReactElement => {
  const handleEventCountry = (country: CountriesEnum): void => {
    props.onCountryEvent(country);
  };

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Nav className="mr-auto">
        {Object.keys(NavPagesEnum).map((it: string, index: number) => {
          const enumdata: string = NavPagesEnum[it as enumTypePages];
          return (
            <Nav.Link
              key={index}
              href={`#${it}`}
              active={PagesEnum[props.currentPage] === (it as unknown)}
              onClick={() => props.onPageEvent(enumdata as NavPagesEnum)}
            >
              {" "}
              {enumdata}
            </Nav.Link>
          );
        })}{" "}
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
              <Nav.Link
                key={index}
                href={`#${it.toLowerCase()}`}
                active={props.country === it}
                disabled={props.countryDisabled}
                onClick={() => handleEventCountry(it)}
              >
                {it}
              </Nav.Link>
            );
          }
        )}{" "}
      </Nav>
    </Navbar>
  );
};

export default header;
