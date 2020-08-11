import React, { ReactElement } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Button from "react-bootstrap/Button";

import "./Header.scss";
import { CountriesEnum } from "../Service/CountriesEnum";

const header = (props: {
  country: CountriesEnum;
  countryDisabled: boolean;
  onCountryEvent: (country: CountriesEnum) => void;
  onTopNewsEvent: () => void;
}): ReactElement => {
  const handleEventTopNews = (): void => {
    props.onTopNewsEvent();
  };
  const handleEventCountry = (country: CountriesEnum): void => {
    props.onCountryEvent(country);
  };

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Nav className="mr-auto">
        <Nav.Link href="#topNews" active onClick={handleEventTopNews}>
          Top news
        </Nav.Link>
        <Nav.Link href="#categories">Categories</Nav.Link>
        <Nav.Link href="#search">Search</Nav.Link>
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
        <Nav.Link
          href="#gb"
          active={props.country === CountriesEnum.GB}
          disabled={props.countryDisabled}
          onClick={() => handleEventCountry(CountriesEnum.GB)}
        >
          {CountriesEnum.GB}
        </Nav.Link>
        <Nav.Link
          href="#en"
          active={props.country === CountriesEnum.US}
          disabled={props.countryDisabled}
          onClick={() => handleEventCountry(CountriesEnum.US)}
        >
          {CountriesEnum.US}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default header;
