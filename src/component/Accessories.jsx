import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";



function Accessories({ list = [] }) {
    const navigate = useNavigate();

    function handleViewProduct() {
        navigate("/categories/accessories");
    }

    function handleViewProductDetails(item) {
        navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
    }

    return (
        <SliderItem
            title={"Accessories"}
            list={list}
            handleViewAll={handleViewProduct}
            handleProductDetails={handleViewProductDetails}
        />
    );
}

export default Accessories;
