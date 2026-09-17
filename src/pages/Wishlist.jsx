import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { useState } from "react";

function Wishlist() {
    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);

    return (
        <div>
            <h2 className="text-2xl text-orange-600">Your Wishlist Items</h2>
            <div className="w-20 h-0.5 bg-gray-300 mt-3" />

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <p className="text-gray-500">Your wishlist is empty</p>
                    <button className="bg-orange-600 text-white px-6 py-2 mt-10 rounded cursor-pointer" onClick={() => { navigate('/') }}>Take me back to shopping</button>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 mt-6">
                    {wishlist.map((item) => (
                        <ProductCard item={item} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
