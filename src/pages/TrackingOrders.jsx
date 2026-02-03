

const TrackingOrders = () => {
    return (
        <div className="ml-[38%] pt-8 mt-4  h-60 w-[360px] bg-[#f6f6f6] rounded-md">
            <h1 className="text-center font-semibold text-2xl">Track Your Order</h1>
            <div className="flex flex-col p-8 ">
                <label className="font-semibold text-lg" htmlFor="name">
                    Order Id
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="p-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none"

                />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="p-2 w-40 mx-auto rounded-sm bg-orange-600 text-white"
                >
                    Send
                </button>
            </div>



        </div>
    )
}

export default TrackingOrders;