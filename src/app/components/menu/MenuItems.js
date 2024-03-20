const MenuItems = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md transiotion-all hover:shadow-black/25">
     <div className="text-center">
     <img className="max-h-auto max-h-24 mx-auto" src="/pizza.png" alt="pizza" />
     </div>
      <h4 className="font-semibold mt-2 text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm py-2">
        Lorem Ipsum is simply dummy text of the printing and
      </p>
      <button className="bg-red-600 text-white rounded-full px-8 py-2">
        Add to cart $12
      </button>
    </div>
  );
};

export default MenuItems;
