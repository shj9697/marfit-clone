import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../component/Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MapPin } from "lucide-react";
import { useCart } from "../context/CartProvider";
import ProductCard from "../component/ProductCard";
import { getProductByIdAPI, getRelatedProductsAPI } from "../api/productapi";


function ProductDetailsPage() {
    const navigate = useNavigate();
    const { parentId, subId, productId } = useParams();
    const similarSwiperRef = useRef(null);
    const alsoLikeSwiperRef = useRef(null);

    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [youMayAlsoLike, setYouMayAlsoLike] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // The route param is whatever the listing pages link with (`productId`, which is
    // the SKU on API products, otherwise the numeric id). The API resolves a product
    // by id, sku or slug, so any of those work here.
    useEffect(() => {
        let cancelled = false;

        async function loadProduct() {
            setLoading(true);
            setError(null);

            const { product, message } = await getProductByIdAPI(productId);
            if (cancelled) return;

            if (!product) {
                setProduct(null);
                setError(message);
                setLoading(false);
                return;
            }

            setProduct(product);
            setActiveImage(product.images?.[0]?.url ?? product.imageUrl ?? product.img);
            setQuantity(1);
            setLoading(false);

            const related = await getRelatedProductsAPI(productId);
            if (cancelled) return;
            setSimilar(related.similar);
            setYouMayAlsoLike(related.youMayAlsoLike);
        }

        loadProduct();
        window.scrollTo(0, 0);

        return () => { cancelled = true; };
    }, [productId]);

    const { addToCart } = useCart();


    const [pincode, setPincode] = useState(700000);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");


    const shadowStyle = {
        boxShadow: '1px 2px 3px rgba(0, 0, 0, .3)',
        border: '2px solid rgba(0, 0, 0, .03)',
    }

    function handleViewProductDetails(item) {
        navigate(`/categories/${encodeURIComponent(item.parent)}/${encodeURIComponent(item.subcategory)}/${encodeURIComponent(item.productId ?? item.id)}`)
    }



    const handleBuyNow = () => {
        navigate(`/AddToCart`);
    };

    const corporateContact = () => {

        navigate(`/bulkContact?SKU`);
    }

    const pincodeVerify = () => {
        if (pincode < 700000 || pincode > 700150) {
            setMessage("Not-availble at your pincode");
            setMessageType('error');
        } else {
            setMessage("Delivery within Feb 05, 2026 - Feb 06, 2026.");
            setMessageType('success');
        }
    }

    const breadcrumbPaths = [
        {
            title: product?.parent ?? parentId,
            link: `/categories/${encodeURIComponent(product?.parent ?? parentId)}`,
        },
        {
            title: product?.subcategory ?? subId,
            link: `/categories/${encodeURIComponent(product?.parent ?? parentId)}/${encodeURIComponent(product?.subcategory ?? subId)}`,
        },
    ];

    if (loading) {
        return (
            <section>
                <Breadcrumb paths={breadcrumbPaths} />
                <p className="text-center py-40 text-xl text-gray-600">Loading product...</p>
            </section>
        );
    }

    if (!product) {
        return (
            <section>
                <Breadcrumb paths={breadcrumbPaths} />
                <div className="text-center py-40">
                    <p className="text-2xl mb-2">Product not found</p>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        className="px-9 py-2 bg-orange-600 text-white cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Back to home
                    </button>
                </div>
            </section>
        );
    }

    const gallery = product.images?.length
        ? product.images
        : [{ id: product.id, url: product.imageUrl ?? product.img, alt: product.title }];

    return (
        <section>
            <Breadcrumb
                paths={[
                    ...breadcrumbPaths,
                    { title: product.title },
                ]}
            />

            <div className="flex w-full h-160 bg-white px-35">
                <div className="flex flex-col w-[30%] pt-3  ">
                    <div className="flex">

                        <div className=" w-20%  h-[570px] ">
                            {gallery.map(image => (
                                <div className="my-2" key={image.id ?? image.url}>
                                    <img
                                        src={image.url}
                                        alt={image.alt ?? product.title}
                                        onClick={() => setActiveImage(image.url)}
                                        className={`w-14 h-14 cursor-pointer object-cover ${activeImage === image.url ? 'border-2 border-orange-600' : ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mx-25 my-20 w-80% h-70  ">
                            <img src={activeImage} alt={product.title} className="w-60 h-60 cursor-pointer object-cover " />
                        </div>
                    </div>
                    <div className="flex ">
                        <button
                            className="px-9 py-2 bg-transparent mr-5 cursor-pointer border-2 border-orange-600 whitespace-nowrap hover:-translate-y-2 transition-transform duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!product.inStock}
                            onClick={() => addToCart(product.id, quantity)}
                        >
                            {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                        </button>
                        <button className="px-9 py-2 bg-orange-600 text-white cursor-pointer whitespace-nowrap hover:-translate-y-2 transition-transform duration-200 ease-out" onClick={() => handleBuyNow()}>BUY NOW</button>
                    </div>
                </div>

                <div className="w-[70%] px-3 py-10 mx-15 overflow-y-scroll no-scrollbar">
                    <h1 className="text-4xl leading-10">{product.title}</h1>
                    <div className="flex items-center gap-2 my-2">
                        <p className="text-4xl">₹{product.price} </p>
                        {product.oldPrice && <p className="line-through text-gray-600 text-2xl">₹{product.oldPrice}</p>}
                        {product.discountPercent > 0 && <p className="text-orange-600 font-medium text-md">{product.discountPercent}% off</p>}
                    </div>
                    {product.isLowStock && product.inStock && (
                        <p className="text-orange-600 font-medium">Only {product.stockQty} left in stock</p>
                    )}
                    <div className="flex  w-[50%]">
                        <div className="flex flex-col  w-[20%]" >
                            <h1 className="text-lg font-semibold">Quantity</h1>
                            <div>
                                <select
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                    className="w-full h-full text-center cursor-pointer border-2 rounded-md border-gray-500"
                                >
                                    {Array.from(
                                        { length: Math.min(10, product.stockQty || 10) },
                                        (_, index) => index + 1
                                    ).map(value => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="mt-15 text-orange-600 font-semibold cursor-pointer" onClick={corporateContact} >For bulk - Click here</button>
                    <div className="flex items-center gap-4 mt-5">
                        <h2 className="text-[18px] font-medium text-gray-500">Delivery </h2>
                        <div className="flex items-center gap-2 border-b-2 border-orange-500 p-2">
                            <MapPin className="text-orange-500" />
                            <input onChange={e => setPincode(e.target.value)} type="text" value={pincode} className="w-[100px] outline-none" />
                            <button className="text-orange-500 font-medium cursor-pointer" onClick={pincodeVerify}>Check</button>

                        </div>
                    </div>
                    <p className={`${messageType === 'error' ? 'text-orange-500' : 'text-green-500'} font-medium ml-21`}>{message}</p>


                    <div className="py-4 h-20 ">
                        <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
                        <p className="text-2xl ml-5">Product Details</p>
                        <div className="w-full h-[2px] bg-gray-500 mt-4"></div>
                    </div>

                    <p className="mt-2">{product.description}</p>
                    <div className="flex  w-150 mx-2 ">
                        <div className="w-[35%]  p-5 leading-12 text-gray-600 font-semibold">
                            <h1>SKU</h1>
                            <h1>Category</h1>
                            <h1>Subcategory</h1>
                            <h1>Availability</h1>
                            <h1>Embossable</h1>
                        </div>
                        <div className="w-[70%]  p-5 leading-12">
                            <p>{product.sku}</p>
                            <p>{product.parent}</p>
                            <p>{product.subcategory}</p>
                            <p>{product.inStock ? `In stock (${product.stockQty})` : 'Out of stock'}</p>
                            <p>{product.isEmbossable ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    <div className="py-4 h-20 ">
                        <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
                        <p className="text-2xl font-semibold ml-5">Ratings & Review</p>
                        <p className="text-center my-10 ">No ratings or reviews</p>
                    </div>

                </div>
            </div>

            {similar.length > 0 && (
                <div className="mx-26 my-4 p-3 rounded-md bg-white ">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-normal">Similar Products</h1>
                            <div className="flex items-center gap-2 my-1">
                                <span className="w-15 h-px bg-black"></span>
                                <span className="w-px h-4 bg-black rotate-45"></span>
                                <span className="w-px h-4 bg-black rotate-45"></span>
                                <span className="w-15 h-px bg-black"></span>
                            </div>
                        </div>

                    </div>

                    <div className="relative">
                        <Swiper
                            modules={[Navigation, A11y]}
                            onSwiper={(swiper) => (similarSwiperRef.current = swiper)}
                            spaceBetween={20}
                            slidesPerView={6}
                            className="my-4"
                        >
                            {similar.map((item) => (
                                <SwiperSlide key={item.id} className="w-60! h-84!">
                                    <ProductCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            onClick={() => similarSwiperRef.current?.slidePrev()}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white-600 text-black w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => similarSwiperRef.current?.slideNext()}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white-900 text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {youMayAlsoLike.length > 0 && (
                <div className="mx-26 my-4 p-3 rounded-md bg-white ">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-normal">You may also like</h1>
                            <div className="flex items-center gap-2 my-1">
                                <span className="w-15 h-px bg-black"></span>
                                <span className="w-px h-4 bg-black rotate-45"></span>
                                <span className="w-px h-4 bg-black rotate-45"></span>
                                <span className="w-15 h-px bg-black"></span>
                            </div>
                        </div>

                    </div>
                    <div className="relative">
                        <Swiper
                            modules={[Navigation, A11y]}
                            onSwiper={(swiper) => (alsoLikeSwiperRef.current = swiper)}
                            spaceBetween={20}
                            slidesPerView={6}
                            className="my-4"
                        >
                            {youMayAlsoLike.map((item) => (
                                <SwiperSlide key={item.id} className="w-60! h-84!">
                                    <div className="w-full h-full p-2 m-0 cursor-pointer shadow-lg  " style={shadowStyle} onClick={() => handleViewProductDetails(item)}>
                                        <img src={item.img} alt="" className="w-full h-52 object-cover" />
                                        <p className="text-sm mt-2">{item.title}</p>
                                        <p className="text-sm">Rs. {item.price}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm line-through text-gray-500">Rs. {item.oldPrice} </p>
                                            <span className="text-sm text-orange-600">{item.discount}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            onClick={() => alsoLikeSwiperRef.current?.slidePrev()}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white-600 text-black w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => alsoLikeSwiperRef.current?.slideNext()}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white-900 text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </section >
    );
}

export default ProductDetailsPage;
