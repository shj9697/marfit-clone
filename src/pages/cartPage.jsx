import { useCart } from '../context/CartProvider'

const CartPage = ({ items }) => {

    const { addToCart, removeFromCart } = useCart();

    return (
        <div>

        </div>
    )
}

export default CartPage