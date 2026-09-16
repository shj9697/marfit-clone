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
        {
            id: "gender",
            label: "Gender",
        },
        {
            id: "dob",
            label: "Date of Birth",
        },
    ];

    return (
        <div>
            <h2 className="text-2xl text-orange-600">Profile Details</h2>
            <div className="w-20 h-0.5 bg-gray-300 mt-3" />
            <div className="mt-6 space-y-7">
                {profileDetails.map((item) => (
                    <div key={item.id} className="flex text-[17px] text-gray-800">
                        <span className="w-[250px] shrink-0">{item.label}</span>
                        <span>{item.value || "-"}</span>
                    </div>
                ))}
            </div>
            <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white text-[17px] px-10 py-2 rounded-sm cursor-pointer">
                Edit Profile
            </button>
        </div>
    );
}

export default Profile;