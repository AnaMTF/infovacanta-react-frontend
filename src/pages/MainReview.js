import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";

export const MainReview = () => {
  return (
    <div>
      <ListGroup.Item>
        <h2>Destinantion Name</h2>
        <small>Categorie</small>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          fermentum quam. Nulla facilisi. Nullam nec fermentum quam. Nulla
          facilisi. Nullam nec fermentum quam. Nulla facilisi. Nullam nec
          fermentum quam. Nulla facilisi. Nullam nec fermentum quam. Nulla
        </p>
        <Button>Editați</Button>
        <Button>Ștergeți</Button>
        <Button>Lăsați un comentariu</Button>
      </ListGroup.Item>
    </div>
  );
};