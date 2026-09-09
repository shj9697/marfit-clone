import { House } from "lucide-react";
import ModalBox from "./ModalBox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { GetState, GetCity } from "react-country-state-city";

const AddressDetails = ({ handleChoosePayment }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [stateId, setStateId] = useState("");
    const [cityId, setCityId] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onTouched" });

    const onSubmit = (data) => {
        console.log({ ...data, phone, stateId, cityId });
        setIsOpen(false);
    };

    const countryId = 101;

    useEffect(() => {
        if (countryId)
            GetState(parseInt(countryId)).then((result) => {
                setStateList(result);
            });
    }, [countryId]);

    useEffect(() => {
        if (stateId)
            GetCity(parseInt(countryId), parseInt(stateId)).then((result) => {
                setCityList(result);
            });
        else setCityList([]);
    }, [stateId]);

    const handleStateChange = (e) => {
        setStateId(e.target.value);
        setCityId("");
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded">
                <div className="flex items-center text-[15px] text-orange-600 gap-2">
                    <House className="text-green-700" />
                    <p>Address Details</p>
                </div>
                <button
                    className="w-full border border-amber-600 text-[15px] text-orange-500 rounded p-2 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    ADD ADDRESS
                </button>
                <div className="text-center p-2 bg-orange-500 my-2 rounded">
                    <button className="text-white cursor-pointer" onClick={handleChoosePayment}>PROCEED TO PAYMENT</button>
                </div>
            </div>

            <ModalBox isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Address">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor="">Contact Details</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px]"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-[11px]">{errors.name.message}</p>}
                        <PhoneInput
                            country={'in'}
                            value={phone}
                            onChange={(value) => setPhone(value)}
                        />
                    </fieldset>
                    <fieldset className="flex flex-col gap-3 mt-2">
                        <label htmlFor="">Address Details</label>
                        <input
                            type="text"
                            placeholder="Address (House No., building, street, area)"
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px]"
                            {...register("address", { required: "Address is required" })}
                        />
                        {errors.address && <p className="text-red-500 text-[11px]">{errors.address.message}</p>}
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
                        {errors.pincode && <p className="text-red-500 text-[11px]">{errors.pincode.message}</p>}
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
                            placeholder="E-Mail"
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px]"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-[11px]">{errors.email.message}</p>}
                    </fieldset>
                    <button type="submit" className="bg-orange-500 text-white p-3 mt-3 text-center w-full cursor-pointer" >ADD ADDRESS</button>
                </form>
            </ModalBox>
        </div>
    )
}

export default AddressDetails;
