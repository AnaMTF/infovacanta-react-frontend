import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";

export const Login = () => {
  const navigate = useNavigate();

  const singInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
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
              <Button variant="primary" type="submit">Login cu Google</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}