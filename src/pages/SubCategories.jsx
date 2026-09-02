import { useParams } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";
import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import Filter from "../component/Filter";
import { getProductCategoriesBySlugAPI, getProductCategoriesBySubSlugAPI } from "../api/productCategoriesApi";
import { getProductsAPI } from "../api/productapi";

function SubCategories() {
	const { categorySlug, subCategorySlug } = useParams();
	const [sortBy, setSortBy] = useState("relevance");
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [stock, setStock] = useState(true);
	const [embossable, setEmbossable] = useState(false);

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
				const params = {
					page: currentPage,
					limit: 5,
					category: category,
					subCategory: subCategory,
					sort: sortBy,
					embossable: embossable,
					inStock: stock
				};
				const productListData = await getProductsAPI(params);
				const categoryData = await getProductCategoriesBySlugAPI(category);
				console.log(categoryData)
				const subCategorydata = await getProductCategoriesBySubSlugAPI(category, subCategory);
				if (!cancelled) {
					setData({
						productListData: productListData || null,
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
	}, [category, subCategory, currentPage, sortBy, embossable, stock]);

	if (loading) {
		return <p>Loading......</p>
	}
	if (error) {
		return <p>Error : {error}</p>
	};

	const handleSortBy = (value) => setSortBy(value);
	const handleCategoryBy = (value) => setCategory(value);
	const handleSubCategoryBy = (value) => setSubCategory(value);
	const handleIsEmbossableBy = (value) => setEmbossable(value);
	const handleStock = (value) => setStock(value);

	const handleReset = () => {
		setSortBy("relevance");
		setCategory("category");
		setSubCategory("subCategory");
	};

	const handleNextPage = () => {
		setCurrentPage(prev => prev + 1);
	}

	const handlePrevPage = () => {
		setCurrentPage(prev => prev - 1);
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
						handleReset={handleReset}
						sortBy={sortBy}
						category={category}
						subCategory={subCategory}
						embossable={embossable}
						handleIsEmbossableBy={handleIsEmbossableBy}
						stock={stock}
						handleStock={handleStock}
					/>
					<div className="flex flex-col items-center w-[80%] gap-4 pb-4">
						<div className="w-full grid grid-cols-3 gap-4">
							{(data?.productListData?.products || []).map(item => (
								<ProductCard item={item} key={item.id} />
							))}
						</div>
						<div className="flex justify-center items-center px-2 gap-2">
							<button disabled={currentPage <= 1} className="bg-orange-600 text-white px-6 py-2 cursor-pointer disabled:bg-white" onClick={handlePrevPage}> Prev</button>
							<h1>Page {currentPage} of {data?.productListData?.totalPages || 1}</h1>
							<button disabled={currentPage >= data?.productListData?.totalPages} className="bg-orange-600 text-white px-6 py-2 cursor-pointer disabled:bg-white" onClick={handleNextPage}>Next</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubCategories;
