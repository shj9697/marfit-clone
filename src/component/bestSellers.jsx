import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";

function BestSellers({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/best-sellers")
  }

  return (
    <SliderItem
      title={"Best Sellers"}
      list={list}
      handleViewAll={handleViewProduct}
    />
  );
}

export default BestSellers;
