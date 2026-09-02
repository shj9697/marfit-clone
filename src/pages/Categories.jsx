import { useParams, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "../component/Breadcrumb";
import { getProductCategoriesBySlugAPI } from "../api/productCategoriesApi";
import SliderItem from "../component/sliderItem";

function Categories() {
	const navigate = useNavigate();
	const { slug } = useParams();
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
		navigate(`/categories/${(slug)}/${(s)}`)
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
						<div key={item.id}
							className="hover:-translate-y-2 transition-transform duration-400 ease-out cursor-pointer bg-white rounded-md"
							onClick={() => handleViewProductList(item.slug)}
						>
							<h1 className="text-l font-normal text-gray-600 mx-2">{item.name}</h1>
							<img src={item.imageUrl}
								alt=""
								className="h-72 w-72" />
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
