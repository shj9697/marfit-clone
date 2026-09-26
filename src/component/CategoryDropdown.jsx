import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { getProductCategoriesAPI } from "../api/productCategoriesApi";

function CategoryDropdown() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				setLoading(true);
				setError(null);
				const data = await getProductCategoriesAPI();
				console.log(data)
				if (!cancelled) setCategories(data.categories);
			} catch (err) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => { cancelled = true; };
	}, []);

	if (loading) {
		return <p>Loading......</p>
	}
	if (error) {
		return <p>Error : {error}</p>
	}

	return (
		<div className="w-full flex h-10 items-center justify-center bg-white shadow-[0_3px_6px_0_#dee0e2]">
			<div className="w-full max-w-6xl flex px-4 items-center justify-between h-full text-base font-bold">
				<Link
					to="/new-arrival"
					className="text-[15px] text-orange-500 font-semibold whitespace-nowrap"
					onClick={() => navigate("/new-arrival")}
				>
					New Arrivals
				</Link>
				{categories.map((item, _) => (
					<Dropdown
						key={item.id}
						title={item.name}
						list={item.children.sort((a, b) => a.sortOrder - b.sortOrder)}
						slug={item.slug}
					/>
				))}
				<Link
					to="/sale"
					className="text-[15px] text-orange-600 font-semibold"
					onClick={() => navigate("/sale")}
				>
					Sale
				</Link>
				<Link to="/emboss"
					className="text-[15px] font-semibold"
					onClick={() => navigate("/emboss")}>
					Emboss
				</Link>
				<Link to="/corporate gifting"
					className="text-[15px] font-semibold"
					onClick={() => navigate("/Corporate Gifting")}>
					Corporate Gifting
				</Link>
				<Link to="/franchise"
					className="text-[15px] font-semibold"
					onClick={() => navigate("/franchise")}>
					Franchise Contact
				</Link>
			</div>
		</div>
	);
}

export default CategoryDropdown;
