import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";


function TrendingNow({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/trending");
  }


  return (
    <SliderItem
      title={"Trending Now"}
      list={list}
      handleViewAll={handleViewProduct}
    />
  );
}

export default TrendingNow;
