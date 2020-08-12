import React, { ReactElement } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./Header.scss";
import { CountriesEnum } from "../Categories/CountriesEnum";
import { PagesEnum } from "../Service/PagesEnum";

// Used to extract values from PagesEnum as its keys and values differ
declare type enumTypePages = keyof typeof PagesEnum;

const header = (props: {
  country: CountriesEnum;
  countryDisabled: boolean;
  onCountryEvent: (country: CountriesEnum) => void;
  onPageEvent: (page: PagesEnum) => void;
}): ReactElement => {
  const handleEventCountry = (country: CountriesEnum): void => {
    props.onCountryEvent(country);
  };

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Nav className="mr-auto">
        {Object.keys(PagesEnum).map((it: string, index: number) => {
          const enumdata: string = PagesEnum[it as enumTypePages];
          return (
            <Nav.Link
              key={index}
              href={`#${it}`}
              onClick={() => props.onPageEvent(enumdata as PagesEnum)}
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
