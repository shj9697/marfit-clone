import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProductCard = ({ item }) => {

    const navigate = useNavigate();
    const { toggleWishList, isInWishList } = useAuth();
    const wishListed = isInWishList(item.id);

    const handleViewProductDetails = (item) => {
        navigate(`/categories/${item.categoryRef.slug}/${item.subcategoryRef.slug}/${item.id}`)
    }

    return (
        <div className="shadow-xl cursor-pointer p-2 mx-1 my-1 w-64 h-88" >
            <div className='flex justify-between'>
                <img src={item.img} alt="" className="h-45 object-contain rounded-md w-full" />
                <Heart
                    size={24}
                    strokeWidth={2}
                    className={wishListed ? "fill-red-500 text-red-500 cursor-pointer" : "fill-white text-gray-600 cursor-pointer"}
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleWishList(item);
                    }}
                />

            </div>
            <div onClick={() => handleViewProductDetails(item)}>
                <p className="text-sm mb-2 text-left">{item.title}</p>
                <p className="text-sm">Rs. {item.price}</p>
                <div className="flex items-center gap-2"  >
                    <p className="text-sm line-through text-gray-500">Rs. {item.oldPrice} </p>
                    <span className="text-sm text-orange-600">{item.discount}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;