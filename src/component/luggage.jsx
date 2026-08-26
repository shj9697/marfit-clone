import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";

function Luggage({ list = [] }) {
  const navigate = useNavigate();

  function handleViewProduct() {
    navigate("/categories/luggage");
  }

  function handleViewProductDetails(item) {
    navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
  }

  return (
    <SliderItem
      title={"Luggage & Suitcases"}
      list={list}
      handleViewAll={handleViewProduct}
      handleProductDetails={handleViewProductDetails}
    />
  );
}

export default Luggage;
