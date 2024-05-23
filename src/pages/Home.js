import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const Home = () => {
  return (
    <div>
      <h1>Pagina Principala</h1>
      <Jumbotron className="centered">
        <Container>
          <img src="" alt="Logoul aplicației infoVacanță" />
          <p>Toate informațiile necesare, disponibile într-un singur loc!</p>
          <hr></hr>
          <Button>Register</Button>
          <Button>Login</Button>
        </Container>
      </Jumbotron>
    </div>
  );
};