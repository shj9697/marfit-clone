import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";

function DealOfTheDayCards({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/deal-of-the-day")
  }


  return (
    <SliderItem
      title={"Deal Of The Day"}
      list={list}
      handleViewAll={handleViewProduct}
    />
  );
}

export default DealOfTheDayCards;
