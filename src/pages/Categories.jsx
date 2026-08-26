import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../component/Breadcrumb";
import ProductCard from "../component/ProductCard";
import { getProductCategoriesBySlugAPI } from "../api/productCategoriesApi";
import SliderItem from "../component/sliderItem";


const items = [
	{
		id: 1,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329034TANCRO%2F1?alt=media&token=352fe421-02ca-4f4f-b2de-3b7f42df7682",
		title: "Genuine Leather Women HandBag - LB9329034TANCRO",
		price: 3499,
		oldPrice: 6499,
		discount: "46% OFF",
		parent: "Women",
		subcategory: "Shoulder Bags",
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
	},
	{
		id: 5,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCB1129089GRN%2FWomen's%20-%20Genuine%20Green%20Leather%20CrossBody%20Bags%20-%20CB1129089GRN?alt=media&token=57c6bed2-1bcf-4629-a31f-2471e9920fbc",
		title: "Genuine Green Leather CrossBody – CB1129089GRN",
		price: 1890,
		oldPrice: 3999,
		discount: "53% OFF",
		parent: "Women",
		subcategory: "CrossBody Bags",
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
	},
	{
		id: 7,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FWB1149006BRN%2FGenuine%20Leather%20Watch%20Box%20For%20Men%20%26%20Women%20(12%20Slots)%20-%20WB1149006BRN?alt=media&token=ebecf50f-ef1d-462c-a124-ccdba3afeac9",
		title:
			"Genuine Leather Watch Box For Men & Women (12 Slots) - WB1149006BRN",
		price: 2699,
		oldPrice: 5999,
		discount: "55% OFF",
		parent: "Accessories",
		subcategory: "Watch Box",
	},
	{
		id: 8,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155019BRN%2FGenuine%20Leather%20Office%20Laptop%20Messenger%20Bag%20For%20Men%20-%20MB2155019BRN?alt=media&token=aa3359e2-e8f0-4fcd-8f79-b2960e3f567f",
		title:
			"Genuine Leather Office Laptop Messenger Bag For Men - MB2155019BRN",
		price: 4999,
		oldPrice: 7499,
		discount: "33% OFF",
		parent: "Men",
		subcategory: "Messenger Bags",
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
	},
	{
		id: 10,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026BRN?alt=media&token=41e1e314-4250-429a-8471-eae54b62a90f",
		title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026BRN",
		price: 3119,
		oldPrice: 5799,
		discount: "46% OFF",
		parent: "Men",
		subcategory: "Messenger Bags",
	},
];

const categories = [
	{
		title: "Messenger Bags",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",

	},
	{
		title: "BriefCase",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FBriefcase%2FBriefcase?alt=media&token=c653874d-97b1-490e-ad95-a111e79fd698",

	},
	{
		title: "Sling bags",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FSling%20Bags%2FSling%20Bags?alt=media&token=91a528b1-073b-401a-84dd-6577e2b934eb",

	},
	{
		title: "Wallets",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FOffice%20Supplies%2FOffice%20Supplies?alt=media&token=cdf203b5-5923-478a-a71d-2085cac6ccd3",

	},
	{
		title: "Wallet Combos",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FWallet%20comob's%2FWallet%20comob's?alt=media&token=6fd163cd-73ab-494c-8e8b-e35267388c32",

	},
	{
		title: "CardHolder",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FCard%20Holder%2FCard%20Holder?alt=media&token=4967ea01-c897-4f2e-9098-b073ec4a78c3",

	},

]

function Categories() {
	const navigate = useNavigate();
	const { slug } = useParams();
	const swiperRef = useRef(null);

	const [data, setData] = useState({ title: "", products: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				setLoading(true);
				setError(null);
				const data = await getProductCategoriesBySlugAPI(slug);
				console.log(data)
				if (!cancelled) setData(data.categories);
			} catch (err) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => { cancelled = true; };
	}, [slug]);

	if (loading) {
		return <p>Loading......</p>
	}
	if (error) {
		return <p>Error : {error}</p>
	};

	function handleViewProductList(s) {
		navigate(`/categories/${encodeURIComponent(slug)}/${encodeURIComponent(s)}`)

	}

	return (
		<div className="ml-27 mt-10">
			<Breadcrumb
				paths={[{ title: data?.name || "" }]}
			/>
			<div className="flex flex-col ">
				<h1 className="text-2xl my-3 font-normal">
					Select by {data?.name || ""} Category
				</h1>
				<span className="w-25 h-1 bg-[#fb641b]"></span>
			</div>

			<div className="flex mx-5 my-5 w-90% gap-2 flex-wrap  ">
				{(data?.children || []).map((item, _) => {
					return (
						<div key={item.id} className="hover:-translate-y-2 transition-transform duration-400 ease-out cursor-pointer bg-white rounded-md" onClick={() => handleViewProductList(item.slug)}>
							<h1 className="text-l font-normal text-gray-600 mx-2">{item.name}</h1>
							<img src={item.imageUrl} alt="" className="h-72 w-72" />
						</div>
					)
				})}
			</div>
			<div className="w-full">
				<SliderItem
					title={"Latest Products in " + (data?.title || "")}
					list={data.latestProducts || []}
				/>
			</div>
		</div>
	);
}

export default Categories;  
