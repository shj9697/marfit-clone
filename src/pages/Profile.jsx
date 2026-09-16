import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

function Profile() {

    const { user } = useAuth();

    const profileDetails = [
        {
            id: "name",
            label: "User Name",
            value: user?.name
        },
        {
            id: "email",
            label: "Email",
            value: user?.email
        },
    ];

    const [mode, setMode] = useState("list");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");


    return (
        <div>
            <h2 className="text-2xl text-orange-600">Profile Details</h2>
            <div className="w-20 h-0.5 bg-gray-300 mt-3" />
            <div className="mt-6">
                {profileDetails.map((item) => (
                    <div key={item.id} className="flex text-[17px] text-gray-800 leading-10">
                        <p className="w-[250px]">{item.label}</p>
                        <p>{item.value || ""}</p>
                    </div>
                ))}
            </div>
            <div>
                <div className="w-full flex items-center gap-3 leading-10">
                    <div className="w-[26%]">
                        <h1>Gender</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <p>Male</p>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <p>Female</p>
                    </div>

                </div>
                <div className="flex items-center gap-3 leading-10">
                    <label htmlFor="dob" className="w-[250px] text-[17px] text-gray-800">
                        Date of Birth
                    </label>
                    <input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="border-0 border-b-2 border-b-gray-400 outline-0 py-2 text-[17px] text-gray-800"
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <button className="mt-8 bg-white  text-orange-600 border border-orange-600 text-[17px] px-10 py-2 rounded-sm cursor-pointer">Cancel</button>
                <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white text-[17px] px-10 py-2 rounded-sm cursor-pointer">Save</button>
            </div>

        </div>
    );
}

export default Profile;