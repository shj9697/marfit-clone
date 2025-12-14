import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const Franchise = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [popup, setPopup] = useState("");

  const handleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const showPopup = useCallback((msg) => {
    setPopup(msg);

    setTimeout(() => {
      setPopup("");
    }, 2500);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!form.name.trim()) {
        toast.error("Please enter your name!");
        return;
      }
      if (!form.email.trim()) {
        toast.error("Please enter your email!");
        return;
      }
      if (!form.phone.trim()) {
        toast.error("Please enter your phone number!");
        return;
      }

      toast.success("Form submitted successfully!");
    },
    [form]
  );

  return (
    <section className="relative px-4 py-10">
      {popup && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-3 rounded-md shadow-md font-medium">
          {popup}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
        <h1 className="text-2xl font-semibold text-center">
          Franchise Contact Form
        </h1>

        <label className="font-semibold text-lg" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
          onChange={handleChange}
          value={form.name}
        />

        <label className="font-semibold text-lg" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
          onChange={handleChange}
          value={form.email}
        />

        <label className="font-semibold text-lg" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="number"
          className="p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
          onChange={handleChange}
          value={form.phone}
        />

        <label className="font-semibold text-lg" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
          onChange={handleChange}
          value={form.message}
        />

        <button
          type="submit"
          className="p-2 w-40 mx-auto rounded-sm bg-orange-600 text-white"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Franchise;
