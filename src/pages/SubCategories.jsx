import { ListFilter } from "lucide-react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";
import { useEffect, useState, useMemo } from "react";


const items = [

	{
		id: 1,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329034TANCRO%2F1?alt=media&token=352fe421-02ca-4f4f-b2de-3b7f42df7682",
		title: "Genuine Leather Women HandBag - LB9329034TANCRO",
		price: 3499,
		oldPrice: 6499,
		discount: "46% OFF",
	},
	{
		id: 2,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FBC1149002BRN%2FGenuine%20Brown%20Leather%20Briefcase%20For%20Men%20-%20BC1149002BRN?alt=media&token=7a190322-9e88-45ce-9d26-477e84018b1b",
		title: "Genuine Brown Leather Office BriefCase For Men - BC149002BRN",
		price: 4299,
		oldPrice: 9999,
		discount: "57% OFF",
	},
	{
		id: 3,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2F7YXiIeh6Bd2XHKqkyuoe%2FGenuine%20Leather%20Medium%20Check-In%20Trolley%20FA007%20-%20TB2155062BRNCRO?alt=media&token=51a846b1-cc3e-4e62-9cd4-1087e4b7f98e",
		title: "Leather Medium Check-In Trolley FA007 - TB2155062BRNCRO",
		price: 7199,
		oldPrice: 19999,
		discount: "64% OFF",
	},
	{
		id: 4,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FJB1149020BRN%2FGenuine%20Leather%20Vanity%20Box%20Jewellery%20Organiser%2C%20Bangles%2C%20Necklaces%2C%20Ear%20rings%2C%20Finger%20rings%2C%20Nose%20Pin%20Vanity%20Box%20-%20JB1149020BRN?alt=media&token=72e96f4f-b759-491a-a4be-e03cc76945a9",
		title: "Leather Vanity Box – JB1149020BRN",
		price: 3599,
		oldPrice: 9999,
		discount: "64% OFF",
	},
	{
		id: 5,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCB1129089GRN%2FWomen's%20-%20Genuine%20Green%20Leather%20CrossBody%20Bags%20-%20CB1129089GRN?alt=media&token=57c6bed2-1bcf-4629-a31f-2471e9920fbc",
		title: "Genuine Green Leather CrossBody – CB1129089GRN",
		price: 1890,
		oldPrice: 3999,
		discount: "53% OFF",
	},
	{
		id: 6,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FDtcZ0gRtUnz3mEYrzSij%2FGenuine%20Tan%20Leather%20Sling%20bag%20For%20Men%20-%20SL1893003TAN?alt=media&token=4b59d4d1-3912-483a-958b-dd2919eed28d",
		title: "Genuine Tan Leather Sling bag For Men - SL1893003TAN",
		price: 1799,
		oldPrice: 3999,
		discount: "55% OFF",
	},
	{
		id: 7,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FWB1149006BRN%2FGenuine%20Leather%20Watch%20Box%20For%20Men%20%26%20Women%20(12%20Slots)%20-%20WB1149006BRN?alt=media&token=ebecf50f-ef1d-462c-a124-ccdba3afeac9",
		title:
			"Genuine Leather Watch Box For Men & Women (12 Slots) - WB1149006BRN",
		price: 2699,
		oldPrice: 5999,
		discount: "55% OFF",
	},
	{
		id: 8,
		name: "Messenger Bags",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155019BRN%2FGenuine%20Leather%20Office%20Laptop%20Messenger%20Bag%20For%20Men%20-%20MB2155019BRN?alt=media&token=aa3359e2-e8f0-4fcd-8f79-b2960e3f567f",
		title:
			"Genuine Leather Office Laptop Messenger Bag For Men - MB2155019BRN",
		price: 4999,
		oldPrice: 7499,
		discount: "33% OFF",
	},
	{
		id: 9,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155002BRN%2FGenuine%20Leather%20Duffel%20Bag%20for%20Travel%20Gym%20-%20TB2155002BRN?alt=media&token=687a79be-80f5-4880-a903-0dbbb1906c7d",
		title: "Genuine Leather Duffel Bag for Travel Gym - TB2155002BRN",
		price: 3099,
		oldPrice: 11999,
		discount: "74% OFF",
	},
	{
		id: 10,
		name: "Messenger Bags",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026BRN?alt=media&token=41e1e314-4250-429a-8471-eae54b62a90f",
		title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026BRN",
		price: 3119,
		oldPrice: 5799,
		discount: "46% OFF",
	},
	{
		id: 11,
		name: "Messenger Bags",

		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FNMB2155020BLK%2FGenuine%20Leather%20Black%20Laptop%20Messenger%20Bag%20For%20Men%20-%20NMB2155020BLK?alt=media&token=74189345-8c97-40de-a766-8df0b20f8d20",
		title: "Genuine Leather Black Laptop Messenger Bag",
		price: 4999,
		oldPrice: 14999,
		discount: "46% OFF",
	},
	{
		id: 12,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155082BRN%2FGenuine%20Leather%20Office%20Messenger%20Bag%20For%20Men%20-%20MB2155082BRN?alt=media&token=7099b6bb-7197-4c4b-93ae-75bb319b239f",
		title: "Brown Leather Office BriefCase For Men",
		price: 2999,
		oldPrice: 11999,
		discount: "75% OFF",
	},
	{
		id: 13,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063BRN%2FGenuine%20Leather%20Laptop%20Messenger%20bag%20For%20Men%20-%20MB2155063BRN?alt=media&token=47c1683c-efd8-405a-8617-f99a89f5ef01",
		title: "Leather Medium Check-In Trolley Bag",
		price: 4999,
		oldPrice: 11999,
		discount: "58% OFF",
	},
	{
		id: 14,
		name: "Messenger Bags",

		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155021BLU%2FGenuine%20Leather%20Black%20Bombay%20Messenger%20bag%20For%20Men%20-%20MB2155021BLU?alt=media&token=1d04ecfc-218d-4f5f-b42a-41c88f5f65a0",
		title: "Leather Blue Bombay Messenger Bag",
		price: 3599,
		oldPrice: 9999,
		discount: "64% OFF",
	},
	{
		id: 15,
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155019DESBRN%20%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155019DESBRN%20?alt=media&token=e7f70776-2cc4-45b5-b908-53ac01da638e",
		title: "Leather Medium Check-In Trolley Bag",
		price: 4999,
		oldPrice: 11999,
		discount: "58% OFF",
	},
	{
		id: 16,
		name: "Messenger Bags",

		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155016BRN%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=0936a8a7-766e-4796-bc1c-bad16cfcac8f",
		title: "Genuine Leather Laptop Messenger Bags - MB2155016BRN",
		price: 4999,
		oldPrice: 12999,
		discount: "62% OFF",
	},
	{
		id: 17,
		name: "Messenger Bags",

		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FNMB2155062BRN%2FGenuine%20Leather%20Office%20Laptop%20Messenger%20Bag%20For%20Men%20-%20NMB2155062BRN?alt=media&token=f2d036d6-2600-4de4-ab79-5099d780357d",
		title: "Genuine Leather Office Laptop Messenger Bag For Men - NMB2155062BRN",
		price: 4999,
		oldPrice: 14999,
		discount: "67% OFF",
	},
	{
		id: 18,
		name: "Messenger Bags",

		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155005BLK%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=9afe096a-1d6b-4a25-8c91-de7fe42ebf00",
		title: "Genuine Leather Laptop Messenger Bags - MB2155005BLK",
		price: 4999,
		oldPrice: 11999,
		discount: "58% OFF",
	},
	{
		id: 19,
		name: "Messenger Bags",

		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155022BRN%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=6fe5ff8f-01df-4fad-875d-ba6bc72e7579",
		title: "Genuine Leather Laptop Messenger Bags - MB2155022BRN",
		price: 4999,
		oldPrice: 11999,
		discount: "58% OFF",
	},
	{
		id: 20,
		name: "Messenger Bags",
		img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155043%2FMarfit%20Genuine%20Leather%20%20Laptop%20Messenger%20Bags%20?alt=media&token=e8af6662-31a6-4baa-ad85-382d4505283f",
		title: "Genuine Leather Laptop Messenger Bags - MB2155043",
		price: 3499,
		oldPrice: 9999,
		discount: "65% OFF",
	},

];

let categoryOptions = [
	{ label: "All", value: "All" },
	{ label: "Men", value: "Men" },
	{ label: "Luggage & SuitCase", value: "Luggage & SuitCase" },
	{ label: "Accessories", value: "Accessories" },
	{ label: "Women", value: "Women" },
];

let subCategoriesOptions = [
	{ label: "All", value: "All" },
	{ label: "Messenger Bags", value: "Messenger Bags" },
	{ label: "BriefCase", value: "BriefCase" },
	{ label: "Sling Bags", value: "Sling Bags" },
	{ label: "Wallets", value: "Wallets" },
	{ label: "Wallet Combos", value: "Wallet Combos" },
	{ label: "CardHolder", value: "CardHolder" },
];

let availabilityOptions = [
	{
		label: "Embose",
		value: "Embose",
		label: "Out Of Stock",
		value: "Out of Stock"
	}
]

function SubCategories() {
	const { parentId, subId } = useParams();
	const [sortBy, setSortBy] = useState("relevance");
	const [category, setCategory] = useState("category");
	const [subCategory, setSubCategory] = useState("subCategory");
	const [availability, setAvailability] = useState("availability");

	useEffect(() => {
		setCategory("category");
		setSubCategory("subCategory");
		setAvailability("availability");
	}, [parentId, subId]);

	const handleSortBy = (value = "relevance") => setSortBy(value);
	const handleCategoryBy = (value = "category") => setCategory(value);
	const handleSubCategoryBy = (value = "subCategory") => setSubCategory(value);
	const handleAvailability = (value = "availability") => setAvailability(value);

	const filteredItems = useMemo(() => {
		let result = [...items];

		if (category !== "All" && category !== "category") {
			result = result.filter(item =>
				item.title?.toLowerCase().includes(category.toLowerCase())
			);
		}


		if (subCategory !== "All" && subCategory !== "subCategory") {
			result = result.filter(item =>
				item.title?.toLowerCase().includes(subCategory.toLowerCase())
			);
		}


		if (sortBy === "price-low-to-high") {
			result.sort((a, b) => a.price - b.price);
		}

		if (sortBy === "price-high-to-low") {
			result.sort((a, b) => b.price - a.price);
		}

		return result;
	}, [category, subCategory, sortBy]);

	const handleReset = () => {
		setSortBy("relevance");
		setCategory("category");
		setSubCategory("subCategory");
		setAvailability("availability");
	};



	return (
		<div className="w-full bg-white">
			<Breadcrumb
				paths={[
					{ title: parentId, link: `/categories/${parentId}` },
					{ title: subId, link: `/categories/${parentId}/${subId}` },
				]}
			/>

			<div className="bg-white my-5 py-10 px-35">
				<div className="w-full flex gap-15">
					<div className="flex flex-col w-70">
						<div className="flex">
							<div className="flex w-full">
								<ListFilter strokeWidth={1.75} className="h-5 w-5 my-1 mx-3" />
								<p className="text-xl">Filters</p>
							</div>
							<button
								onClick={handleReset}
								className="p-1 border border-gray-200 w-[30%] rounded cursor-pointer"
							>
								Reset
							</button>
						</div>

						<div className="border border-gray-200 rounded-md p-4 my-2">
							<h1>SORT BY</h1>

							<div className="flex">
								<input
									type="checkbox"
									checked={sortBy === "relevance"}
									onClick={() => handleSortBy("relevance")}
								/>
								<label className="ml-2">RELEVANCE</label>
							</div>

							<div className="flex">
								<input
									type="checkbox"
									checked={sortBy === "price-low-to-high"}
									onClick={() => handleSortBy("price-low-to-high")}
								/>
								<label className="ml-2">PRICE LOW TO HIGH</label>
							</div>

							<div className="flex">
								<input
									type="checkbox"
									checked={sortBy === "price-high-to-low"}
									onClick={() => handleSortBy("price-high-to-low")}
								/>
								<label className="ml-2">PRICE HIGH TO LOW</label>
							</div>
						</div>

						<div className="border border-gray-200 rounded-md p-4">
							<h1>CATEGORIES</h1>
							{categoryOptions.map(item => (
								<div key={item.value} className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={category === item.value}
										onClick={() => handleCategoryBy(item.value)}
									/>
									<span>{item.label}</span>
								</div>
							))}
						</div>

						<div className="border border-gray-200 rounded-md p-4 my-2">
							<h1>SUB CATEGORIES</h1>
							{subCategoriesOptions.map(item => (
								<div key={item.value} className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={subCategory === item.value}
										onClick={() => handleSubCategoryBy(item.value)}
									/>
									<span>{item.label}</span>
								</div>
							))}
						</div>

						<div className="border border-gray-200 rounded-md p-4 my-2">
							<h1>AVAILABILITY</h1>
							{availabilityOptions.map(item => (
								<div key={item.value} className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={availability === item.value}
										onClick={() => handleAvailability(item.value)}
									/>
									<span>{item.label}</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex flex-wrap w-[80%]">
						{filteredItems.map(item => (
							<div
								key={item.id}
								className="cursor-pointer py-2 m-1 w-1/5 border border-gray-200 rounded-md"
							>
								<img
									src={item.img}
									alt=""
									className="h-45 w-full object-cover rounded-md"
								/>
								<div className="p-3">
									<p className="text-sm">{item.title}</p>
									<p className="text-sm">Rs. {item.price}</p>
									<div className="flex gap-2">
										<p className="line-through text-gray-500">
											Rs. {item.oldPrice}
										</p>
										<span className="text-orange-600">
											{item.discount}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubCategories;
