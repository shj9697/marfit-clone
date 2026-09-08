import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import CartItem from "../component/cartItem";
import CartDetails from "../component/cartDetails";


const CartPage = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const { state } = useLocation();
    const buyNowId = state?.buyNowId;

    const items = buyNowId ? cart.items.filter((item) => item.productId === buyNowId) : cart.items;
    const summary = buyNowId
        ? {
            totalItems: items.reduce((count, item) => count + item.quantity, 0),
            totalAmount: items.reduce((total, item) => total + (item.lineTotal ?? item.price * item.quantity), 0),
        }
        : { totalItems: cart.totalItems, totalAmount: cart.totalAmount };

    const Homepage = () => {
        navigate('/')
    }

    return (
        <div className="w-full px-20">
            {items.length === 0 ?
                <div className="flex items-center justify-center flex-col p-5 w-full h-96 my-36 ">
                    <h1 className="text-4xl leading-12 text-gray-900">Your cart is empty</h1>
                    <p className="text-base leading-12 text-gray-700">Add items in your cart and come back later to process checkout.</p>
                    <button className="bg-[#FB6B25] text-white p-4 rounded-md cursor-pointer" onClick={() => Homepage()}>Continue to shopping</button>
                </div>
                :
                <div className='flex items-start w-full gap-6 px-6 py-10'>
                    <div className='w-2/3 flex flex-col gap-4'>
                        <div className="">
                            <div className="flex items-center gap-3">
                                <h1 className='text-2xl'>Your Cart</h1>
                                <p className="bg-orange-500 text-white p-1 rounded-xl text-[14px]">{summary.totalItems} items</p>
                            </div>
                            <div className="flex items-center gap-2 my-1">
                                <span className="w-15 h-1 bg-orange-500"></span>
                            </div>
                        </div>
                        {items.map((item) => (
                            <CartItem key={item.productId} item={item} />
                        ))}
                    </div>
                    <div className='w-1/3'>
                        <CartDetails totalAmount={summary.totalAmount} />
                    </div>
                </div>
            }
        </div>
    )
};

export default CartPage;
