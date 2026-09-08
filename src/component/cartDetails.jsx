import { useState } from "react";
import CartSummary from "./cartSummary";
import Payment from "./payment";
import AddressDetails from "./AddressDetails";

const CartDetails = () => {
    const [step, setStep] = useState(0);

    const handleChooseAddress = () => {
        setStep(1);
    };

    const handleChoosePayment = () => {
        setStep(2);
    }

    const handleChooseTransaction = () => {
        setStep(3)
    }

    return (
        <div className="w-full">
            <div className="flex bg-white p-4 gap-2 rounded">
                <input type="text" name="" id="" className="bg-white rounded text-[13px] p-2 border border-gray-400 flex-1" placeholder="Enter Coupon Code" />
                <button className="border border-amber-600 text-[15px] text-orange-500 rounded px-5 cursor-pointer">APPLY</button>
            </div>
            <div className="flex flex-col justify-center items-center bg-white mt-5 gap-4 w-full">
                <div className="flex items-center justify-center gap-6 text-gray-500 text-[12px] -tracking-tighter border-b border-gray-300 px-6 py-4 w-full">
                    <p onClick={handleChooseAddress} className="cursor-pointer">CART</p>
                    <span>-----</span>
                    <p onClick={handleChoosePayment} className="cursor-pointer">ADDRESS</p>
                    <span>-----</span>
                    <p onClick={handleChooseTransaction} className="cursor-pointer">PAYMENT</p>
                </div>
                <div className="w-full p-4">
                    {step === 0 && <CartSummary handleChooseAddress={handleChooseAddress} />}
                    {step === 1 && <AddressDetails handleChoosePayment={handleChoosePayment} />}
                    {step === 2 && <Payment handleChooseTransaction={handleChooseTransaction} />}
                </div>
            </div>
        </div >
    )
}

export default CartDetails;
