import { MoveRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function Banner({ imgUrl = "", path = "" }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  if (!imgUrl) return null;

  return (
    <div className="px-80 py-10 relative mx-26 bg-white">
      <img src={imgUrl} alt="Banner" />
      <button className="absolute bottom-40 right-1/3 bg-orange-600 text-white text-base font-medium px-4 py-2 flex items-center gap-3 cursor-pointer w-60 h-12 justify-center" onClick={handleClick}> <MoveRight size={20} strokeWidth={3.5} />CLICK TO EXPLORE</button>
    </div>
  )
}

export default Banner;