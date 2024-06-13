import { useParams } from "react-router-dom";

export const Statiune = (props) => {
  let { nume } = useParams();

  return (
    <div>
      <h1> Statiune {nume} </h1>
      <p> Descrierea Statiunii </p>
    </div>
  );
};