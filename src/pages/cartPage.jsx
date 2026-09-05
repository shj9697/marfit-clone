import CartItem from '../component/cartItem';
import { useCart } from '../context/CartProvider'

const CartPage = ({ item }) => {

    const { addToCart, removeFromCart } = useCart();

    return (
        <div className='flex flex-row'>
            <div className='my-10 mx-13 w-full'>
                <div>
                    <h1 className='text-2xl'>Your Cart</h1>
                    <div className="flex items-center gap-2 my-1">
                        <span className="w-15 h-1 bg-orange-500"></span>
                    </div>
                </div>
                <CartItem item={item} />
            </div>
        </div>
    )
}

export default CartPage
