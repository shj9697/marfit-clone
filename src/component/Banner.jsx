import { Link } from 'react-router-dom';


function Banner({ imgUrl = "", path = "" }) {

  if (!imgUrl) return null;

  return (
    <Link to={path} className="relative bg-white">
      <img src={imgUrl} alt="Banner" />
    </Link>
  )
}

export default Banner;