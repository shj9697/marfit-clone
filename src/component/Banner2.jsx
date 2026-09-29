import { Link } from "react-router-dom";

function Banner2({ imgUrl, path }) {

    if (!imgUrl) return null;

    return (
        <Link to={path} >
            <div className="relative bg-white">
                <img src={imgUrl} />
            </div>
        </Link>
    )
}

export default Banner2;