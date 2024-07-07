import logo from "../resources/infovacanta_logo.png";
import default_profile_picture from "../resources/blank-profile-pic.png";

import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Image, FormCheck, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchFilters } from '../app/searchSlice';
import { useQuery } from "@tanstack/react-query";
import { logoutUser } from '../app/userSlice';

import "../css/header.css";

import Axios from "axios";

const SearchFilter = ({ show, handleClose }) => {
  const search = useSelector((state) => state.search.filters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filterSettings, setFilterSettings] = useState(search);

  const handleChange = (event) => {
    console.log("OLD FILTER SETTINGS\n", filterSettings)

    const { name, value, type, checked } = event.target;

    if (name === 'minRatings') {
      const newFilterSettings = {
        ...filterSettings,
        [name]: type === 'checkbox' ? checked : parseInt(value),
      };

      setFilterSettings(newFilterSettings);
      dispatch(setSearchFilters(newFilterSettings));

      console.log("NEW FILTER SETTINGS\n", newFilterSettings);

      return;
    }

    const newFilterSettings = {
      ...filterSettings,
      [name]: type === 'checkbox' ? checked : value,
    };

    setFilterSettings(newFilterSettings);
    dispatch(setSearchFilters(newFilterSettings));

    console.log("NEW FILTER SETTINGS\n", newFilterSettings);
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
            checked={filterSettings.isBeachDestination}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Destinație la munte?"
            name="isMountainDestination"
            checked={filterSettings.isMountainDestination}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Destinație balneară?"
            name="isThermalSpringDestination"
            checked={filterSettings.isThermalSpringDestination}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în recenzii?"
            name="searchInReviews"
            checked={filterSettings.searchInReviews}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați utilizatori?"
            name="searchInUsers"
            checked={filterSettings.searchInUsers}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în destinații?"
            name="searchInDestinations"
            checked={filterSettings.searchInDestinations}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în comentarii?"
            name="searchInComments"
            checked={filterSettings.searchInComments}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Căutați în recenziile salvate?"
            name="searchInSavedReviews"
            checked={filterSettings.searchInSavedReviews}
            onChange={handleChange}
          />
          <Form.Group controlId="formMinDate">
            <Form.Label>De la:</Form.Label>
            <Form.Control
              type="date"
              name="minDate"
              value={filterSettings.minDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMaxDate">
            <Form.Label>Până la:</Form.Label>
            <Form.Control
              type="date"
              name="maxDate"
              value={filterSettings.maxDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMinRatings">
            <Form.Label>Numărul minim de aprecieri:</Form.Label>
            <Form.Control
              type="number"
              name="minRatings"
              value={filterSettings.minRatings}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button id="confirmButton" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const MyNavbar = () => {
  const user = useSelector((state) => state.user.user);

  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // stari pentru modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // stari pentru bara de cautare (text)
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    handleClose();
    navigate(`cautare/${searchText}`);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
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
          {/* <Nav.Link as={Link} to="/">Acasă</Nav.Link> */}
          <Nav.Link as={Link} to="/main" className="btn-main">Recenzii</Nav.Link>
          <Nav.Link as={Link} to="/statiuni" className="btn-statiuni">Stațiuni</Nav.Link>
          {/* {!!user?.user_id || <Nav.Link as={Link} to="/login">Login</Nav.Link>}
          {!!user?.user_id || <Nav.Link as={Link} to="/register">Register</Nav.Link>} */}
          <Nav.Link as={Link} to="/contact" className="btn-contact">Contact</Nav.Link>
        </Nav><Form inline className="mx-auto" onSubmit={handleSearch}>
          <Button
            id="filterButton"
            variant="outline-primary"
            className="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2"
            style={{ marginRight: "8px" }}
            onClick={handleShow}
          >
            Filtre
          </Button>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            style={{ marginBottom: "0" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            id="searchButton"
            type="submit"
            variant="outline-success"
          >
            Search
          </Button>
        </Form>

        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="light" id="dropdown-profile" style={{ backgroundColor: "#E9FBFE" }}>
              <Image
                src={
                  user?.profile_picture_location || default_profile_picture
                }
                width="30"
                height="30"
                className="d-inline-block align-top profile-pic"
                alt="Profile"
                style={{ objectFit: 'cover' }}
                referrerPolicy='no-referrer'
              />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: "#E9FBFE" }}>
              {!!user?.user_id && <Dropdown.Item as={Link} to="/profil">
                <i className="fa-user fa-solid" style={{ marginRight: "6px" }} />
                Profilul meu</Dropdown.Item>}
              {!!user?.user_id && <Dropdown.Item as={Link} to="/setari">
                <i className="fa-gear fa-solid" style={{ marginRight: "6px" }} />
                Setări</Dropdown.Item>}
              {!!user?.user_id || <Dropdown.Item as={Link} to="/login">
                <i className="fa-right-to-bracket fa-solid" style={{ marginRight: "6px" }} />
                Login</Dropdown.Item>}
              {!!user?.user_id || <Dropdown.Item as={Link} to="/register">
                <i className="fa-user-plus fa-solid" style={{ marginRight: "6px" }} />
                Register</Dropdown.Item>}
              {!!user?.user_id && <Dropdown.Item as={Link} to="/" onClick={() => dispatch(logoutUser(navigate))}>
                <i className="fa-right-from-bracket fa-solid" style={{ marginRight: "6px" }} />
                Logout</Dropdown.Item>}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
      <SearchFilter show={show} handleClose={handleClose} />
    </Navbar>
  );
};
