import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";



const Accessories = ({ list = [] }) => {
    const navigate = useNavigate();

    function handleViewProduct() {
        navigate("/categories/accessories");
    }

    return (
        <SliderItem
            title={"Accessories"}
            list={list}
            handleViewAll={handleViewProduct}
        />
    );
}

export default Accessories;
