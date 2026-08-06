import { Home } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddToCart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const Homepage = () => {
        window.location.href = "/"
    }

    return (
        <div>
            {cart.length === 0 ?
                <div className="flex items-center justify-center flex-col p-5 w-full h-96 my-36 ">
                    <h1 className="text-4xl leading-12 text-gray-900">Your cart is empty</h1>
                    <p className="text-base leading-12 text-gray-700">Add items in your cart and come back later to process checkout.</p>
                    <button className="bg-[#FB6B25] text-white p-4 rounded-md cursor-pointer" onClick={Homepage}>Continue to shopping</button>
                </div>
                :
                null
            }
        </div>
    )
};

export default AddToCart;