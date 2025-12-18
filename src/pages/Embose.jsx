function Embose(){
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
    

export default Embose;