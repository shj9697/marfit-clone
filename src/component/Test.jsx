import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const arr = [
    {
        title: "New Arrivals",
        textColor: "#fb641b",
        showArrow: false,
        path: "/NewArrivals",
        childMenus: []
    },
    {
        title: "Men",
        textColor: "#000000",
        showArrow: true,
        path: "/Category/Men",
        childMenus:
            [
                {
                    title: "MessengerBags",
                    path: "/Category/Men/MessengerBags"
                },
                {
                    title: "BriefCase",
                    path: "/Category/Men/BriefCase"
                },
                {
                    title: "Slingbags",
                    path: "/Category/Men/SlingBags",
                },
                {
                    title: "Wallets",
                    path: "/Category/Men/Wallets",
                },
                {
                    title: "WalletCombos",
                    path: "/Category/Men/WalletsCombos",
                },
                {
                    title: "CardHolder",
                    path: "/Category/Men/CardHolder",
                }
            ]
    },
    {
        title: "Luggage and suitcase",
        textColor: "#000000",
        showArrow: true,
        path: "/Category/Luggage%20and%20Suitcase",
        childMenus:
            [
                {
                    title: "Trolley Bags",
                    path: "/categories/Luggage%20&%20SuitCase/Trolley%20Bags"
                },
                {
                    title: "Duffle Bags",
                    path: "/categories/Luggage%20&%20SuitCase/Duffle%20Bags"
                }
            ]
    },
    {
        title: "Accessories",
        textColor: "#000000",
        showArrow: true,
        path: "/Category/Accessories",
        childMenus:
            [
                {
                    title: "Jewellery box",
                    path: "/categories/Accessories/Jewellery%20Box"
                },
                {
                    title: "Office Supplies",
                    path: "/categories/Accessories/Office%20Supplies"
                },
                {
                    title: "Watch Box",
                    path: "/categories/Accessories/Watch%20Box"
                },
                {
                    title: "Passport Holder",
                    path: "/categories/Accessories/Passport%20Holder"
                },
            ]
    },
    {
        title: "Women",
        textColor: "#000000",
        showArrow: true,
        path: "/Category/Women",
        childMenus:
            [
                {
                    title: "Shoulder Bags",
                    path: "/categories/Women/Shoulder%20Bags",
                },
                {
                    title: "Handpurse",
                    path: "/categories/Women/HandPurse"
                },
                {
                    title: "Slingbags",
                    path: "/categories/Women/CrossBody%20Bags"
                }
            ]
    },
    {
        title: "Sale",
        textColor: "#fb641b",
        showArrow: false,
        path: "/Sale",
        childMenus: []
    },
    {
        title: "Embose",
        textColor: "#000000",
        showArrow: false,
        path: "/Embose",
        childMenus: []
    },
    {
        title: "Franchise Contact",
        textColor: "#000000",
        showArrow: false,
        path: "/FranchiseContact",
        childMenus: []
    }

]


const Test = () => {

    return (
        <ul className="flex items-center justify-center gap-4 bg-white h-12">
            {arr.map((item, index) => {
                return (
                    <li key={index} className="relative group flex flex-col items-center">
                        <Link to={item.path} className="flex items-center gap-1 z-20">
                            <p className="text-sm" style={{ color: item.textColor }}>{item.title}</p>
                            {item.showArrow ? <ChevronDown size={14} /> : ""}
                        </Link>
                        <ChildMenus list={item.childMenus} />
                    </li>
                )
            })}
        </ul>
    )
};

const ChildMenus = ({ list }) => {
    return (
        <ul className="hidden group-hover:flex flex-col items-center absolute top-5 z-10 bg-white w-[180px]">
            {list.map((item, index) => {
                return (
                    <li key={index} className="hover:bg-gray-200 w-full">
                        <Link to={item.path} className="w-full">
                            <p className="py-2 text-sm text-center">{item.title}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
};

export default Test;