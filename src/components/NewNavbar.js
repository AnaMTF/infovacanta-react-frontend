import logo from "../resources/infovacanta_logo.png";
import default_profile_picture from "../resources/blank-profile-pic.png";

import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Image, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Site logo"
        />
        InfoVacanță
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Acasă</Nav.Link>
          <Nav.Link as={Link} to="/main">Recenzii</Nav.Link>
          <Nav.Link as={Link} to="/statiuni">Stațiuni</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        <Form inline className="mx-auto">
          <Dropdown className="mr-2">
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: '200px', align: 'left' }}>
              <Form>
                <Dropdown.Item as="div" style={{ justifyContent: "left", width: '200px', marginBottom: "0" }}>
                  <FormCheck
                    type="checkbox"
                    id="filter1"
                    label="Filter 1"
                  />
                </Dropdown.Item>
                <Dropdown.Item as="div" style={{ justifyContent: "left", width: '200px', marginBottom: "0" }}>
                  <FormCheck
                    type="checkbox"
                    id="filter2"
                    label="Filter 2"
                  />
                </Dropdown.Item>
                <Dropdown.Item as="div" style={{ justifyContent: "left", width: '200px', marginBottom: "0" }}>
                  <FormCheck
                    type="checkbox"
                    id="filter3"
                    label="Filter 3"
                  />
                </Dropdown.Item>
              </Form>
            </Dropdown.Menu>
          </Dropdown>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ marginBottom: "0" }} />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="light" id="dropdown-profile">
              <Image
                src={default_profile_picture}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Profile"
                style={{ objectFit: 'cover' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profil">Profilul meu</Dropdown.Item>
              <Dropdown.Item as={Link} to="/">Setări</Dropdown.Item>
              <Dropdown.Item as={Link} to="/">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
