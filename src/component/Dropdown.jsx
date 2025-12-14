import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Dropdown({ title = "", list = [], path = "/"}) {
	return (
		<div className="relative group h-full">
			<div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 h-full">
				<Link to={"/categories/" + title}>
					<span className="font-medium">{title}</span>
				</Link>
				<ChevronDown
					size={16}
					className="group-hover:rotate-180 transition-all duration-300"
				/>
			</div>
			<div className="absolute left-[50%] translate-x-[-55%] top-[30px] mt-2 hidden w-48 bg-white shadow-lg group-hover:block z-50 border border-gray-200">
				<ul className="relative py-2 after:content-[''] after:absolute after:bg-white after:w-2 after:h-2 after:rotate-45 after:top-[-5px] after:left-[50%] after:border after:border-gray-200 after:border-r-0 after:border-b-0">
					{list?.map((item, index) => (
						<li key={index}>
							<Link
								to={`categories/${title}/${item.name}`}
								className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
							>
								<div className="flex items-center gap-2">
									{item?.image && (
										<img src={item.image} alt={item.name} className="w-4 h-4" />
									)}
									{item?.name || ""}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
			
		</div>
	);
}

export default Dropdown;
