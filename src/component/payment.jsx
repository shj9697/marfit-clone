import { CircleSmall, CreditCard } from "lucide-react";
import { useCart } from "../context/CartProvider";

const Payment = ({ handleChooseTransaction }) => {

    const { cart } = useCart();

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <CreditCard className="text-green-500" />
                <h1 className="text-orange-500">CHOOSE PAYMENT</h1>
            </div>
            <div className="flex items-center border border-gray-400 rounded h-15 gap-3">
                <div className="flex items-center justify-between">
                    <CircleSmall className="text-orange-500" />
                    <img src="https://marfit-ea7ba.web.app/static/media/razorpay.cb9bcca7.png" alt="" className="h-12 w-20" />
                </div>
                <p className="text-[14px] text-gray-500">Pay via razorpay ₹ 15 off</p>
            </div>

            <button onClick={handleChooseTransaction} className="bg-orange-500 text-white rounded p-3 text-center w-full cursor-pointer"> ORDER FOR ₹{cart.totalAmount}</button>
        </div>
    )
}

export default Payment;