import { ChevronDown, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


function ProfileDropdown() {

    const { user, logout } = useAuth();

    const profileMenus = [
        {
            id: "profile",
            name: "Profile",
            path: '/profile',
            icon: ""
        },
        {
            id: "wishlist",
            name: "Wishlist",
            path: '/wishlist',
            icon: ""
        },
        {
            id: "orders",
            name: "My Orders",
            path: '/orders',
            icon: ""
        },
        {
            id: "logout",
            name: "Logout",
            onClick: logout,
            icon: <LogOut className="size-4" />
        },
    ]

    return (
        <div className="relative group h-full">
            <div className="flex items-center gap-1 cursor-pointer hover:text-orange-600 h-full">
                <span className="font-medium">{user?.name || "U"}</span>
                <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 transition-all duration-300"
                />
            </div>
            {/* Child menus */}
            <div className="absolute left-[50%] translate-x-[-55%] top-10 mt-2 hidden w-48 bg-white shadow-lg group-hover:block z-50 border border-gray-200">
                <ul className="relative py-2 after:content-[''] after:absolute after:bg-white after:w-2 after:h-2 after:rotate-45 after:top-[-5px] after:left-[50%] after:border after:border-gray-200 after:border-r-0 after:border-b-0">
                    {profileMenus?.map((item, _) => (
                        <li key={item.id}>
                            {item?.onClick ?
                                <button
                                    onClick={item?.onClick}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-600 flex items-center gap-2 w-full cursor-pointer"
                                >
                                    {item?.icon || ""}
                                    {item?.name || ""}
                                </button>
                                :
                                <Link
                                    to={item?.path || "/"}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-2">
                                        {item?.icon || ""}
                                        {item?.name || ""}
                                    </div>
                                </Link>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProfileDropdown;