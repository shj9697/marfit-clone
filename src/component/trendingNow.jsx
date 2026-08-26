import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";


function TrendingNow({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/trending");
  }

  function handleViewProductDetails(item) {
    navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
  }

  return (
    <SliderItem
      title={"Trending Now"}
      list={list}
      handleViewAll={handleViewProduct}
      handleProductDetails={handleViewProductDetails}
    />
  );
}

export default TrendingNow;
