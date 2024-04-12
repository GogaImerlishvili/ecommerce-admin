import React from "react";

const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  return (
    <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-md transiotion-all hover:shadow-black/25">
      <div className="text-center">
        <img className="max-h-auto max-h-24 mx-auto" src={image} alt="pizza" />
      </div>
      <h4 className="font-semibold mt-2 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm mb-4 line-clamp-3">{description}</p>
      <button
        type="button"
        onClick={onAddToCart}
        className="bg-red-600 text-white rounded-full px-8 py-2"
      >
        {sizes?.length > 0 || extraIngredientPrices?.length > 0 ? (
          <span>Add to cart (from ${basePrice})</span>
        ) : (
          <span> Add to cart ${basePrice}</span>
        )}
      </button>
    </div>
  );
};

export default MenuItemTile;
