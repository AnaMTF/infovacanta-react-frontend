import Axios from "axios";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const Statiune = (props) => {
  let { nume } = useParams();
  let { data: statiune, isError, isPaused } = useQuery(["destination_link"], async function () {
    try {
      const result = await Axios.get(`http://localhost:5000/query/destinations/${nume}`);
      console.log(`http://localhost:5000/query/destinations/${nume}`);

      console.log(result.data[0]); // <-- testare: afisare date in consola
      return result.data[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  return (
    <div>
      <h1> {statiune?.destination_name} </h1>
      <p> {statiune?.description} </p>
    </div>
  );
};