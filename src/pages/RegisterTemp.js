import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function Register() {
  return (
    <Container className="mt-5">
      <div className="jumbotron text-center">
        <h1>Register</h1>
      </div>
      <Row>
        <Col sm={8}>
          <Card>
            <Card.Body>
              {/* Makes POST request to /register route */}
              <Form action="/register" method="POST">
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="username"
                    id="email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="nickname">Nume de utilizator</Form.Label>
                  <Form.Control
                    type="text"
                    name="nickname"
                    id="nickname"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="fullname">Nume complet</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    id="fullname"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                  />
                </Form.Group>
                <Button type="submit" variant="dark">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="social-block">
            <Card.Body>
              <Button
                className="btn-block"
                href="/auth/google"
                role="button"
                variant="light"
              >
                <i className="fab fa-google"></i>
                Sign Up with Google
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;

