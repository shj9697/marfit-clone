import { ShoppingCart } from "lucide-react";

const CartDetails = ({ totalAmount }) => {

    return (
        <div className="py-3 mt-[-94px]">
            <div className="flex bg-white p-3 gap-2 rounded">
                <input type="text" name="" id="" className="bg-white rounded text-[13px] p-2 border border-gray-400 w-[200px]" placeholder="Enter Coupon Code" />
                <button className="border border-amber-600 text-[15px] text-orange-500 rounded px-5 cursor-pointer">APPLY</button>
            </div>
            <div className="flex flex-col justify-center items-center bg-white mt-5 gap-4">
                <div className="flex gap-6 text-gray-500 text-[12px] -tracking-tighter border-b border-gray-300 w-full px-6 py-4">
                    <p>CART</p>
                    <span>-----</span>
                    <p>ADDRESS</p>
                    <span>-----</span>
                    <p>PAYMENT</p>
                </div>
            </div>
            <div className="p-3 bg-white rounded">
                <div className="flex items-center text-[15px] text-orange-600 gap-2">
                    <ShoppingCart />
                    <p>Cart Summary</p>
                </div>
                <div className="text-gray-500 text-[13px] my-2 border-b border-b-gray-400">
                    <p>PRICE DETAILS</p>
                </div>
                <div className="flex justify-between text-[14px]">
                    <p>Total</p>
                    <p>₹ {totalAmount}</p>
                </div>
                <div className="flex justify-between text-[14px]">
                    <p>Shipping Fees</p>
                    <p>Free</p>
                </div>
                <div className="flex justify-between bg-gray-200 p-2 border border-orange-500 my-2">
                    <p>SubTotal</p>
                    <p>₹ {totalAmount}</p>
                </div>
                <div className="text-center p-2 bg-orange-500 my-2">
                    <button className="text-white text- cursor-pointer">CHOOSE ADDRESS</button>
                </div>
            </div>
        </div>
    )
}

export default CartDetails;
