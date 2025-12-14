import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import SubCategories from "../pages/SubCategories";

const menuList = [
	{
		title: "Men",
		list: [
			{
				id: 1,
				name: "Messenger Bags",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 2,
				name: "BriefCase",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 3,
				name: "Sling Bags",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 4,
				name: "Wallets",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 5,
				name: "Wallet Combo's",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 6,
				name: "Card Holder",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
		],
		path: "/men",
	},
	{
		title: "Luggage & SuitCase",
		list: [
			{
				id: 1,
				name: "Trolley Bags",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 2,
				name: "Duffle Bags",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
		],
		path: "/luggage",
	},
	{
		title: "Accessories",
		list: [
			{
				id: 1,
				name: "Jewellery Box",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 2,
				name: "Office Supplies",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 3,
				name: "Watch Box",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 4,
				name: "Passport Holder",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
		],
		path: "/accessories",
	},
	{
		title: "Women",
		list: [
			{
				id: 1,
				name: "Shoulder Bags",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 2,
				name: "HandPurse",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
			{
				id: 3,
				name: "CrossBody Bags",
				image:
					"https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fcategories%2FMen%2FsubCategory%2FMessenger%20Bags%2FMessenger%20Bags?alt=media&token=4f175284-fd13-4f80-9717-be9ff833fe6e",
			},
		],
		path: "/women",
	},
];

function CategoryDropdown() {
	const navigate = useNavigate();
	return (
		<div className="flex gap-12 items-center justify-center h-[40px] text-base font-bold sticky top-15 z-50 bg-white shadow-[0_3px_6px_0_#dee0e2]">
			<Link
				to="/new-arrival"
				className="text-sm text-orange-600"
				onClick={() => navigate("/new-arrival")}
			>
				New Arrivals
			</Link>
			{menuList.map((item, index) => (
				<Dropdown
					key={index}
					title={item.title}
					list={item.list}
					path={item.path}
				/>
			))}

			<Link
				to="/sale"
				className="text-sm text-orange-600"
				onClick={() => navigate("/sale")}
			>
				Sale
			</Link>
			<Link to="/emboss" onClick={() => navigate("/emboss")}>
				Emboss
			</Link>
			<Link to="/franchise" onClick={() => navigate("/franchise")}>
				Franchise Contact
			</Link>
		</div>
	);
}

export default CategoryDropdown;
