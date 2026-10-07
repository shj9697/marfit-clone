import { CircleSmall, CreditCard } from "lucide-react";
import { useCart } from "../context/CartProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createRazorpayOrderAPI, getPaymentConfigAPI, placeOrderAPI, verifyRazorpayPaymentAPI } from "../api/paymentApi";

const Payment = ({ addressId }) => {

    const { cart, refreshCart } = useCart();
    const navigate = useNavigate();
    const [paymentConfig, setPaymentConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [placing, setPlacing] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const configData = await getPaymentConfigAPI();
                if (!cancelled) {
                    if (configData.status)
                        setPaymentConfig(configData.data);
                    else setError(configData.message);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [])

    const finishOrder = async (orderData) => {
        setPlacing(false);
        if (!orderData.status) return toast.error(orderData.message);
        await refreshCart();
        toast.success(`Order ${orderData.data.orderNumber} placed`);
        navigate("/dashboard/orders");
    };

    // Razorpay calls this after the customer pays, outside handleOrder's try/catch
    const verifyPayment = async (razorpayResponse) => {
        try {
            await finishOrder(await verifyRazorpayPaymentAPI(razorpayResponse));
        } catch (err) {
            setPlacing(false);
            toast.error(err.message);
        }
    };

    const payWithRazorpay = async () => {
        const orderData = await createRazorpayOrderAPI(addressId);
        if (!orderData.status) {
            setPlacing(false);
            return toast.error(orderData.message);
        }
        const razorpayOrder = orderData.data;

        // Dummy mode never contacts Razorpay, so skip the modal and verify straight away
        if (razorpayOrder.isDummy) {
            return verifyPayment({
                razorpay_order_id: razorpayOrder.razorpayOrderId,
                razorpay_payment_id: "pay_dummy",
                razorpay_signature: "dummy"
            });
        }

        new window.Razorpay({
            key: razorpayOrder.keyId,
            order_id: razorpayOrder.razorpayOrderId,
            name: razorpayOrder.name,
            prefill: razorpayOrder.prefill,
            handler: verifyPayment,
            // Closing the modal leaves no order behind and keeps the cart as it was
            modal: { ondismiss: () => setPlacing(false) }
        }).open();
    };

    const handleOrder = async () => {
        if (!paymentMethod) return toast.error("Please choose a payment method");
        setPlacing(true);
        try {
            if (paymentMethod === "cod") await finishOrder(await placeOrderAPI(addressId));
            else await payWithRazorpay();
        } catch (err) {
            setPlacing(false);
            toast.error(err.message);
        }
    };

    if (loading) {
        return <p>Loading......</p>
    }
    if (error) {
        return <p>Error : {error}</p>
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <CreditCard className="text-green-500" />
                <h1 className="text-[#fb6b25]">CHOOSE PAYMENT</h1>
            </div>
            <div className="flex flex-col border border-gray-100 rounded h-15 px-2">
                {paymentConfig.cod && (
                    <div className="flex items-center gap-2" onClick={() => setPaymentMethod("cod")}>
                        <CircleSmall className={`text-white ${paymentMethod === "cod" ? "fill-[#fb6b25]" : " border border-black bg-white rounded-[50%] w-3 h-3 mx-2"}`} />
                        <h1>Cash On Delivery </h1>
                    </div>
                )}
                {paymentConfig.razorpay && (
                    <div className="flex items-center" onClick={() => setPaymentMethod("razorpay")}>
                        <CircleSmall className={`w-3 h-3 mx-2 rounded-full border text-white ${paymentMethod === "razorpay" ? "bg-[#fb6b25] border-[#fb6b25]" : "bg-white border-black"}`} />
                        <img src="https://marfit-ea7ba.web.app/static/media/razorpay.cb9bcca7.png" alt="" className="h-12 w-20" />
                        <p className="text-[14px] text-gray-500">Pay via razorpay ₹ 15 off</p>
                    </div>
                )}
            </div>
            <button
                className="bg-[#fb641b] text-white rounded p-3 text-center w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={placing}
                onClick={handleOrder}
            >
                {placing ? "PLACING ORDER..." : `ORDER FOR ₹${cart.totalAmount}`}
            </button>
        </div>
    )
}

export default Payment;
