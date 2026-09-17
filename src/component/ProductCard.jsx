import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {

    const navigate = useNavigate();

    const handleViewProductDetails = (item) => {
        navigate(`/categories/${item.categoryRef.slug}/${item.subcategoryRef.slug}/${item.id}`)
    }

    const changeColor = () => {

    }

    return (
        <div className="shadow-xl cursor-pointer p-2 mx-1 my-1 w-64 h-88" >
            <div className='flex justify-between'>
                <img src={item.img} alt="" className="h-45 object-contain rounded-md w-full" />
                <Heart size={24} strokeWidth={2} onClick={() => { changeColor }} />

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