import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AddressPage = ({ handleBack }) => {

    const [phone, setPhone] = useState("");
    const { register, handleSubmit, reset } = useForm({ mode: "onSubmit" });


    const onSubmit = () => {
        console.log("h")
    }


    const onError = (errors) => {
        toast.error(
            errors.name?.message ||
            errors.country?.message ||
            errors.address?.message ||
            errors.city?.message ||
            errors.pincode?.message ||
            "Not a valid email"
        );
    };

    return (
        <div className="flex flex-col bg-white">

            <div className="flex mt-2">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="" placeholder="Name"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded"
                            {...register("name", { required: "Please Fill All The Details" })}
                        />
                        <input type="text"
                            placeholder="Address"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded"
                        />
                    </div>
                    <div className="flex mt-3 justify-between gap-2">
                        <input
                            type="text"
                            placeholder="Country/Nation"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded" />
                        <input
                            type="text"
                            placeholder="State"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded" />
                    </div>
                    <div className="flex mt-3 justify-between gap-2">
                        <input
                            type="text"
                            placeholder="City"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded" />
                        <input
                            type="number"
                            placeholder="Pincode"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded" />
                    </div>
                    <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={(value) => setPhone(value)}
                        className="my-3"
                    />
                    <div className="flex gap-3 ">
                        <button className="bg-orange-600 text-white px-10 py-2 cursor-pointer rounded" onClick={handleBack}><ArrowLeft size={20} strokeWidth={3} /></button>
                        <button className="bg-orange-600 text-white px-10 py-2 cursor-pointer rounded">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressPage