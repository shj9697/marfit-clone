import { useParams } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";



const items = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329001BRNCRO%2F1?alt=media&token=38ab0377-0a98-4056-9f76-a54ae5f21a35",
        title: "Genuine Leather Women Shoulder HandBag",
        price: "2999",
        oldPrice: "6999",
        off: "57% OFF",
    },
    {
        id: 2,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329040PURPLECRO%2FGenuine%20Leather%20Women%20Shoulder%20Handbag%20-%20LB9329040PURPLECRO?alt=media&token=5ac4da3d-7e1d-47b7-be5d-723ef3a1fb51",
        title: "Genuine Leather Women Shoulder HandBag",
        price: "3499",
        oldPrice: "6499",
        off: "46% OFF",
    },
    {
        id: 3,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329034GRNCRO%2FGenuine%20Green%20Leather%20Women%20Handbag%20-%20LB9329034GRNCRO?alt=media&token=a4926f1b-ff30-4920-8b37-c2b956427f9e",
        title: "Genuine Green Leather Women HandBag",
        price: "3499",
        oldPrice: "6499",
        off: "46% OFF",
    },
    {
        id: 4,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329026RED%2FGenuine%20Leather%20Women%20Shoulder%20Handbag%20-%20LB9329026RED?alt=media&token=bcbe5601-8c74-4a83-990f-8f399f4c6f3b",
        title: "Genuine Leather Women Shoulder HandBag",
        price: "3499",
        oldPrice: "5999",
        off: "42% OFF",
    },
    {
        id: 5,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329002BRNCRO%2FGenuine%20Leather%20Women%20Shoulder%20Handbag%20-%20LB9329002BRNCRO%20?alt=media&token=e9768975-e2a4-4bca-aedb-66acdad60be8",
        title: "Genuine Leather Women Shoulder HandBag",
        price: "2999",
        oldPrice: "9999",
        off: "70% OFF",
    },
    {
        id: 6,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329030TAN%2FGenuine%20Tan%20Leather%20Women%20Handbag%20?alt=media&token=353bd968-0ae1-44f9-b08d-38465b4140d5",
        title: "Genuine Tan Leather Women Handbag LB9329030TAN",
        price: "3499",
        oldPrice: "7499",
        off: "55% OFF",
    },
    {
        id: 7,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329035BLU%2FGenuine%20Blue%20Leather%20Women%20Shoulder%20Handbag%20-%20LB9329035BLU?alt=media&token=739ab66e-7ca0-4ec7-8d1e-891baf914168",
        title: "Genuine Blue Leather Women Shoulder Handbag LB9329035BLU",
        price: "3499",
        oldPrice: "6999",
        off: "50% OFF",
    },
    {
        id: 8,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329032TANCRO%2FGenuine%20Leather%20Women%20Shoulder%20Croc%20Handbag%20-%20LB9329032TANCRO?alt=media&token=2354d4b9-4aa5-41d5-8718-f478b9b9e362",
        title: "Genuine Leather Women Shoulder Croc Handbag LB9329032TANCRO",
        price: "3999",
        oldPrice: "7999",
        off: "50% OFF",
    },
    {
        id: 9,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329006MRN%2FGenuine%20Maroon%20Leather%20Women%20Shoulder%20Handbag%20-%20LB9329006MRN?alt=media&token=74ad0515-7456-4657-a756-a612307e9ee0",
        title: "Genuine Leather Women Shoulder Handbag - LB9329006MRN",
        price: "3499",
        oldPrice: "8999",
        off: "61% OFF",
    },
    {
        id: 10,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329033GRNCRO%2FGenuine%20Leather%20Women%20Shoulder%20Croc%20Handbag%20-LB9329033GRNCRO?alt=media&token=be83065a-60c7-499b-9971-7f6b87571ba5",
        title: "Genuine Leather Women Shoulder Croc Handbag LB9329033GRNCRO",
        price: "3999",
        oldPrice: "9999",
        off: "60% OFF",
    },
];

function ProductDetailsPage() {
    const { parentId, subId, productId } = useParams();
    const swiperRef = useRef(null);


    return (
        <div className=" my-10">
            <Breadcrumb
                paths={[
                    { title: parentId, link: `/categories/${parentId}` },
                    { title: subId, link: `/categories/${parentId}/${subId}` },
                    { title: 'product details', link: `/categories/${parentId}/${subId}/${productId}` },
                ]}
            />

            <div className="flex  w-full bg-white mx-20">
                <div className="flex flex-col w-[30%] h-160  mx-10 bg-white ">
                    <div className="w-full  h-140"></div>
                    <div className="flex w-full  h-20">
                        <button className="border border-orange-500 text-sm font-medium px-12 h-12 cursor-pointer">ADD TO CART</button>
                        <button className="bg-orange-500 text-sm px-12 h-12 font-medium cursor-pointer mx-4 text-white">BUY NOW</button>
                    </div>
                </div>
                <div className="w-[70%] border mx-35">

                </div>


            </div>
            <div className="mx-3 h-130 my-2 px-2 border-gray-300 rounded-md">
                <div className="mx-10">
                    <h1 className="text-3xl font-normal">Similar Products</h1>
                    <div className="crossline flex items-center gap-2 my-2">
                        <span className="w-20 h-1 bg-black"></span>
                        <span className="w-1 h-6 bg-black rotate-40"></span>
                        <span className="w-1 h-6 bg-black rotate-40"></span>
                        <span className="w-20 h-1 bg-black"></span>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, A11y]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={15}
                        slidesPerView={7}
                        className="my-4 drop-shadow-xl bg-white p-4 rounded-md"
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="shadow-xl p-4 cursor-pointer rounded-md">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="w-full h-48 object-cover"
                                    />
                                    <p className="text-sm mt-2">{item.title}</p>
                                    <p className="text-sm">Rs. {item.price}</p>
                                    <p className="text-sm line-through text-gray-500">
                                        Rs. {item.oldPrice}
                                    </p>
                                    <span className="text-sm text-orange-600">{item.off}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white-600 text-black w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white-900 text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mx-3 h-130 my-1 px-2 border-gray-300 rounded-md">
                <div className="mx-10">
                    <h1 className="text-3xl font-normal">You May Also Like</h1>
                    <div className="crossline flex items-center gap-2 my-2">
                        <span className="w-20 h-1 bg-black"></span>
                        <span className="w-1 h-6 bg-black rotate-40"></span>
                        <span className="w-1 h-6 bg-black rotate-40"></span>
                        <span className="w-20 h-1 bg-black"></span>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, A11y]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={17}
                        slidesPerView={7}
                        className="my-4 drop-shadow-xl bg-white p-4 rounded-md"
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="shadow-xl p-4 cursor-pointer rounded-md">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="w-full h-48 object-cover"
                                    />
                                    <p className="text-sm mt-2">{item.title}</p>
                                    <p className="text-sm">Rs. {item.price}</p>
                                    <p className="text-sm line-through text-gray-500">
                                        Rs. {item.oldPrice}
                                    </p>
                                    <span className="text-sm text-orange-600">{item.off}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white-600 text-black w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white-900 text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>


    )
}

export default ProductDetailsPage;