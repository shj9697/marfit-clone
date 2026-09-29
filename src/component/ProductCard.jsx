import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProductCard = ({ item }) => {

    const navigate = useNavigate();
    const { toggleWishList, isInWishList, user } = useAuth();
    const wishListed = isInWishList(item.id);

    const handleViewProductDetails = (item) => {
        navigate(`/categories/${item.categoryRef.slug}/${item.subcategoryRef.slug}/${item.id}`)
    }

    return (
        <div
            className="cursor-pointer p-2 my-1 min-h-80"
            style={{
                borderTop: "1px solid rgba(0,0,0,.03)",
                borderLeft: "1px solid rgba(0,0,0,.1)",
                boxShadow: "1px 2px 3px rgba(0,0,0,.2)"
            }}
        >
            <div className='flex justify-between'>
                <img src={item.img} alt="" className="h-45 object-contain rounded-md w-full" />
                {user ?
                    <Heart
                        size={24}
                        strokeWidth={2}
                        className={wishListed ? "fill-red-500 text-red-500 cursor-pointer" : "fill-white text-gray-600 cursor-pointer"}
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleWishList(item);
                        }}
                    />
                    : null}

            </div>
            <div onClick={() => handleViewProductDetails(item)}>
                <p className="text-sm mb-2 text-left line-clamp-2">{item.title}</p>
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