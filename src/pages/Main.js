import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { MainReview } from "./MainReview";

export const Main = () => {
  const reviews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <Container fluid>
        <Jumbotron>
          <h1>InfoVacanță</h1>
          <Button>Recenzie Nouă</Button>
          <Button>Ieșiți din cont</Button>
          <ListGroup>
            {
              reviews.map((review, index) => (
                <MainReview key={index} />
              ))
            }
          </ListGroup>
        </Jumbotron>
      </Container>
    </div>
  );
};