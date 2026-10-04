import { Pencil, PencilIcon, Plus, Trash } from "lucide-react";
import AddressPage from "./AddressPage";
import { useEffect, useState } from "react";

function Address() {

    const [mode, setMode] = useState("list");
    const [editIndex, setEditIndex] = useState(null);
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
        setEditIndex(null);
        switchMode('list')
    }

    const handleSave = (data) => {
        if (editIndex !== null) {
            setAddresses((prev) => prev.map((existingAddress, index) => (index === editIndex ? data : existingAddress)));
        } else {
            setAddresses((prev) => [...prev, data]);
        }
        setEditIndex(null);
        switchMode("list");
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        switchMode("form");
    }

    const handleDelete = (index) => {
        setAddresses((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl text-orange-600">Your Address List</h2>
            <div className="w-20 h-0.5 bg-gray-300" />
            {mode === "form" ?
                <AddressPage
                    handleBack={handleBack}
                    handleSave={handleSave}
                    initialData={editIndex !== null ? addresses[editIndex] : null}
                />
                :
                <div className="w-full">
                    {addresses.map((address, index) => (
                        <div key={index} className="flex items-center justify-between border-b-gray-500 rounded p-4 mb-4">
                            <div>
                                <p className="text-[17px] text-gray-800 leading-10" >{address.name}</p>
                                <p className="text-[17px] text-gray-800 leading-10">{address.address}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <PencilIcon size={15}
                                    onClick={() => handleEdit(index)}
                                    className="cursor-pointer text-orange-600"
                                />
                                <Trash size={15}
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
