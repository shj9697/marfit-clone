import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import Breadcrumb from "../component/Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ShoppingCart, Zap } from "lucide-react";


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
    const navigate = useNavigate();
    const { parentId, subId, productId } = useParams();
    const swiperRef = useRef(null);


    const handleAddToCart = () => {

    };

    const handleBuyNow = () => {

    };

    const corporateContact = () => {
        const item = items[0];
        navigate(`/bulkContact?SKU=${item.id}`);
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
                <div className="flex w-[30%] py-3">
                    <div className="w-20% ">
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
                    <div className="mx-25 my-20 w-80% h-70 ">
                        <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BLK%2F1?alt=media&token=31d02f51-a5ca-4bb9-a96d-2d92d65291a7" alt="" className="w-60 h-60 cursor-pointer object-cover " />
                    </div>
                </div>
                <div className="w-[70%] px-3 py-10 mx-15 overflow-y-scroll no-scrollbar">
                    <h1 className="text-4xl leading-10">Genuine Leather Laptop Messenger Bag For<br></br> Men - MB2155063GRN</h1>
                    <div className="flex items-center gap-2 my-2">
                        <p className="text-4xl">₹4999 </p>
                        <p className="line-through text-gray-600 text-2xl">₹14999</p>
                        <p className="text-orange-600 font-medium text-md">67% off</p>
                    </div>
                    <div className="flex">
                        <div >
                            <h1 className="text-lg font-semibold">Quantity</h1>
                            <input type="number" id="" className="w-19 my-2" />
                        </div>


                        <div className="">
                            <h1>Color</h1>
                        </div>
                        <div className="flex mx-8">
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
                    <button className="my-15 text-orange-600 font-semibold cursor-pointer" onClick={corporateContact} >For bulk - Click here</button>
                    <h2>Delivery </h2>
                    <div className="divide-y-2 p-4 h-20">
                        <p className=" text-2xl">Product Details</p>
                    </div>

                    <p>BUY 100% Original Leather Products From MARFIT. Leather will long last and will never peel off like an artificial Leather. Costumer satisfaction guaranteed. PRODUCT DETAIL : Removable, adjustable nylon long shoulder strap | Metal Hardware : durable enough for daily use Zip-top closure pure genuine leather CFC zipper | Handle type : Fixed solid full grain leather double handle , carried in 3 ways Handbags , Shoulder bag & Satchels . TO PROCESS AND CLAIM WARRANTY : Customer needs to send the product to the MARFIT, Kolkata. The Product will be rectified and send back to the Customer. This warranty shall be void if the product is damaged due to misuse, abuse, physical mishandling or natural causes such as flood, fire, earthquake or other perils.</p>
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


                </div>
            </div>

            <section className="mx-3 my-6">
                <h2 className="text-3xl mx-10">Similar Products</h2>

                <div className="relative">
                    <Swiper
                        modules={[Navigation, A11y]}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={15}
                        slidesPerView={7}
                        className="my-4 bg-white p-4 rounded-md"
                    >
                        {items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <article className="shadow-xl p-4 rounded-md">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <p className="mt-2 text-sm">{item.title}</p>
                                    <p className="text-sm">Rs. {item.price}</p>
                                    <p className="text-sm line-through text-gray-500">
                                        Rs. {item.oldPrice}
                                    </p>
                                    <span className="text-sm text-orange-600">{item.off}</span>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </section >
    );
}

export default ProductDetailsPage;