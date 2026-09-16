import { Plus } from "lucide-react";
import AddressPage from "../component/AddressPage";
import { useState } from "react";

function Address() {

    const [mode, setMode] = useState("list");

    const switchMode = (nextMode) => {
        setMode(nextMode);
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl text-orange-600">Your Address List</h2>
            <div className="w-20 h-0.5 bg-gray-300" />
            {mode === "form" ?
                <AddressPage handleBack={() => switchMode('list')} />
                :
                <div className="w-full">
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