import React, { ReactElement } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Button from "react-bootstrap/Button";

import "./Header.scss";

const header = (): ReactElement => {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Nav className="mr-auto">
        <Nav.Link href="#topNews" active>
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
        <Nav.Link href="#gb" active>
          GB
        </Nav.Link>
        <Nav.Link href="#en">US</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default header;
