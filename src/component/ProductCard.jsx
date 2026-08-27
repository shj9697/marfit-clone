import { useNavigate } from 'react-router-dom';

const ProductCard = ({ item }) => {

    const navigate = useNavigate();

    const handleViewProductDetails = (item) => {
        navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
    }

    return (
        <div className="shadow-xl cursor-pointer p-2 mx-1 my-1 w-64 h-88" onClick={() => handleViewProductDetails(item)}>
            <img src={item.img} alt="" className="h-45 object-contain rounded-md w-full" />
            <p className="text-sm mb-2 text-left">{item.title}</p>
            <p className="text-sm">Rs. {item.price}</p>
            <div className="flex items-center gap-2">
                <p className="text-sm line-through text-gray-500">Rs. {item.oldPrice} </p>
                <span className="text-sm text-orange-600">{item.discount}</span>
            </div>
        </div>
    )
}

export default ProductCard;