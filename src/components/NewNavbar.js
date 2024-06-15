import logo from "../resources/infovacanta_logo.png";
import default_profile_picture from "../resources/blank-profile-pic.png";

import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Image, FormCheck, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SearchFilter = ({ show, handleClose, handleSearch }) => {
  const [filters, setFilters] = useState({
    isBeachDestination: false,
    isMountainDestination: false,
    isThermalSpringDestination: false,
    searchInReviews: false,
    searchInUsers: false,
    searchInDestinations: false,
    searchInComments: false,
    minDate: '',
    maxDate: '',
    minRatings: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    handleSearch(filters);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filtrele căutării</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="checkbox"
            label="Destinație la mare?"
            name="isBeachDestination"
            checked={filters.isBeachDestination}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Destinație la munte?"
            name="isMountainDestination"
            checked={filters.isMountainDestination}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Destinație balneară?"
            name="isThermalSpringDestination"
            checked={filters.isThermalSpringDestination}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în recenzii?"
            name="searchInReviews"
            checked={filters.searchInReviews}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați utilizatori?"
            name="searchInUsers"
            checked={filters.searchInUsers}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în destinații?"
            name="searchInDestinations"
            checked={filters.searchInDestinations}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în comentarii?"
            name="searchInComments"
            checked={filters.searchInComments}
            onChange={handleChange}
          />
          <Form.Group controlId="formMinDate">
            <Form.Label>De la:</Form.Label>
            <Form.Control
              type="date"
              name="minDate"
              value={filters.minDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMaxDate">
            <Form.Label>Până la:</Form.Label>
            <Form.Control
              type="date"
              name="maxDate"
              value={filters.maxDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMinRatings">
            <Form.Label>Numărul minim de aprecieri:</Form.Label>
            <Form.Control
              type="number"
              name="minRatings"
              value={filters.minRatings}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const MyNavbar = () => {
  // stari pentru modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = (filters) => {
    console.log('Filters:', filters);
    // Handle search logic here
    handleClose();
  };

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
          <Button variant="outline-primary" style={{ marginRight: "8px" }} onClick={() => setShow(true)}>Filtre</Button>
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
      <SearchFilter show={show} handleClose={handleClose} handleSearch={handleSearch} />
    </Navbar>
  );
};
