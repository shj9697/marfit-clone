function Sale() {
    const items = [
        {
          id: 1,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155063DESBRN%20%2FGenuine%20Leather%20Men%20Laptop%20Messenger%20bag%20-%20MB2155063DESBRN%20?alt=media&token=74cd5886-e1de-4ed1-9da6-aa84c14ed008",
          title: "Genuine Leather Men Laptop Messenger Bag - MB2155063DESBRN",
          price: 4499,
          oldPrice: 14999,
          discount: "70% OFF",
        },
        {
          id: 2,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FLB9329034GRNCRO%2FGenuine%20Green%20Leather%20Women%20Handbag%20-%20LB9329034GRNCRO?alt=media&token=a4926f1b-ff30-4920-8b37-c2b956427f9e",
          title: "Genuine Green Leather Womens Handbag - LB9329034GRNCRORR",
          price: 3499,
          oldPrice: 6499,
          discount: "46% OFF",
        },
        {
          id: 3,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026DES.BRN%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026DESBRN%20?alt=media&token=6779e4d0-5406-4bf0-a4f3-cf21d6b8fd03",
          title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026DESBRN",
          price: 3119,
          oldPrice: 5799,
          discount: "46% OFF",
        },
        {
          id: 4,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026BRN?alt=media&token=41e1e314-4250-429a-8471-eae54b62a90f",
          title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026BRN",
          price: 3119,
          oldPrice: 5799,
          discount: "46% OFF",
        },
        {
          id: 5,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FTB2155001BRN%2FGenuine%20Leather%20Laptop%20Overnighter%20Trolley%20FA001%20-%20TB2155001BRN?alt=media&token=93e02a39-f67d-4c85-911e-c523f1eef85d",
          title: "Genuine Leather Laptop Overnighter Trolley - TB2155001BRN",
          price: 7999,
          oldPrice: 17999,
          discount: "56% OFF",
        },  
        {
          id: 6,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155064BRN%2FGenuine%20Leather%20Office%20Laptop%20Messenger%20bag%20For%20Men%20-%20MB2155064BRN?alt=media&token=2337c363-9134-4dc4-b24b-92ec3c8823d4",
          title: "Genuine Leather Office Laptop Messenger Bag For Men - MB2155064BRN",
          price: 2999,
          oldPrice: 11999,
          discount: "75% OFF",
        },
        {
          id: 7,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155019DESBRN%20%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155019DESBRN%20?alt=media&token=e7f70776-2cc4-45b5-b908-53ac01da638e",
          title: "Genuine Leather Laptop Messenger Bag For Men - MB2155019DESBRN",
          price: 4999,
          oldPrice: 9999,
          discount: "50% OFF",
        },
        {
          id: 8,
          img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026GREEN%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026GREEN?alt=media&token=ff7fb735-8019-4bf1-8d59-9ba0264f63e6",
          title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026GREEN",
          price: 3119,
          oldPrice: 5799,
          discount: "46% OFF",
        },
        {
            id: 9,
            img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FBC1149002BRN%2FGenuine%20Brown%20Leather%20Briefcase%20For%20Men%20-%20BC1149002BRN?alt=media&token=7a190322-9e88-45ce-9d26-477e84018b1b",
            title: "Genuine Brown Leather Briefcase For Men - BC1149002BRNRRETUVRETE",
            price: 4299,
            oldPrice: 9999,
            discount: "57% OFF",
          },
          {
            id: 10,
            img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FMB2155026BLUE%2FGenuine%20Leather%20Laptop%20Messenger%20Bag%20For%20Men%20-%20%20MB2155026BLUE?alt=media&token=559eab3c-da7c-4dd0-9b63-4a602266e542",
            title: "Genuine Leather Laptop Messenger Bag For Men - MB2155026BLUE",
            price: 3119,
            oldPrice: 5799,
            discount: "46% OFF",
          },
          {
            id: 11,
            img: "https://firebasestorage.googleapis.com/v0/b/marfit-ea7ba.appspot.com/o/supplier%2Fmarfit%2FSL1893009BROWN%2FGenuine%20Leather%20Sling%20Bag%20For%20Men%20-SL1893009BROWN?alt=media&token=c3b3cb99-aeb8-4a45-b51c-41bffb973f2f",
            title: "Genuine Leather Sling Bag For Men - SL1893009BROWN",
            price: 1499,
            oldPrice: 2999,
            discount: "50% OFF",
          },
      ];
      return (
        <div className="px-4 py-15 rounded-md bg-white">
      <div className="mx-10">
      <h1 className="text-3xl font-normal">Sales</h1>
      <div className="crossline flex items-center gap-2 ">
        <span className="w-20 h-1 bg-black"></span>
        <span className="w-1 h-6 bg-black rotate-40"></span>
        <span className="w-1 h-6 bg-black rotate-40"></span>
        <span className="w-20 h-1 bg-black"></span>
      </div>
      </div>

      <div className="relative w-full flex flex-wrap justify-start items-center my-6 mx-10">
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

export default Sale;