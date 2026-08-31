import { ListFilter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProductCategoriesAPI, getProductCategoriesBySlugAPI, getProductCategoriesBySubSlugAPI } from '../api/productCategoriesApi';

const Filter = ({ sortBy, category, subCategory, availability, handleSortBy, handleCategoryBy, handleSubCategoryBy, handleAvailability, handleReset }) => {

    let availabilityOptions = [
        {
            label: "Embose",
            value: "Embose",
        },
        {
            label: "Out Of Stock",
            value: "Out of Stock"
        }
    ];

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const categoryData = await getProductCategoriesAPI();
                const subCategorydata = await getProductCategoriesBySlugAPI(category);
                console.log(categoryData);
                console.log(subCategorydata);
                if (!cancelled) {
                    setData({
                        categoryData: categoryData?.categories || [],
                        subCategoryData: subCategorydata?.categories?.children || []
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
    }, [category, subCategory]);

    if (loading) {
        return <p>Loading......</p>
    }
    if (error) {
        return <p>Error : {error}</p>
    };

    return (
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
                        onChange={() => handleSortBy("relevance")}
                    />
                    <label className="ml-2">RELEVANCE</label>
                </div>

                <div className="flex">
                    <input
                        type="checkbox"
                        checked={sortBy === "price-low-to-high"}
                        onChange={() => handleSortBy("price-low-to-high")}
                    />
                    <label className="ml-2">PRICE LOW TO HIGH</label>
                </div>

                <div className="flex">
                    <input
                        type="checkbox"
                        checked={sortBy === "price-high-to-low"}
                        onChange={() => handleSortBy("price-high-to-low")}
                    />
                    <label className="ml-2">PRICE HIGH TO LOW</label>
                </div>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
                <h1>CATEGORIES</h1>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={category === ""}
                        onChange={() => handleCategoryBy("")}
                    />
                    <span>All</span>
                </div>
                {(data?.categoryData || []).map((item, _) => (
                    <div key={item.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={category === item.slug}
                            onChange={() => handleCategoryBy(item.slug)}
                        />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>

            {category && (
                <div className="border border-gray-200 rounded-md p-4 my-2">
                    <h1>SUB CATEGORIES</h1>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={subCategory === ""}
                            onChange={() => handleSubCategoryBy("")}
                        />
                        <span>All</span>
                    </div>
                    {(data?.subCategoryData || []).map((item, _) => (
                        <div key={item.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={subCategory === item.slug}
                                onChange={() => handleSubCategoryBy(item.slug)}
                            />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="border border-gray-200 rounded-md p-4 my-2">
                <h1>AVAILABILITY</h1>
                {availabilityOptions.map(item => (
                    <div key={item.value} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={availability.includes(item.value)}
                            onChange={(event) => handleAvailability(item.value, event)}
                        />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter