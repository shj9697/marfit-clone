import { House, PencilIcon, Trash } from "lucide-react";
import ModalBox from "./ModalBox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { GetState, GetCity } from "react-country-state-city";

const AddressDetails = ({ handleChoosePayment }) => {

    const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem("checkoutAddresses")) ?? []);
    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [dialCode, setDialCode] = useState("91");
    const [missingFields, setMissingFields] = useState(false);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [stateId, setStateId] = useState("");
    const [cityId, setCityId] = useState("");
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [editId, setEditId] = useState(null);

    const countryId = 101;
    const emptyAddressForm = { name: "", address: "", pincode: "", email: "" };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onTouched" });

    // save addresses to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("checkoutAddresses", JSON.stringify(addresses));
    }, [addresses]);

    useEffect(() => {
        GetState(countryId).then(setStateList);
    }, []);

    useEffect(() => {
        if (stateId) GetCity(countryId, Number(stateId)).then(setCityList);
        else setCityList([]);
    }, [stateId]);

    const onSubmit = (data) => {
        if (!phone || !stateId || !cityId) {
            return setMissingFields(true);
        }
        const state = stateList.find(item => item.id === Number(stateId))?.name;
        const city = cityList.find(item => item.id === Number(cityId))?.name;
        const newAddress = {
            ...data,
            id: editId || crypto.randomUUID(),
            phone,
            mobile: phone.slice(dialCode.length),
            stateId,
            cityId,
            state,
            city
        };
        setAddresses(prev =>
            editId
                ? prev.map(address =>
                    address.id === editId ? newAddress : address
                )
                : [...prev, newAddress]
        );

        setSelectedAddressId(newAddress.id);
        setIsOpen(false);
    };

    // address is passed when editing, left empty when adding a new one
    const openModal = (address) => {
        reset(address ?? emptyAddressForm);
        setPhone(address?.phone ?? "");
        setStateId(address?.stateId ?? "");
        setCityId(address?.cityId ?? "");
        setEditId(address?.id ?? null);
        setMissingFields(false);
        setIsOpen(true);
    };

    const handleStateChange = (e) => {
        setStateId(e.target.value);
        setCityId("");
    };

    const handleDelete = (id) => {
        setAddresses((prev) => prev.filter((address) => address.id !== id));
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded">
                <div className="flex items-center text-[15px] text-[#fb6b25] gap-2">
                    <House className="text-green-700" />
                    <p>Address Details</p>
                </div>
                {addresses.map((address) => (
                    <div key={address.id} className="flex items-center justify-between gap-2 w-full bg-gray-100 rounded p-2 my-2 text-[13px] cursor-pointer">
                        <label className="flex items-start gap-2 bg-gray-100 rounded p-2 my-2 text-[13px] cursor-pointer">
                            <input
                                type="radio"
                                name="selectedAddress"
                                value={address.id}
                                checked={selectedAddressId === address.id}
                                onChange={() => setSelectedAddressId(address.id)}
                                className="mt-1 appearance-none size-4 shrink-0 rounded-full bg-white border checked:bg-[#fb6b25] outline-none cursor-pointer"
                            />
                            <div>
                                <p className="font-medium">{address.name}</p>
                                <p className="text-gray-600">{address.address}</p>
                                <p className="text-gray-600">{address.city} - {address.pincode}, {address.state}</p>
                                <p className="text-gray-600">Mobile : {address.mobile}</p>
                            </div>
                        </label>

                        <div className="flex items-center gap-3">
                            <PencilIcon size={15}
                                onClick={() => openModal(address)}
                                className="cursor-pointer text-[#fb641b]"
                            />
                            <Trash size={15} onClick={() => handleDelete(address.id)} />
                        </div>
                    </div>
                ))}
                <button
                    className="w-full border border-[#fb641b] text-[15px] text-[#fb6b25] rounded p-2 cursor-pointer"
                    onClick={() => openModal()}
                >
                    ADD ADDRESS
                </button>
                <div className="text-center p-2 bg-[#fb6b25] my-2 rounded">
                    <button className="text-white cursor-pointer" onClick={handleChoosePayment}>PROCEED TO PAYMENT</button>
                </div>
            </div>

            <ModalBox isOpen={isOpen} onClose={() => setIsOpen(false)} title={editId ? "Edit Address" : "Add New Address"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="flex flex-col gap-3">
                        <label htmlFor="">Contact Details</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="border border-gray-400 outline-0 p-2 rounded text-[12px] "
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-[11px]">{errors.name.message}</p>}
                        <PhoneInput
                            country={'in'}
                            value={phone}
                            onChange={(value, country) => {
                                setPhone(value);
                                setDialCode(country.dialCode);
                            }}
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
                    {missingFields && (
                        <p className="text-red-500 text-[11px] mt-2">Mobile number, state and city are required</p>
                    )}
                    <button type="submit" className="bg-[#fb6b25] text-white p-3 mt-3 text-center w-full cursor-pointer" >{editId ? "SAVE ADDRESS" : "ADD ADDRESS"}</button>
                </form>
            </ModalBox>
        </div>
    )
}

export default AddressDetails;
