import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";

function Cabins() {
  useEffect(() => {
    getCabins().then((data) => {
      console.log("Cabins data:", data);
    });
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
