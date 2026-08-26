import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";

function DealOfTheDayCards({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/deal-of-the-day")
  }

  function handleViewProductDetails(item) {
    navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
  };

  return (
    <SliderItem
      title={"Deal Of The Day"}
      list={list}
      handleViewAll={handleViewProduct}
      handleProductDetails={handleViewProductDetails}
    />
  );
}

export default DealOfTheDayCards;
