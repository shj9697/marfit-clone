import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductDetailsPage from "../pages/ProductDetailsPage";

const items = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FWT714400203BLK%2F%20Marfit%20Genuine%20Black%20Leather%20Wallet?alt=media&token=073cbc46-2403-4a5a-bff0-c3e6506ee49d",
        title: "Marfit genuine black leather wallet",
        price: 1399,
        oldPrice: 1599,
        discount: "13% OFF",
        parent: "Men",
        subcategory: "Wallets",
        productId: "Marfit Genuine Black Leather Wallet"
    },

];

function SliderItems5() {
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    const shadowStyle = {
        boxShadow: '1px 2px 3px rgba(0, 0, 0, .3)',
        border: '2px solid rgba(0, 0, 0, .03)',

    }

    function handleViewProductDetails(item) {
        navigate(`/categories/${item.parent}/${item.subcategory}/${item.productId}`)
    }

    return (
        <div className="mx-26 mt-4 p-3 rounded-md bg-white ">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-xl font-normal">Wallets & Card Holder</h1>
                    <div className="flex items-center gap-2 my-1">
                        <span className="w-15 h-px bg-black"></span>
                        <span className="w-px h-4 bg-black rotate-42"></span>
                        <span className="w-px h-4 bg-black rotate-42"></span>
                        <span className="w-15 h-px bg-black"></span>
                    </div>
                </div>
                <button className="text-white text-sm bg-orange-600 px-6 py-2 rounded-md cursor-pointer" onClick={() => navigate("/products/" + "Deal Of The Day")}>
                    View All
                </button>
            </div>

            <div className="relative">
                <Swiper
                    modules={[Navigation, A11y]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    spaceBetween={20}
                    slidesPerView={6}
                    className="my-4"
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="w-60! h-76!">
                            <div className="w-full h-full p-2 m-0 cursor-pointer " style={shadowStyle} onClick={() => handleViewProductDetails(item)}>
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
                    onClick={() => swiperRef.current.slidePrev()}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white-600 text-black w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button
                    onClick={() => swiperRef.current.slideNext()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white-900 text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SliderItems5;
