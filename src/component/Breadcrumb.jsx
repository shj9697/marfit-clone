import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumb({ paths }) {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex items-center gap-2 w-[85%] mx-auto h-[50px]">
        <Link to="/">Home</Link>
        {paths?.map((path, index) => {
          const isCurrent = index === paths.length - 1;
          return (
            <div key={path.link ?? index} className="flex items-center gap-2">
              <ChevronRight size={16} />
              {isCurrent ? (
                <span aria-current="page" className="text-gray-600 truncate max-w-[420px]">
                  {path.title}
                </span>
              ) : (
                <Link to={path.link}>{path.title}</Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumb;
