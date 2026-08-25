import { useNavigate } from "react-router-dom";
import SliderItem from "./sliderItem";

const items = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FWT714400203BLK%2F%20Marfit%20Genuine%20Black%20Leather%20Wallet?alt=media&token=073cbc46-2403-4a5a-bff0-c3e6506ee49d",
        title: "Marfit genuine black leather wallet",
        price: 1399,
        oldPrice: 1599,
        discount: "13% OFF",
        parent: "Men",
        subcategory: "Wallets",
        productId: "Marfit Genuine Black Leather Wallet"
    },

];

function SliderItems5() {
    const navigate = useNavigate();

    function handleViewProduct() {
        navigate("/products/" + "Wallet and Cardholder")
    }

    function handleViewProductDetails(item) {
        navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
    }

    return (
        <SliderItem
            title={"Wallet and Cardholder"}
            list={items}
            handleViewAll={handleViewProduct}
            handleProductDetails={handleViewProductDetails}
        />
    );
}

export default SliderItems5;
