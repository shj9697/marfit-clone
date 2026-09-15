import { useState } from "react";
import LoginModal from "./LoginModal";
import { useForm } from "react-hook-form";
import { getAuthenticationAPI, loginAPI } from "../api/authentication";
import { brandIcon, brandLogo } from "./Navbar";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Registration = ({ isOpen, closeModal }) => {
    const { setUser, user } = useAuth();
    const { register, handleSubmit, reset } = useForm({ mode: "onSubmit" });


    const [step, setStep] = useState("identifier");
    const [mode, setMode] = useState("login");
    const [isPhoneInput, setIsPhoneInput] = useState(false);

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setStep("identifier");
        setIsPhoneInput(false);
        reset();
    }

    const onError = (errors) => {
        toast.error(
            errors.username?.message ||
            errors.mailid?.message ||
            errors.password?.message ||
            errors.email?.message ||
            "Not a valid email"
        );
    };

    const handleInputChange = (e) => {
        if (e.target.value.length) {
            const isOnlyNumber = !isNaN(e.target.value);
            setIsPhoneInput(isOnlyNumber);
        }
    }

    const onSubmit = async (formData) => {
        if (mode === "register") {
            try {
                const result = await getAuthenticationAPI(
                    formData.email,
                    formData.password,
                    formData.name
                );
                if (!result.status) {
                    toast.error("Registration failed");
                }
                toast.success("Registered SuccessFully");
                handleCloseModal();
            } catch {
                toast.error("Something went wrong. Please try again.");
            }
            return null;
        } else {
            if (step === "identifier") {
                setStep("password");
                return;
            }
            try {
                const loginData = await loginAPI(
                    formData.email,
                    formData.password
                );
                console.log(loginData);
                if (!loginData?.status) {
                    toast.error("Login failed");
                }
                setUser(loginData?.data || null);
                toast.success("Login SuccessFully");
                handleCloseModal();
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong. Please try again.");
            }
            return null;
        }
    };

    const handleCloseModal = () => {
        setStep("identifier");
        setIsPhoneInput(false);
        setMode("login");
        reset();
        closeModal();
    }

    return (
        <LoginModal isOpen={isOpen} onClose={closeModal}>
            <div className="w-full flex items-start justify-center bg-white">
                <div className="flex items-center mt-6">
                    <img src={brandIcon} className="h-9" />
                    <img src={brandLogo} className="h-9" />
                </div>
            </div>
            {mode === "register" ?
                (
                    <>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="w-full flex items-center border-0 border-b-2 border-b-amber-600 mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    className="border-gray-400 outline-0 py-2 text-[12px] flex-1"
                                    {...register("name", { required: "Enter Username" })}
                                />
                            </div>

                            <div className="w-full flex items-center border-0 border-b-2 border-b-amber-600 mt-4">
                                <input
                                    type="text"
                                    placeholder="Referral Code (Optional)"
                                    className="border-gray-400 outline-0 py-2 text-[12px] flex-1"
                                    {...register("referralCode")}
                                />
                            </div>

                            <div className="w-full flex items-center border-0 border-b-2 border-b-amber-600 mt-4">
                                <input
                                    type="text"
                                    placeholder="Enter Mail Id"
                                    className="border-gray-400 outline-0 py-2 text-[12px] flex-1"
                                    {...register("email", {
                                        required: "Not a valid email!",
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        },
                                    })}
                                />
                            </div>

                            <div className="w-full flex items-center border-0 border-b-2 border-b-amber-600 mt-4">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="border-gray-400 outline-0 py-2 text-[12px] flex-1"
                                    {...register("password", {
                                        required: "Enter Password",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 8 characters",
                                        },
                                    })}
                                />
                            </div>

                            <div className="w-full flex items-center border-0 gap-2 mt-4">
                                <input type="checkbox" />
                                <p className="text-[12px]">I agree to the <span className="text-orange-500 text-[12px]">TERMS & CONDITION.</span></p>
                            </div>

                            <button type="submit" className="bg-orange-500 text-white p-3 mt-4 text-center w-full cursor-pointer rounded-[10px]">
                                REGISTER
                            </button>
                        </form>

                        <div className="flex flex-col items-center gap-10 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-32 h-px bg-gray-500" />
                                <span className="text-gray-500">OR</span>
                                <span className="w-32 h-px bg-gray-500" />
                            </div>
                            <button
                                type="button"
                                onClick={() => switchMode("login")}
                                className="text-orange-500 text-[13px] cursor-pointer"
                            >
                                Existing User? Login
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className={step === "password" ? "flex justify-center items-center mt-15 opacity-70" : "flex justify-center items-center mt-15"}>
                                <div className="w-full flex items-center border-0 border-b-2 border-b-amber-600">
                                    {isPhoneInput &&
                                        <div className="flex flex-row items-center gap-2 mr-2 w-fit">
                                            <p className="">+91</p>
                                            <div className="w-0.5 rounded-md h-4 bg-amber-600" />
                                        </div>}
                                    <input
                                        type="text"
                                        readOnly={step === "password"}
                                        placeholder="Enter Email/Mobile Number"
                                        className="border-gray-400 outline-0 py-2 text-[12px] flex-1"
                                        {...register("email",
                                            {
                                                required: "Not a valid email!",
                                                pattern: {
                                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$|^\+?[1-9]\d{1,14}$/,
                                                },
                                                onChange: handleInputChange
                                            })}
                                    />
                                </div>
                            </div>

                            {step === "password" &&
                                <div className="w-full flex items-center border-0 border-b-2 border-b-amber-600 mt-8">
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                        className="border-gray-400 outline-0 text-[12px] flex-1"
                                        {...register("password", {
                                            required: "Enter Password",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters",
                                            },
                                        })}
                                    />
                                </div>}

                            <button type="submit" className="bg-orange-500 text-white p-3 mt-10 text-center w-full cursor-pointer rounded-[10px]" >
                                {step === "password" ? "LOGIN" : "NEXT"}
                            </button>
                        </form>

                        <div className="flex flex-col items-center gap-10 mt-10">
                            <div className="flex items-center gap-2">
                                <span className="w-32 h-px bg-gray-500" />
                                <span className="text-gray-500">OR</span>
                                <span className="w-32 h-px bg-gray-500" />
                            </div>
                            <img src="/assets/images/google.png" alt="Sign in with Google" className="h-7 w-7" />
                            <button
                                type="button"
                                onClick={() => switchMode("register")}
                                className="text-orange-500 text-[13px] cursor-pointer"
                            >
                                New to Marfit ? Create an account
                            </button>
                        </div>
                    </>
                )}
        </LoginModal>
    )
}

export default Registration;