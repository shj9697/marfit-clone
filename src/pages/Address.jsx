import { Plus, Trash } from "lucide-react";
import AddressPage from "../component/AddressPage";
import { useEffect, useState } from "react";

function Address() {

    const [mode, setMode] = useState("list");
    const [addresses, setAddresses] = useState(() => {
        const saved = localStorage.getItem("addresses");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(addresses));
    }, [addresses]);


    const switchMode = (nextMode) => {
        setMode(nextMode);
    }

    const handleBack = () => {
        switchMode('list')
    }

    const handleSave = (data) => {
        setAddresses((prev) => [...prev, data]);
        switchMode("list");
    }

    const handleDelete = (index) => {
        setAddresses((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl text-orange-600">Your Address List</h2>
            <div className="w-20 h-0.5 bg-gray-300" />
            {mode === "form" ?
                <AddressPage handleBack={handleBack} handleSave={handleSave} />
                :
                <div className="w-full">
                    {addresses.map((address, index) => (
                        <div key={index} className="flex items-center justify-between border-b-gray-500 rounded p-4 mb-4">
                            <div>
                                <p className="text-[17px] text-gray-800 leading-10">{address.name}</p>
                                <p className="text-[17px] text-gray-800 leading-10">{address.address}</p>
                            </div>
                            <div>
                                <Trash
                                    onClick={() => handleDelete(index)}
                                    className="cursor-pointer text-orange-600"
                                />
                            </div>
                        </div>
                    ))}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => switchMode("form")}
                    >
                        <Plus size={20} strokeWidth={3} className="bg-green-900 text-white rounded-4xl" />
                        <p>Add New Address</p>
                    </div>
                </div>
            }
        </div >
    );
}

export default Address;
