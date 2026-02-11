import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Breadcrumb from "../component/Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ShoppingCart, Zap, MapPin } from "lucide-react";
import ReactImageMagnify from 'react-image-magnify';
import { number } from "prop-types";


const items = [
    {
        id: 1,
        img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329001BRNCRO%2F1?alt=media&token=38ab0377-0a98-4056-9f76-a54ae5f21a35",
        title: "Genuine Leather Women Shoulder HandBag",
        price: "2999",
        oldPrice: "6999",
        off: "57% OFF",
        parent: "Women",
        subcategory: "Handbag",
        productId: "1"
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
    const navigate = useNavigate();
    const { parentId, subId, productId } = useParams();
    const swiperRef = useRef(null);


    const [pincode, setPincode] = useState(700000);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");


    const shadowStyle = {
        boxShadow: '1px 2px 3px rgba(0, 0, 0, .3)',
        border: '2px solid rgba(0, 0, 0, .03)',
    }

    function handleViewProductDetails(item) {
        navigate(`/categories/${item.parent}/${item.subcategory}`)
    }


    const handleAddToCart = () => {

        navigate(`/Cart/View/All/Items/null/null`);
    };

    const handleBuyNow = () => {

        navigate(`/Cart/MhVgsPYT3gWcanUTPtsk/1/null/false/null`);
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


    return (
        <section>
            <Breadcrumb
                paths={[
                    { title: parentId, link: `/categories/${parentId}` },
                    { title: subId, link: `/categories/${parentId}/${subId}` },
                    {
                        title: "product details",
                        link: `/categories/${parentId}/${subId}/${productId}`,
                    },
                ]}
            />

            <div className="flex w-full h-160 bg-white px-35">
                <div className="flex flex-col w-[30%] pt-3  ">
                    <div className="flex">

                        <div className=" w-20%  h-[570px] ">
                            <div className="my-2">
                                <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F1?alt=media&token=31d02f51-a5ca-4bb9-a96d-2d92d65291a7" alt="" className="w-14 h-14 cursor-pointer" />
                            </div>
                            <div className="my-2">
                                <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F2?alt=media&token=633c78ba-a2cc-497f-8846-7b31b5fd9d1b" alt="" className="w-14 h-14 cursor-pointer" />
                            </div>
                            <div className="my-2">
                                <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F3?alt=media&token=25e37ffb-17f4-4eb7-8531-d694a856f5e3" alt="" className="w-14 h-14 cursor-pointer" />
                            </div>
                            <div className="my-2">
                                <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F4?alt=media&token=031f7ee7-b607-42ff-8f66-596440287e5d" alt="" className="w-14 h-14 cursor-pointer" />
                            </div>
                            <div className="my-2">
                                <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F5?alt=media&token=6413431f-356c-4140-9010-5dbb461868d1" alt="" className="w-14 h-14 cursor-pointer" />
                            </div>
                        </div>
                        <div className="mx-25 my-20 w-80% h-70  ">
                            <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F1?alt=media&token=31d02f51-a5ca-4bb9-a96d-2d92d65291a7" alt="" className="w-60 h-60 cursor-pointer object-cover " />

                        </div>
                    </div>
                    <div className="flex ">
                        <button className="px-9 py-2 bg-transparent mr-5 cursor-pointer border-2 border-orange-600 whitespace-nowrap hover:-translate-y-2 transition-transform duration-200 ease-out" onClick={handleAddToCart}>ADD TO CART</button>
                        <button className="px-9 py-2 bg-orange-600 text-white cursor-pointer whitespace-nowrap hover:-translate-y-2 transition-transform duration-200 ease-out" onClick={handleBuyNow}>BUY NOW</button>
                    </div>






                </div>

                <div className="w-[70%] px-3 py-10 mx-15 overflow-y-scroll no-scrollbar">
                    <h1 className="text-4xl leading-10">Genuine Leather Laptop Messenger Bag For<br></br> Men - MB2155063GRN</h1>
                    <div className="flex items-center gap-2 my-2">
                        <p className="text-4xl">₹4999 </p>
                        <p className="line-through text-gray-600 text-2xl">₹14999</p>
                        <p className="text-orange-600 font-medium text-md">67% off</p>
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
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
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
                        <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
                        <p className="text-2xl ml-5">Product Details</p>
                        <div className="w-full h-[2px] bg-gray-500 mt-4"></div>
                    </div>

                    <p className="mt-2">BUY 100% Original Leather Products From MARFIT. Leather will long last and will never peel off like an artificial Leather. Customer satisfaction guaranteed. PRODUCT DETAIL : Removable, adjustable nylon long shoulder strap | Metal Hardware : durable enough for daily use Zip-top closure pure genuine leather CFC zipper | Handle type : Fixed solid full grain leather double handle , carried in 3 ways Handbags , Shoulder bag & Satchels . TO PROCESS AND CLAIM WARRANTY : Customer needs to send the product to the MARFIT, Kolkata. The Product will be rectified and send back to the Customer. This warranty shall be void if the product is damaged due to misuse, abuse, physical mishandling or natural causes such as flood, fire, earthquake or other perils.</p>
                    <div className="flex  w-150 mx-2 ">
                        <div className="w-[35%]  p-5 leading-12 text-gray-600 font-semibold">
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
                        <div className="w-full h-[2px] bg-gray-500 mb-4"></div>
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
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={20}
                        slidesPerView={6}
                        className="my-4"
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className="w-60! h-84!">
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
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={20}
                        slidesPerView={6}
                        className="my-4"
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className="w-60! h-84!">
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
        </section >
    );
}

export default ProductDetailsPage;