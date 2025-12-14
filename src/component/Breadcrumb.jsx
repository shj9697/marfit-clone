import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumb({ paths = [] }) {
  return (
    <div className="flex items-center gap-2">
      <Link to="/">Home</Link>
      {paths?.map((path) => {
        return (
          <div className="flex items-center gap-2">
            <ChevronRight size={16} />
            <Link to={path.link}>{path.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
