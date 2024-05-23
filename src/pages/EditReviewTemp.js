import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function EditReview() {
  return (
    <Container className="jumbotron text-center">
      <h1>Header</h1>
      <Form id="editForm" method="post" action={`/api/reviews/`}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Destinația turistică vizitată"
            name="destinationname"
            defaultValue=""
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            name="reviewbody"
            id="content"
            placeholder="Scrieți aici recenzia dumneavoastră..."
            rows="10"
            defaultValue=""
          />
        </Form.Group>
        <div id="starRating" data-lyket-type="rate" data-lyket-id="" data-lyket-show-rating="user"></div>
        <Button className="full-width" type="submit" id="publicaBtn">
          Submit
        </Button>
      </Form>
      <Button className="full-width" href="/main" id="cancelBtn" variant="link">
        Anulează
      </Button>
    </Container>
  );
}

export default EditReview;
