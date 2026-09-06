import { Trash, Truck } from "lucide-react";
import { useCart } from "../context/CartProvider";

const CartItem = ({ item }) => {

    const { addToCart, removeFromCart, productDeleteFromCart } = useCart();

    return (
        <div className='flex p-3 bg-white w-full rounded'>
            <div className="w-[20%] ">
                <img src={item.img} alt={item.title} className='h-40 w-40' />
            </div>
            <div className='w-[80%]'>
                <div className="flex justify-between">
                    <h1 className="text-[15px]">{item.title}</h1>
                    <button
                        type="button"
                        className="flex items-center pr-2 cursor-pointer"
                        onClick={() => productDeleteFromCart(item.productId)}
                    >
                        <Trash className="text-red-800" />
                        <span className="text-[12px] text-red-800">Remove</span>
                    </button>
                </div>
                <div >
                    <div className="mt-3 flex justify-between items-center p-2">
                        <div className="flex flex-col items-center mx-3">
                            <p className="text-[16px]">₹{item.price}</p>
                            <div className="flex">
                                <p className="text-gray-400 text-[13px] line-through">₹{item.oldPrice}</p>
                                <p className="text-orange-600 text-[13px]">{item.product.off}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center">
                                <button type="button" className="cursor-pointer w-12" onClick={() => removeFromCart(item.productId)}>-</button>
                                <p>{item.quantity}</p>
                                <button type="button" className="cursor-pointer w-12" onClick={() => addToCart(item.productId)}>+</button>
                            </div>
                            <p className="text-[15px] text-gray-400">Quantity</p>
                        </div>
                        <div>
                            <p>7 Days Replacement Policy available</p>
                        </div>
                    </div>
                    <div className="flex justify-start gap-3 border-2 border-amber-600  rounded mt-3 text-[15px]">
                        <Truck />
                        <p className="">Delivery Charge :Free</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
