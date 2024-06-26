import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/app/components/menu/MenuItemTile";
// import Image from "next/image";
import Image from "next/image";

const MenuItems = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const { addToCart } = useContext(CartContext);
  console.log(sizes.length);

  function handleAddToCartButtonClick() {
    console.log("add to cart");
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success("Added to cart!");
  }
  function handleExtraThingClick(ev, extraThing) {
    // console.log(ev,extraThing)
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/20  flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-scroll p-2"
              style={{ maxHeight: "calc(100vh - 20px)" }}
            >
              <Image
                className="mx-auto "
                src={image}
                alt={name}
                width={200}
                height={200}
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className=" p-2">
                  <h3 className="text-center text-gray-900">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      className="flex items-center gap-2 p-4 py-1 border
                   border-gray-500 rounded-md mb-2"
                    >
                      <input
                        type="radio"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name={size}
                      />{" "}
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className=" p-2">
                  <h3 className="text-center text-gray-900">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label
                      className="flex items-center gap-2 p-4 py-1 border
               border-gray-500 rounded-md mb-2"
                    >
                      <input
                        type="checkbox"
                        onClick={(ev) => handleExtraThingClick(ev, extraThing)}
                        name={extraThing.name}
                      />{" "}
                      {extraThing.name}
                      +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="bg-red-600 text-white sticky bottom-2"
                type="button"
              >
                Add to cart ₾{selectedPrice}
              </button>
              <button onClick={() => setShowPopup(false)} className="mt-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItems;
