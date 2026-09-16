import { useNavigate } from "react-router-dom";

function Wishlist() {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-2xl text-orange-600">Your Wishlist Items</h2>
            <div className="w-20 h-0.5 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <button className="bg-orange-600 text-white px-6 py-2 mt-10 rounded cursor-pointer" onClick={() => { navigate('/') }}>Take me back to shopping</button>
            </div>
        </div>
    );
}

export default Wishlist;
