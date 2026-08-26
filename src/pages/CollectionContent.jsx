import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollectionBySlugAPI } from "../api/collectionsApi";
import ProductCard from "../component/ProductCard";

const CollectionContent = () => {
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
                const data = await getCollectionBySlugAPI(slug);
                console.log(data)
                if (!cancelled) setData(data.data);
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

    return (
        <div className="px-4 py-15 rounded-md bg-white">
            <div className="mx-10">
                <h1 className="text-3xl font-normal">{data?.title || ""}</h1>
                <div className="crossline flex items-center gap-2 ">
                    <span className="w-20 h-1 bg-black"></span>
                    <span className="w-1 h-6 bg-black rotate-40"></span>
                    <span className="w-1 h-6 bg-black rotate-40"></span>
                    <span className="w-20 h-1 bg-black"></span>
                </div>
            </div>

            <div className="relative w-full flex flex-wrap justify-start items-center my-6 mx-10">
                {(data?.products || []).map((item, _) => (
                    <ProductCard item={item} key={item.id} />
                ))}
            </div>
        </div>
    )
}

export default CollectionContent;