import { ShoppingCart, Trash, Truck } from "lucide-react";
import { useCart } from "../context/CartProvider";

const CartItem = ({ item }) => {

    const { cart } = useCart();

    return (
        <div className="flex items-start w-full">
            <div className='flex p-3 bg-white w-[69%] rounded'>
                <div className="w-[20%] ">
                    <img src={item.img} alt={item.title} className='h-40 w-40' />
                </div>
                <div className='w-[80%]'>
                    <div className="flex justify-between">
                        <h1 className="text-[15px]">{item.title}</h1>
                        <div className="flex items-center pr-2 cursor-pointer">
                            <Trash className="text-red-800" />
                            <button className="text-[12px] text-red-800">Remove</button>
                        </div>
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
                                    <button className="cursor-pointer w-12">-</button>
                                    <p>0</p>
                                    <button className="cursor-pointer w-12">+</button>
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
            <div className="ml-5 py-3">
                <div className="flex bg-white p-3 gap-2">
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
                <div className="p-3 bg-white">
                    <div className="flex items-center text-[15px] text-orange-600 gap-2">
                        <ShoppingCart />
                        <p>Cart Summary</p>
                    </div>
                    <div className="text-gray-500 text-[13px] my-2 border-b border-b-gray-400">
                        <p>PRICE DETAILS</p>
                    </div>
                    <div className="flex justify-between text-[14px]">
                        <p>Total</p>
                        <p>₹ {cart.totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-[14px]">
                        <p>Shipping Fees</p>
                        <p>Free</p>
                    </div>
                    <div className="flex justify-between bg-gray-200 p-2 border border-orange-500 my-2">
                        <p>SubTotal</p>
                        <p>₹ {cart.totalAmount}</p>
                    </div>
                    <div className="text-center p-2 bg-orange-500 my-2">
                        <button className="text-white text- cursor-pointer">CHOOSE ADDRESS</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartItem;