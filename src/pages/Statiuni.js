import { Container } from "react-bootstrap";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export const Statiuni = () => {
  const statiuni = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <h1>Statiuni</h1>
      <Container>
        <Jumbotron>
          <Row>
            {
              statiuni.map((statiune, index) => (
                <Col sm={4} key={index}>
                  <Card >
                    <h2>Statiune {index}</h2>
                    <Card.Body>
                      <h5>Nume statiune</h5>
                      <small>Categorie statiune</small>
                      <p>O descriere a statiunii</p>
                      <Button>Mai multe detalii</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Jumbotron>
      </Container>
    </div>
  )
};