function NewArrival() {
    const items = [
        {
          id: 1,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FWT714400203BLK%2F%20Marfit%20Genuine%20Black%20Leather%20Wallet?alt=media&token=073cbc46-2403-4a5a-bff0-c3e6506ee49d",
          title: "Genuine Leather Women HandBag - LB9329034TANCRO",
          price: 3499,
          oldPrice: 6499,
          discount: "46% OFF",
        },
        {
          id: 2,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCH714400201BLK%2FMarfit%20Genuine%20Black%20Leather%20Card%20Holder?alt=media&token=5f4045f9-235a-40d2-b37a-ce68a763649c",
          title: "Genuine Brown Leather Office BriefCase For Men - BC149002BRN",
          price: 4299,
          oldPrice: 9999,
          discount: "57% OFF",
        },
        {
          id: 3,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCH714400201BLK%2FMarfit%20Genuine%20Black%20Leather%20Card%20Holder?alt=media&token=5f4045f9-235a-40d2-b37a-ce68a763649c",
          title: "Leather Medium Check-In Trolley FA007 - TB2155062BRNCRO",
          price: 7199,
          oldPrice: 19999,
          discount: "64% OFF",
        },
        {
          id: 4,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCH714400201BLK%2FMarfit%20Genuine%20Black%20Leather%20Card%20Holder?alt=media&token=5f4045f9-235a-40d2-b37a-ce68a763649c",
          title: "Leather Vanity Box – JB1149020BRN",
          price: 3599,
          oldPrice: 9999,
          discount: "64% OFF",
        },
        {
          id: 5,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCH714400201TAN%2FMarfit%20Genuine%20Tan%20Leather%20Card%20Holder?alt=media&token=ec4a2de8-c6dd-477f-8a04-a82b35271655",
          title: "Genuine Green Leather CrossBody – CB1129089GRN",
          price: 1890,
          oldPrice: 3999,
          discount: "53% OFF",
        },
        {
          id: 6,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCC714400202TAN%2F%20Marfit%20Genuine%20Leather%20Coin%20Case%20Wallet?alt=media&token=708c1906-5568-4a4c-b16f-5e39bedfafa3",
          title: "Genuine Tan Leather Sling bag For Men - SL1893003TAN",
          price: 1799,
          oldPrice: 3999,
          discount: "55% OFF",
        },
        {
          id: 7,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FCC714400202BLK%2FMarfit%20Genuine%20Leather%20Coin%20Case%20Wallet?alt=media&token=c0a17664-8fe9-492d-a408-9679461c5a13",
          title: "Genuine Leather Watch Box For Men & Women (12 Slots) - WB1149006BRN",
          price: 2699,
          oldPrice: 5999,
          discount: "55% OFF",
        },
        {
          id: 8,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155040BRN%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155040BRN?alt=media&token=a9484559-0632-4f70-9f57-eed83a0a3177",
          title: "Genuine Leather Office Laptop Messenger Bag For Men - MB2155019BRN",
          price: 4999,
          oldPrice: 7499,
          discount: "33% OFF",
        },
        {
          id: 9,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155040TAN%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155040BLK?alt=media&token=0616b107-be5d-488b-a9c6-2ad029f375fa",
          title: "Genuine Leather Duffel Bag for Travel Gym - TB2155002BRN",
          price: 3099,
          oldPrice: 11999,
          discount: "74% OFF",
        },
      ];
      return (
        <div className="px-4 py-15 rounded-md bg-white">
      <div className="mx-10">
      <h1 className="text-3xl font-normal">New Arrivals</h1>
      <div className="crossline flex items-center gap-2 ">
        <span className="w-20 h-1 bg-black"></span>
        <span className="w-1 h-6 bg-black rotate-40"></span>
        <span className="w-1 h-6 bg-black rotate-40"></span>
        <span className="w-20 h-1 bg-black"></span>
      </div>
      </div>

      <div className="relative w-full flex flex-wrap justify-start items-center my-3 mx-10">
          {items.map((item, index) => (
              <div key={index} className="shadow-xl cursor-pointer w-1/6 p-2 mx-1 my-1">
                <img src={item.img} alt="" className="h-45 object-contain rounded-md w-full"/>
                <p className="text-sm mb-2 text-left">{item.title}</p>
                <p className="text-sm">Rs. {item.price}</p>
                <div className="flex items-center gap-2"> 
                  <p className="text-sm line-through text-gray-500">Rs. {item.oldPrice} </p>           
                  <span className="text-sm text-orange-600">{item.discount}</span>
                </div>
              </div>
          ))}
      </div>
      </div>
  );
}

export default NewArrival;