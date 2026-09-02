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
		<div className="flex gap-12 items-center justify-center h-10 text-base font-bold sticky top-15 z-50 bg-white shadow-[0_3px_6px_0_#dee0e2]">
			<Link
				to="/new-arrival"
				className="text-sm text-orange-600"
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
