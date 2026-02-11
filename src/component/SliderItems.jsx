import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    id: 1,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329034TANCRO%2F1?alt=media&token=352fe421-02ca-4f4f-b2de-3b7f42df7682",
    title: "Genuine Leather Women HandBag - LB9329034TANCRO",
    price: 3499,
    oldPrice: 6499,
    discount: "46% OFF",
    parent: "Women",
    subcategory: "Handbag",
    productId: "1"
  },
  {
    id: 2,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FBC1149002BRN%2FGenuine%20Brown%20Leather%20Briefcase%20For%20Men%20-%20BC1149002BRN?alt=media&token=7a190322-9e88-45ce-9d26-477e84018b1b",
    title: "Genuine Brown Leather Office BriefCase For Men - BC149002BRN",
    price: 4299,
    oldPrice: 9999,
    discount: "57% OFF",
    parent: "Men",
    subcategory: "BriefCase",
    productId: "2"
  },
  {
    id: 3,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2F7YXiIeh6Bd2XHKqkyuoe%2FGenuine%20Leather%20Medium%20Check-In%20Trolley%20FA007%20-%20TB2155062BRNCRO?alt=media&token=51a846b1-cc3e-4e62-9cd4-1087e4b7f98e",
    title: "Leather Medium Check-In Trolley FA007 - TB2155062BRNCRO",
    price: 7199,
    oldPrice: 19999,
    discount: "64% OFF",
    parent: "Luggage & SuitCase",
    subcategory: "Trolley Bags",
    productId: "3"
  },
  {
    id: 4,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FJB1149020BRN%2FGenuine%20Leather%20Vanity%20Box%20Jewellery%20Organiser%2C%20Bangles%2C%20Necklaces%2C%20Ear%20rings%2C%20Finger%20rings%2C%20Nose%20Pin%20Vanity%20Box%20-%20JB1149020BRN?alt=media&token=72e96f4f-b759-491a-a4be-e03cc76945a9",
    title: "Leather Vanity Box – JB1149020BRN",
    price: 3599,
    oldPrice: 9999,
    discount: "64% OFF",
    parent: "Accessories",
    subcategory: "Jewellery Box",
    productId: "4"
  },
  {
    id: 5,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCB1129089GRN%2FWomen's%20-%20Genuine%20Green%20Leather%20CrossBody%20Bags%20-%20CB1129089GRN?alt=media&token=57c6bed2-1bcf-4629-a31f-2471e9920fbc",
    title: "Genuine Green Leather CrossBody – CB1129089GRN",
    price: 1890,
    oldPrice: 3999,
    discount: "53% OFF",
    parent: "Accessories",
    subcategory: "Jewellery Box",
    productId: "5"
  },
  {
    id: 6,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FDtcZ0gRtUnz3mEYrzSij%2FGenuine%20Tan%20Leather%20Sling%20bag%20For%20Men%20-%20SL1893003TAN?alt=media&token=4b59d4d1-3912-483a-958b-dd2919eed28d",
    title: "Genuine Tan Leather Sling bag For Men - SL1893003TAN",
    price: 1799,
    oldPrice: 3999,
    discount: "55% OFF",
    parent: "Men",
    subcategory: "Sling Bags",
    productId: "6"
  },
  {
    id: 7,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FWB1149006BRN%2FGenuine%20Leather%20Watch%20Box%20For%20Men%20%26%20Women%20(12%20Slots)%20-%20WB1149006BRN?alt=media&token=ebecf50f-ef1d-462c-a124-ccdba3afeac9",
    title: "Genuine Leather Watch Box For Men & Women (12 Slots) - WB1149006BRN",
    price: 2699,
    oldPrice: 5999,
    discount: "55% OFF",
    parent: "Accessories",
    subcategory: "Watch Box",
    productId: "7"
  },
  {
    id: 8,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155019BRN%2FGenuine%20Leather%20Office%20Laptop%20Messenger%20Bag%20For%20Men%20-%20MB2155019BRN?alt=media&token=aa3359e2-e8f0-4fcd-8f79-b2960e3f567f",
    title: "Genuine Leather Office Laptop Messenger Bag For Men - MB2155019BRN",
    price: 4999,
    oldPrice: 7499,
    discount: "33% OFF",
    parent: "Men",
    subcategory: "Messenger bags",
    productId: "8"
  },
  {
    id: 9,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155002BRN%2FGenuine%20Leather%20Duffel%20Bag%20for%20Travel%20Gym%20-%20TB2155002BRN?alt=media&token=687a79be-80f5-4880-a903-0dbbb1906c7d",
    title: "Genuine Leather Duffel Bag for Travel Gym - TB2155002BRN",
    price: 3099,
    oldPrice: 11999,
    discount: "74% OFF",
    parent: "Luggage & SuitCase",
    subcategory: "Duffle Bags",
    productId: "9"
  },
  {
    id: 10,
    img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026BRN?alt=media&token=41e1e314-4250-429a-8471-eae54b62a90f",
    title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026BRN",
    price: 3119,
    oldPrice: 5799,
    discount: "46% OFF",
    parent: "Men",
    subcategory: "Messenger bags",
    productId: "10"
  },
];

function SliderItems() {
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
    <div className="mx-26 my-4 p-3 rounded-md bg-white ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-normal">Deal of the day</h1>
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
            <SwiperSlide key={index} className="w-60! h-84!">
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

export default SliderItems;
