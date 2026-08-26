import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";

function Luggage({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/categories/luggage");
  }

  return (
    <SliderItem
      title={"Luggage & Suitcases"}
      list={list}
      handleViewAll={handleViewProduct}
    />
  );
}

export default Luggage;
