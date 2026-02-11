import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

function Dropdown({ title, list }) {
	return (
		<div className="relative group h-full">
			<div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 h-full">
				<Link to={"/categories/" + title}>
					<span className="font-medium">{title}</span>
				</Link>
				<ChevronDown
					size={16}
					className="group-hover:rotate-180 transition-all duration-300"
				/>
			</div>
			<div className="absolute left-[50%] translate-x-[-55%] top-[30px] mt-2 hidden w-48 bg-white shadow-lg group-hover:block z-50 border border-gray-200">
				<ul className="relative py-2 after:content-[''] after:absolute after:bg-white after:w-2 after:h-2 after:rotate-45 after:top-[-5px] after:left-[50%] after:border after:border-gray-200 after:border-r-0 after:border-b-0">
					{list?.map((item, index) => (
						<li key={index}>
							<Link
								to={`categories/${title}/${item.name}`}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
							>
								<div className="flex items-center gap-2">
									{item?.image && (
										<img src={item.image} alt={item.name} className="w-4 h-4" />
									)}
									{item?.name || ""}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>

		</div>
	);
}



export default CategoryDropdown;
