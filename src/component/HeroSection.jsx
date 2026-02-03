import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HeroSection() {
  const swiperRef1 = useRef(null);

  const images = [
    "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fadvertisement%2Ftopbanner%2F1?alt=media&token=fa281305-3623-4676-87da-a169844da19a",
    "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fadvertisement%2FbottomBanner2%2FNaN?alt=media&token=9bffa94d-ff5d-4255-b738-7d3f727e2ab5f",
  ];

  return (
    <div className="relative mx-26">
      <Swiper
        modules={[Navigation, A11y]}
        onSwiper={(swiper) => (swiperRef1.current = swiper)}
        spaceBetween={20}
        slidesPerView={1}
        className="my-4 drop-shadow-xl bg-gray-100 text-black p-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt="slider"
              className="w-full h-[400px] object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        onClick={() => swiperRef1?.current?.slidePrev()}
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
        onClick={() => swiperRef1?.current?.slideNext()}
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
  );
}
