import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

import logo from "../resources/infovacanta_logo.png";

export const InfoVacantaNavbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  //console.log(user);

  // return (
  //   <div>
  //     <h1>Bara de navigatie</h1>
  //     <Link to="/">Home</Link>
  //     <Link to="/login">Login</Link>

  //     <div>
  //       {user && (
  //         <div >
  //           <p>Nume: {user?.displayName}</p>
  //           <img src={user?.photoURL} width="111" height="111" />
  //           <button onClick={signUserOut}>Iesi din cont</button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <Navbar sticky="top" bg="dark" variant="dark" className="justify-content-center">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Info Vacanță
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
          <Button type="submit">Submit</Button>
        </Form> */}

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{auth.currentUser?.displayName}</a>
          </Navbar.Text>
        </Navbar.Collapse>

        <Image src={$"{auth.currentUser?.photoURL}"} rounded />
      </Navbar>
    </div>
  )
};