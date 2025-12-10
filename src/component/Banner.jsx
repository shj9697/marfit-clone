import {MoveRight} from 'lucide-react'
import { useNavigate } from 'react-router-dom';
function Banner() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Home');
  }
  return (
   <div className="px-56 relative w-full mx-0">
   <img src="https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/settings%2Fadvertisement%2FbottomBanner1%2FNaN?alt=media&token=39f2f10d-44b0-4c06-9e52-a79b7585935f" alt=""/>
   <button className="absolute bottom-30 right-102 bg-orange-600 text-white text-base font-medium px-4 py-2 flex items-center gap-3 cursor-pointer w-60 h-12 justify-center" onClick={handleClick}> <MoveRight size={20} strokeWidth={3.5}/>CLICK TO EXPLORE</button>;
   </div>
  )
}

export default Banner;