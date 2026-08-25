import { Link } from "react-router-dom";

function Banner2({ imgUrl, path }) {

    if (!imgUrl) return null;

    return (
        <Link to={path} >
            <div className="px-80 py-10 relative w-[89%] mx-26 bg-white">
                <img src={imgUrl} />
            </div>
        </Link>
    )
}

export default Banner2;