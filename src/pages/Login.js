import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//import { Axios } from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../css/styles.css";
import "../css/login.css";


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Axios } from "axios";

export const Login = () => {
  //const []

  const navigate = useNavigate();

  const singInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // result.user === auth.currentUser
      // logica pt baza de date

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }


  const signInWithFacebook = async () => {
    // TO DO
  }

  return (
    <div>
      <h1>Pagina de autentificare</h1>
      <button onClick={singInWithGoogle}>Autentificare cu Google</button>
      <hr></hr>
      <Row>
        <Col sm={8}>
          <Card>
            <Card.Body>
              {/* Makes POST request to /login route (comentariu vechi) */}
              <Form>
                <Form.Group>
                  <EmailIcon />
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Emailul dumneavoastră" name="email" />
                </Form.Group>
                <Form.Group>
                  <KeyIcon />
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Parola dumneavoastră" name="password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
              </Form>
            </Card.Body>
          </Card>
          <Card sm={4}>
            <Card.Body>
              <Button variant="primary" type="submit" onClick={singInWithGoogle}>Login cu Google</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}