import { House, PencilIcon, Trash } from "lucide-react";
import ModalBox from "./ModalBox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { GetState, GetCity } from "react-country-state-city";
import { addAddressAPI, deleteAddressAPI, getAddressesAPI, updateAddressAPI } from "../api/addressApi";

const AddressDetails = ({ handleChoosePayment }) => {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
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
    const emptyAddressForm = { customerName: "", addressLine1: "", pincode: "", email: "" };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onTouched" });

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const addressData = await getAddressesAPI();
                if (!cancelled) {
                    if (addressData.status) {
                        setAddresses(addressData.data);
                        // Preselect the default so a returning customer can go straight to payment
                        setSelectedAddressId(addressData.data.find((address) => address.isDefault)?.id ?? "");
                    }
                    else setError(addressData.message);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        GetState(countryId).then(setStateList);
    }, []);

    useEffect(() => {
        if (stateId) GetCity(countryId, Number(stateId)).then(setCityList);
        else setCityList([]);
    }, [stateId]);

    const onSubmit = async (data) => {
        if (!phone || !stateId || !cityId) {
            return setMissingFields(true);
        }
        // Field names match the checkout body, so the saved address can be ordered by its id
        const addressDetails = {
            customerName: data.customerName,
            phone: phone.slice(dialCode.length),
            email: data.email,
            addressLine1: data.addressLine1,
            city: cityList.find(item => item.id === Number(cityId))?.name,
            state: stateList.find(item => item.id === Number(stateId))?.name,
            pincode: data.pincode
        };
        setSaving(true);
        try {
            const response = editId ? await updateAddressAPI(editId, addressDetails) : await addAddressAPI(addressDetails);
            if (!response.status) return toast.error(response.message);
            setAddresses(prev => editId ? prev.map(address => address.id === editId ? response.data : address) : [...prev, response.data]);
            setSelectedAddressId(response.data.id);
            setIsOpen(false);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    // address is passed when editing, left empty when adding a new one
    const openModal = (address) => {
        reset(address ? { customerName: address.customerName, addressLine1: address.addressLine1, pincode: address.pincode, email: address.email ?? "" } : emptyAddressForm);
        setPhone(address ? `91${address.phone}` : "");
        setDialCode("91");
        // The server stores state and city by name, but the dropdowns select by id
        const editStateId = stateList.find(state => state.name === address?.state)?.id;
        setStateId(editStateId ? String(editStateId) : "");
        setCityId("");
        if (editStateId) {
            GetCity(countryId, editStateId).then(cities => {
                const editCityId = cities.find(city => city.name === address.city)?.id;
                setCityId(editCityId ? String(editCityId) : "");
            });
        }
        setEditId(address?.id ?? null);
        setMissingFields(false);
        setIsOpen(true);
    };

    const handleStateChange = (e) => {
        setStateId(e.target.value);
        setCityId("");
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteAddressAPI(id);
            if (!response.status) return toast.error(response.message);
            setAddresses(response.data);
            if (selectedAddressId === id) setSelectedAddressId("");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleProceed = () => {
        if (!selectedAddressId) return toast.error("Please select an address");
        // Not passed when this page is opened on its own route
        handleChoosePayment?.(selectedAddressId);
    };

    if (loading) {
        return <p>Loading......</p>
    }
    if (error) {
        return <p>Error : {error}</p>
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
                                <p className="font-medium">{address.customerName}</p>
                                <p className="text-gray-600">{address.addressLine1}</p>
                                <p className="text-gray-600">{address.city} - {address.pincode}, {address.state}</p>
                                <p className="text-gray-600">Mobile : {address.phone}</p>
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
                    <button className="text-white cursor-pointer" onClick={handleProceed}>PROCEED TO PAYMENT</button>
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
                            {...register("customerName", { required: "Name is required" })}
                        />
                        {errors.customerName && <p className="text-red-500 text-[11px]">{errors.customerName.message}</p>}
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
                            {...register("addressLine1", { required: "Address is required" })}
                        />
                        {errors.addressLine1 && <p className="text-red-500 text-[11px]">{errors.addressLine1.message}</p>}
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
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#fb6b25] text-white p-3 mt-3 text-center w-full cursor-pointer disabled:opacity-60"
                    >
                        {saving ? "SAVING..." : editId ? "SAVE ADDRESS" : "ADD ADDRESS"}
                    </button>
                </form>
            </ModalBox>
        </div>
    )
}

export default AddressDetails;
