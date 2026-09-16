import { useNavigate } from "react-router-dom";

function Orders() {
    const navigate = useNavigate();
    return (
        <div>
            <h2 className="text-2xl text-orange-600">Your Order</h2>
            <div className="w-20 h-0.5 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-2xl text-orange-600">Empty Order List</h2>
                <p className="mt-2 text-[17px] text-gray-500">You have no items in your orderlist.</p>
                <button className="bg-orange-600 text-white px-6 py-2 mt-10 rounded cursor-pointer" onClick={() => { navigate('/') }}>Take me back to shopping</button>
            </div>
        </div>
    );
}

export default Orders;
