import { ListFilter } from 'lucide-react';

const Filter = ({ sortBy, category, subCategory, availability, handleSortBy, handleCategoryBy, handleSubCategoryBy, handleAvailability, handleReset }) => {

    let categoryOptions = [
        {
            label: "All",
            value: "All"
        },
        {
            label: "Men",
            value: "Men"
        },
        {
            label: "Luggage & SuitCase",
            value: "Luggage & SuitCase"
        },
        {
            label: "Accessories",
            value: "Accessories"
        },
        {
            label: "Women",
            value: "Women"
        },
    ];

    let subCategoriesOptions = [
        {
            label: "All",
            value: "All"
        },
        {
            label: "Messenger Bags",
            value: "Messenger Bags"
        },
        {
            label: "BriefCase",
            value: "BriefCase"
        },
        {
            label: "Sling Bags",
            value: "Sling Bags"
        },
        {
            label: "Wallets",
            value: "Wallets"
        },
        {
            label: "Wallet Combos",
            value: "Wallet Combos"
        },
        {
            label: "CardHolder",
            value: "CardHolder"
        },
    ];

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
                {categoryOptions.map(item => (
                    <div key={item.value} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={category === item.value}
                            onChange={() => handleCategoryBy(item.value)}
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
                            onChange={() => handleSubCategoryBy(item.value)}
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