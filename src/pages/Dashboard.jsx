import { NavLink, Outlet } from "react-router-dom";

const dashboardMenus = [
    {
        id: "profile",
        name: "Profile",
        path: "profile"
    },
    {
        id: "orders",
        name: "Orders",
        path: "orders"
    },
    {
        id: "wishlist",
        name: "Wishlist",
        path: "wishlist"
    },
    {
        id: "address",
        name: "Address",
        path: "address"
    },
];

function Dashboard() {
    return (
        <div className="max-w-[1300px] mx-auto flex gap-6 px-4 py-10 w-full">
            <aside className="w-[258px] shrink-0 bg-white shadow-[0_1px_4px_0_#d7dade] py-8">
                <ul>
                    {dashboardMenus.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center h-[68px] px-8 text-[17px] border-r-[6px] ${isActive
                                        ? "bg-[#e9ecef] border-orange-600 text-gray-900 font-semibold"
                                        : "border-transparent text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
            <section className="flex-1 bg-white shadow-[0_1px_4px_0_#d7dade] min-h-[590px] p-8">
                <Outlet />
            </section>
        </div>
    );
}

export default Dashboard;
