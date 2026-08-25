import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";


const SliderItem = ({ title, handleViewAll, list, handleProductDetails }) => {
    const swiperRef = useRef(null);

    const shadowStyle = {
        boxShadow: '1px 2px 3px rgba(0, 0, 0, .3)',
        border: '2px solid rgba(0, 0, 0, .03)',
    }

    return (
        <div className="mx-26 my-4 p-3 rounded-md bg-white ">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-normal">{title}</h1>
                    <div className="flex items-center gap-2 my-1">
                        <span className="w-15 h-px bg-black"></span>
                        <span className="w-px h-4 bg-black rotate-42"></span>
                        <span className="w-px h-4 bg-black rotate-42"></span>
                        <span className="w-15 h-px bg-black"></span>
                    </div>
                </div>
                <button
                    className="text-white text-sm bg-orange-600 px-6 py-2 rounded-md cursor-pointer"
                    onClick={handleViewAll}
                >
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
                    {list.map((item, index) => (
                        <SwiperSlide key={index} className="w-60! h-84!">
                            <div className="w-full h-full p-2 m-0 cursor-pointer " style={shadowStyle} onClick={() => handleProductDetails(item)}>
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
    )
}

export default SliderItem;