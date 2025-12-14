import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function SliderItems1() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const items = [
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FNMB2155020BLK%2FGenuine%20Leather%20Black%20Laptop%20Messenger%20Bag%20For%20Men%20-%20NMB2155020BLK?alt=media&token=74189345-8c97-40de-a766-8df0b20f8d20",
      title: "Genuine Leather Black Laptop Messenger Bag",
      price: 4999,
      oldPrice: 14999,
      discount: "46% OFF",
    },
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155082BRN%2FGenuine%20Leather%20Office%20Messenger%20Bag%20For%20Men%20-%20MB2155082BRN?alt=media&token=7099b6bb-7197-4c4b-93ae-75bb319b239f",
      title: "Brown Leather Office BriefCase For Men",
      price: 2999,
      oldPrice: 11999,
      discount: "75% OFF",
    },
    {
      id: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BRN%2FGenuine%20Leather%20Laptop%20Messenger%20bag%20For%20Men%20-%20MB2155063BRN?alt=media&token=47c1683c-efd8-405a-8617-f99a89f5ef01",
      title: "Leather Medium Check-In Trolley Bag",
      price: 4999,
      oldPrice: 11999,
      discount: "58% OFF",
    },
    {
      id: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155021BLU%2FGenuine%20Leather%20Black%20Bombay%20Messenger%20bag%20For%20Men%20-%20MB2155021BLU?alt=media&token=1d04ecfc-218d-4f5f-b42a-41c88f5f65a0",
      title: "Leather Blue Bombay Messenger Bag",
      price: 3599,
      oldPrice: 9999,
      discount: "64% OFF",
    },
    {
      id: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155019DESBRN%20%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155019DESBRN%20?alt=media&token=e7f70776-2cc4-45b5-b908-53ac01da638e",
      title: "Leather Medium Check-In Trolley Bag",
      price: 4999,
      oldPrice: 11999,
      discount: "58% OFF",
    },
    {
      id: 6,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155016BRN%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=0936a8a7-766e-4796-bc1c-bad16cfcac8f",
      title: "Genuine Leather Laptop Messenger Bags - MB2155016BRN",
      price: 4999,
      oldPrice: 12999,
      discount: "62% OFF",
    },
    {
      id: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FNMB2155062BRN%2FGenuine%20Leather%20Office%20Laptop%20Messenger%20Bag%20For%20Men%20-%20NMB2155062BRN?alt=media&token=f2d036d6-2600-4de4-ab79-5099d780357d",
      title: "Genuine Leather Office Laptop Messenger Bag For Men - NMB2155062BRN",
      price: 4999,
      oldPrice: 14999,
      discount: "67% OFF",
    },
    {
      id: 8,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155005BLK%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=9afe096a-1d6b-4a25-8c91-de7fe42ebf00",
      title: "Genuine Leather Laptop Messenger Bags - MB2155005BLK",
      price: 4999,
      oldPrice: 11999,
      discount: "58% OFF",
    },
    {
      id: 9,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155022BRN%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=6fe5ff8f-01df-4fad-875d-ba6bc72e7579",
      title: "Genuine Leather Laptop Messenger Bags - MB2155022BRN",
      price: 4999,
      oldPrice: 11999,
      discount: "58% OFF",
    },
    {
      id: 10,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155043%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=e8af6662-31a6-4baa-ad85-382d4505283f",
      title: "Genuine Leather Laptop Messenger Bags - MB2155043",
      price: 3499,
      oldPrice: 9999,
      discount: "65% OFF",
    },
  ];
  

  return (
    <div className="mx-12 my-12 px-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Messenger Bags</h1>
        <button className="text-white text-sm bg-orange-600 px-6 py-2 rounded-md cursor-pointer" onClick={() => navigate("/products/"+"Messenger Bags")}>
          View All
        </button>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, A11y]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={5}
          className="my-4 drop-shadow-xl bg-white p-4 rounded-md"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-xl p-4 cursor-pointer rounded-md">
                <img src={item.img} alt="" className="w-full h-48 object-cover" />
                <p className="text-sm mt-2">{item.title}</p>
                <p className="text-sm">Rs. {item.price}</p>
                <p className="text-sm line-through text-gray-500">Rs. {item.oldPrice}</p>
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
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

export default SliderItems1;
