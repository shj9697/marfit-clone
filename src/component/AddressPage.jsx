import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GetState, GetCity } from "react-country-state-city";

const AddressPage = ({ handleBack, handleSave }) => {

    const [phone, setPhone] = useState("");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [stateId, setStateId] = useState("");
    const [cityId, setCityId] = useState("");
    const { register, handleSubmit } = useForm({ mode: "onSubmit" });

    const countryId = 101;

    useEffect(() => {
        GetState(countryId).then((result) => {
            setStateList(result);
        });
    }, []);

    useEffect(() => {
        if (stateId)
            GetCity(countryId, parseInt(stateId)).then((result) => {
                setCityList(result);
            });
        else setCityList([]);
    }, [stateId]);

    const handleStateChange = (e) => {
        setStateId(e.target.value);
        setCityId("");
    };

    const onSubmit = (data) => {
        if (!phone || !stateId || !cityId) {
            toast.error("Please Fill All The Details");
            return;
        }

        const stateName = stateList.find((state) => state.id === Number(stateId))?.name ?? "";
        const cityName = cityList.find((city) => city.id === Number(cityId))?.name ?? "";
        handleSave({ ...data, phone, state: stateName, city: cityName });
    }

    const onError = () => {
        toast.error("Please Fill All The Details");
    };

    return (
        <div className="flex flex-col bg-white">
            <div className="flex mt-2 ">
                <form onSubmit={handleSubmit(onSubmit, onError)} >
                    <div className="flex flex-col gap-3 mb-2">
                        <input
                            type="text"
                            name="" placeholder="Name"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded"
                            {...register("name", { required: "Please Fill All The Details" })}
                        />
                        <input type="text"
                            placeholder="Address"
                            className="outline-0 border border-gray-400 bg-white p-2 rounded"
                            {...register("address", { required: "Please Fill All The Details" })}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <select
                            value={stateId}
                            onChange={handleStateChange}
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px]"
                        >
                            <option value="">Select State</option>
                            {stateList.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={cityId}
                            onChange={(e) => setCityId(e.target.value)}
                            disabled={!stateId}
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px] disabled:bg-gray-100"
                        >
                            <option value="">Select City</option>
                            {cityList.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Pincode"
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px]"
                            {...register("pincode", {
                                required: "Pincode is required",
                                pattern: {
                                    value: /^[1-9][0-9]{5}$/,
                                    message: "Enter a valid 6-digit pincode",
                                },
                            })}
                        />
                        <PhoneInput
                            country={'in'}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            className="my-3 "
                            {...register("pincode", {
                                required: "Mobile Number is required",
                                pattern: {
                                    value: /^[1-9][0-9]{5}$/,
                                    message: "Enter a valid Mobile Number",
                                },
                            })}
                        />
                    </div>
                    <div className="flex gap-3 ">
                        <button type="button" className="text-[#fb641b] bg-white border border-[#fb641b] px-10 py-2 cursor-pointer rounded" onClick={handleBack}>Cancel</button>
                        <button type="submit" className="bg-[#fb641b] text-white px-10 py-2 cursor-pointer rounded" >Add</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddressPage