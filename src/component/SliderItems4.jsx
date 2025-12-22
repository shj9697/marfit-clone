import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";



function SliderItems4() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  function handleViewProductDetails(item) {
    navigate(`/categories/${item.parent}/${item.subcategory}/${item.productId}`)
  }

  const items = [
    {
      id: 1,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155002BRNHUN%2F%20Genuine%20Hunter%20Leather%20Cabin%20Suitcase%20%20FA002%20-%20TB2155002BRNHUN?alt=media&token=9d0a2cdf-33dd-4879-9ca0-642d22c24eb9",
      title: "Genuine Hunter Leather Cabin Suitcase",
      price: "9999",
      oldPrice: "17999",
      off: "44% OFF",
    },
    {
      id: 2,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155062BLKCRO%2FGenuine%20Leather%20Medium%20Check-In%20Trolley%20FA007%20-%20TB2155062BLKCRO?alt=media&token=9d1b4e92-1725-44f3-81ac-967d3031a930",
      title: "Genuine Leather Medium Check-In Trolley",
      price: "4299",
      oldPrice: "9999",
      off: "57% OFF",
    },
    {
      id: 3,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155007BRN%2FGenuine%20Leather%20Small%20Check-In%20Trolley%20FA007%20-%20TB2155007BRN?alt=media&token=6b59cd3b-3364-460c-87f4-e81aca7e972e",
      title: "Genuine Leather Small Check-In Trolley",
      price: "7199",
      oldPrice: "19999",
      off: "64% OFF",
    },
    {
      id: 4,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155069BLKCRO%2FGenuine%20Leather%20Large%20Check-In%20Trolley%20FA009%20-%20TB2155069BLKCRO?alt=media&token=caf29781-5b1a-4f9f-9c78-4ef1b8a45198",
      title: "Genuine Leather Large Check-In Trolley",
      price: "3599",
      oldPrice: "9999",
      off: "64% OFF",
    },
    {
      id: 5,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155001BRN%2FGenuine%20Leather%20Laptop%20Overnighter%20Trolley%20FA001%20-%20TB2155001BRN?alt=media&token=93e02a39-f67d-4c85-911e-c523f1eef85d",
      title: "Genuine Leather Laptop Overnighter Trolley",
      price: "1890",
      oldPrice: "3999",
      off: "53% OFF",
    },
    {
      id: 6,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155068BRNCRO%2FGenuine%20Leather%20Large%20Check-In%20Trolley%20FA008%20-%20TB2155068BRNCRO?alt=media&token=32a629c0-3c8e-4899-b1cc-b38f3078d419",
      title: "Genuine Leather Large Check-In Trolley FA009 - TB2155069BLKCRO",
      price: "7999",
      oldPrice: "21999",
      off: "64% OFF",
    },
    {
      id: 7,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2F7YXiIeh6Bd2XHKqkyuoe%2FGenuine%20Leather%20Medium%20Check-In%20Trolley%20FA007%20-%20TB2155062BRNCRO?alt=media&token=51a846b1-cc3e-4e62-9cd4-1087e4b7f98e",
      title: "Leather Medium Check-In Trolley FA007 - TB2155062BRNCRO",
      price: "7199",
      oldPrice: "19999",
      off: "64% OFF",
    },
    {
      id: 8,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155010BRN%20%2FGenuine%20Leather%20Trolley%20Backpack%20Briefcase%20for%20Men%20-%20TB2155010BRN%20?alt=media&token=c593a83e-0c87-4326-a1ab-f676b69929e5",
      title: "Genuine Leather Trolley Backpack Briefcase for Men - TB2155010BRN",
      price: "7999",
      oldPrice: "14999",
      off: "47% OFF",
    },
    {
      id: 9,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155007BLK%2FGenuine%20Leather%20Small%20Check-In%20Trolley%20FA007%20-%20TB2155007BLK?alt=media&token=611eb1b1-dc5d-454b-954c-23f90a190acc",
      title: "Genuine Leather Small Check-In Trolley FA007 - TB2155007BLK",
      price: "7999",
      oldPrice: "19999",
      off: "60% OFF",
    },
    {
      id: 10,
      img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155068BLKCRO%2FGenuine%20Leather%20Large%20Check-In%20Trolley%20FA008%20-%20TB2155068BLKCRO?alt=media&token=d219785f-42cd-4435-8c9a-4815cb8cd3b9",
      title: "Genuine Leather Large Check-In Trolley FA008 - TB2155068BLKCRO",
      price: "7999",
      oldPrice: "21999",
      off: "64% OFF",
    },
  ];

  return (
    <div className="mx-12 my-12 px-2 border-gray-300 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Trolley Bags</h1>
        <button className="text-white text-sm bg-orange-600 px-6 py-2 rounded-md cursor-pointer" onClick={() => navigate("/products/" + "Trolley Bags")}>
          View All
        </button>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, A11y]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          slidesPerView={7}
          className="my-4 drop-shadow-xl bg-white p-4 rounded-md"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="shadow-xl p-4 cursor-pointer rounded-md" onClick={() => handleViewProductDetails(items)}>
                <img src={item.img} alt="" className="w-full h-48 object-cover" />
                <p className="text-sm mt-2">{item.title}</p>
                <p className="text-sm">Rs. {item.price}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm line-through text-gray-500">Rs. {item.oldPrice} </p>
                  <span className="text-sm text-orange-600">{item.off}</span>
                </div>
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

export default SliderItems4;
