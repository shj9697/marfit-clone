import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";
import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import Filter from "../component/Filter";
import { getProductCategoriesBySlugAPI, getProductCategoriesBySubSlugAPI } from "../api/productCategoriesApi";



function SubCategories() {
	const { categorySlug, subCategorySlug } = useParams();
	const [sortBy, setSortBy] = useState("relevance");
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [availability, setAvailability] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	useEffect(() => {
		if (categorySlug) {
			setCategory(categorySlug);
		}
		if (subCategorySlug) {
			setSubCategory(subCategorySlug);
		}
	}, [categorySlug, subCategorySlug]);

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				setLoading(true);
				setError(null);
				const categoryData = await getProductCategoriesBySlugAPI(categorySlug);
				const subCategorydata = await getProductCategoriesBySubSlugAPI(categorySlug, subCategorySlug);
				if (!cancelled) {
					setData({
						categoryData: categoryData.categories || [],
						subCategoryData: subCategorydata.categories || []
					});
				}
			} catch (err) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		load();
		return () => { cancelled = true; };
	}, [categorySlug, subCategorySlug]);

	if (loading) {
		return <p>Loading......</p>
	}
	if (error) {
		return <p>Error : {error}</p>
	};

	const handleSortBy = (value) => setSortBy(value);
	const handleCategoryBy = (value) => setCategory(value);
	const handleSubCategoryBy = (value) => setSubCategory(value);

	const handleAvailability = (value, event) => {
		const isChecked = event.target.checked;
		if (isChecked) {
			setAvailability(prev => ([...prev, value]));
		} else {
			setAvailability(prev => prev.filter(item => item !== value));
		}
	};

	const handleReset = () => {
		setSortBy("relevance");
		setCategory("category");
		setSubCategory("subCategory");
		setAvailability("availability");
	};

	const handleNextPage = () => {
		navigate("/sale")
	}

	const handlePrevPage = () => {
		navigate("/sale")
	}

	return (
		<div className="w-full bg-white">
			<Breadcrumb
				paths={[
					{ title: categorySlug, link: `/categories/${categorySlug}` },
					{
						title: subCategorySlug,
						link: `/categories/${categorySlug}/${subCategorySlug}`,
					},
				]}
			/>

			<div className="bg-white my-5 py-10 px-35">
				<div className="w-full flex gap-15">
					<Filter
						handleSortBy={handleSortBy}
						handleCategoryBy={handleCategoryBy}
						handleSubCategoryBy={handleSubCategoryBy}
						handleAvailability={handleAvailability}
						handleReset={handleReset}
						sortBy={sortBy}
						category={category}
						subCategory={subCategory}
						availability={availability}
					/>
					<div className="flex  flex-wrapw-[80%]">
						<div className="w-full grid grid-cols-3">
							{(data?.products || []).map(item => (
								<ProductCard item={item} key={item.id} />
							))}
						</div>
						<div className="flex justify-center items-center px-2 gap-2">
							<button className="bg-orange-600 text-white px-6 py-2 cursor-pointer" onClick={(e) => { handlePrevPage(e) }}> Prev</button>
							<h1>Page {currentPage} of {20}</h1>
							<button className="bg-orange-600 text-white px-6 py-2 cursor-pointer" onClick={(e) => { handleNextPage(e) }}>Next</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubCategories;
