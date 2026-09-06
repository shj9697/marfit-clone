import CartDetails from '../component/cartDetails';
import CartItem from '../component/cartItem';

const CartPage = ({ items, summary }) => {

    return (
        <div className='flex items-start w-full my-10'>
            <div className='w-[69%] flex flex-col gap-4'>
                {items.map((item) => (
                    <CartItem key={item.productId} item={item} />
                ))}
            </div>
            <div className='ml-5'>
                <CartDetails totalAmount={summary.totalAmount} />
            </div>
        </div>
    )
}
export default CartPage
