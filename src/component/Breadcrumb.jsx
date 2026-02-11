import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumb({ paths }) {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex items-center gap-2 w-[85%] mx-auto h-[50px]">
        <Link to="/">Home</Link>
        {paths?.map((path, index) => {
          return (
            <div className="flex items-center gap-2">
              <ChevronRight size={16} />
              <Link to={path.link} key={index}>{path.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumb;
