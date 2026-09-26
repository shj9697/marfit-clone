import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const items = [
        "Mens Leather Bag",
        "Mens Messenger Bags",
        "Mens BriefCase",
        "Mens Sling Bags",
        "Mens Wallets",
        "Mens Wallet Combo's",
        "Mens Card Holder",
        "Women's Leather Bag",
        "Women's Messenger Bags",
        "Women's BriefCase",
        "Women's Sling Bags",
        "Women's Wallets",
        "Women's Wallet Combo's",
        "Women's Card Holder",
        "Trolley Bags",
        "Duffel Bags",
    ];

    function handleChange(e) {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 0) {
            setResults(items.filter(item => item.trim().toLowerCase().includes(value.trim().toLowerCase())));
        } else {
            setResults([]);
        }
    };

    return (
        <div className="relative flex items-center justify-between w-1/3 px-4 py-1 border border-gray-400 rounded-full">
            <div className="relative w-full">
                <input type="text" placeholder="What are you looking for?" value={query} onChange={handleChange} className="outline-none border-0 placeholder-black px-5 py-0.5 w-full" />
            </div>
            <Search className="text-black-700" size={20} />
            {results.length > 0 && query.length > 2 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg z-46 p-6 rounded-b-md text-lg font-normal">
                    {results.map((result) => (
                        <div key={result} className="search-result-item leading-12 overflow-y-scroll h-10">{result}</div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar; 
