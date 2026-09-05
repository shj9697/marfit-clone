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
import { getProductDetailsAPI, getRelatedProductsAPI } from "../api/productapi";
import { getPincodeAPI } from "../api/home";


function ProductDetailsPage() {
    const navigate = useNavigate();
    const { parentId, subId, productId } = useParams();
    const similarSwiperRef = useRef(null);
    const alsoLikeSwiperRef = useRef(null);
    const [pincode, setPincode] = useState(700000);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [data, setData] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const data = await getRelatedProductsAPI(productId);
                const productDetails = await getProductDetailsAPI(productId);
                if (!cancelled) {
                    setSimilar(data.similar);
                    setData(data.youMayAlsoLike);
                    setProductDetails(productDetails.data);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [productId]);


    const pincodeVerify = async () => {
        const { data } = await getPincodeAPI(pincode);
        if (data?.serviceable) {
            setMessage(data?.message || "Available at your Pincode");
            setMessageType('success');
        } else {
            setMessage(data?.message || "Not-availble at your pincode");
            setMessageType('error');
        }
    }

    const handleBuyNow = () => {
        navigate(`/AddToCart`);
    };

    const corporateContact = () => {
        navigate(`/bulkContact?SKU`);
    }

    const handleImages = (index) => {
        setActiveImage(index);
    };

    if (loading) {
        return <p>Loading......</p>
    }
    if (error) {
        return <p>Error : {error}</p>
    };

    return (
        <section>
            <Breadcrumb
                paths={[
                    { title: parentId, link: `/categories/${parentId}` },
                    { title: subId, link: `/categories/${parentId}/${subId}` },
                ]}
            />
            <div className="flex w-full h-160 bg-white px-35">
                <div className="flex flex-col w-[30%] pt-3  ">
                    <div className="flex h-[450px]">
                        <div className="flex flex-col w-[20%] h-full gap-2">
                            {(productDetails?.images || []).map((img, index) => {
                                return (
                                    <div key={img.id} className={`w-16 h-16 p-2 rounded-lg border-2 ${activeImage === index ? "border-orange-500" : "border-transparent"}`}>
                                        <img src={img.url} alt={img.alt} className="w-full h-full cursor-pointer object-contain" onClick={() => handleImages(index)} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-[80%] h-full">
                            <img src={(productDetails?.images || [])?.[activeImage]?.url || ""} alt={(productDetails?.images || [])?.[activeImage]?.alt || "product-image"} className="w-full h-full cursor-pointer object-contain" />
                        </div>
                    </div>
                    <div className="flex ">
                        <button className="px-9 py-2 bg-transparent mr-5 cursor-pointer border-2 border-orange-600 whitespace-nowrap hover:-translate-y-2 transition-transform duration-200 ease-out" onClick={() => addToCart(productId)}>ADD TO CART</button>
                        <button className="px-9 py-2 bg-orange-600 text-white cursor-pointer whitespace-nowrap hover:-translate-y-2 transition-transform duration-200 ease-out" onClick={() => handleBuyNow(productId)}>BUY NOW</button>
                    </div>
                </div>
                <div className="w-[70%] px-3 py-10 mx-15 overflow-y-scroll no-scrollbar">
                    <div>
                        <h1 className="text-4xl leading-10">{productDetails.title}</h1>
                        <div className="flex items-center gap-2 my-2">
                            <p className="text-4xl">₹{productDetails.price} </p>
                            <p className="line-through text-gray-600 text-2xl">₹{productDetails.oldPrice}</p>
                            <p className="text-orange-600 font-medium text-md">{productDetails.discount}</p>
                        </div>
                    </div>
                    <div className="flex  w-[50%]">
                        <div className="flex flex-col  w-[20%]" >
                            <h1 className="text-lg font-semibold">Quantity</h1>
                            <div>
                                <select className="w-full h-full text-center cursor-pointer border-2 rounded-md border-gray-500">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col ml-4">
                            <h1 className="text-lg font-semibold">Color</h1>
                            <div className="flex">
                                <div className="m-1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063GRN%2F1?alt=media&token=737e828b-36e3-498f-b185-412ee163adc9" alt="" className="w-16 h-16 border-2 border-gray-500 rounded cursor-pointer" />
                                </div>
                                <div className="m-1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063DESBRN%20%2F1?alt=media&token=cc73770b-18dd-4510-b8ae-e32c7c6018d3" alt="" className="w-16 h-16 border-2 border-gray-500 rounded cursor-pointer" />
                                </div>
                                <div className="m-1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F1?alt=media&token=31d02f51-a5ca-4bb9-a96d-2d92d65291a7" alt="" className="w-16 h-16 border-2 border-gray-500 rounded cursor-pointer" />
                                </div>
                                <div className="m-1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BRN%2F1?alt=media&token=df599520-fd14-49a9-bcbb-c7e9b627d4a2" alt="" className="w-16 h-16 border-2 border-gray-500 rounded cursor-pointer" />
                                </div>
                                <div className="m-1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLU%2F1?alt=media&token=73dd0f5c-4e2d-4fdc-a081-32e9e0db9223" alt="" className="w-16 h-16 border-2 border-gray-500 rounded cursor-pointer" />
                                </div>
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
                        <div className="w-full h-0.5 bg-gray-500 mb-4"></div>
                        <p className="text-2xl ml-5">Product Details</p>
                        <div className="w-full h-0.5 bg-gray-500 mt-4"></div>
                    </div>
                    <p className="mt-2">BUY 100% Original Leather Products From MARFIT. Leather will long last and will never peel off like an artificial Leather. Customer satisfaction guaranteed. PRODUCT DETAIL : Removable, adjustable nylon long shoulder strap | Metal Hardware : durable enough for daily use Zip-top closure pure genuine leather CFC zipper | Handle type : Fixed solid full grain leather double handle , carried in 3 ways Handbags , Shoulder bag & Satchels . TO PROCESS AND CLAIM WARRANTY : Customer needs to send the product to the MARFIT, Kolkata. The Product will be rectified and send back to the Customer. This warranty shall be void if the product is damaged due to misuse, abuse, physical mishandling or natural causes such as flood, fire, earthquake or other perils.</p>
                    <div className="flex w-150 mx-2 ">
                        <div className="w-[30%]  p-5 leading-12 text-gray-600 font-semibold">
                            <h1>Height</h1>
                            <h1>Width</h1>
                            <h1>Thickness</h1>
                            <h1>Model Name</h1>
                            <h1>Closure</h1>
                            <h1>Sales Package</h1>
                            <h1>Leather Type</h1>
                            <h1>Weight</h1>
                            <h1>Compartments</h1>
                            <h1>Covered in Warranty</h1>
                            <h1>Domestic Warranty</h1>
                        </div>
                        <div className="w-[70%]  p-5 leading-12">
                            <p>32 cm</p>
                            <p>45 cm</p>
                            <p>7 cm</p>
                            <p>Genuine Leather Laptop Messenger Bag</p>
                            <p>Zipper</p>
                            <p>1 piece Laptop Messenger Bag</p>
                            <p>Top Grain</p>
                            <p>700 g</p>
                            <p>1 main compartments with with inner slip pockets</p>
                            <p>Warranty Covers Only Manufacturing Defects</p>
                            <p>1 Year</p>
                        </div>
                    </div>
                    <div className="py-4 h-20 ">
                        <div className="w-full h-0.5 bg-gray-500 mb-4"></div>
                        <p className="text-2xl font-semibold ml-5">Ratings & Review</p>
                        <p className="text-center my-10 ">No ratings or reviews</p>
                    </div>
                </div>
            </div>
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
                        {data.map((item) => (
                            <SwiperSlide key={item.id} className="w-60! h-84!">
                                <ProductCard item={item} />
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
        </section >
    );
}

export default ProductDetailsPage;