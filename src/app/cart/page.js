"use client";
import { useContext } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext } from "../components/AppContext";
import Trash from "../components/icons/Trash";
import Image from "next/image";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-4 grid gap-4 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product) => (
              <div className="flex items-center gap-4 mb-2 border-b py-2">
                <div className="w-24">
                  <Image
                    width={240}
                    height={240}
                    src={product.image}
                    alt={""}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div>
                      Extras:
                      {product.extras.map((extra) => (
                        <div className="text-sm text-gray-500">
                          {extra.name} ${extra.price}{" "}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg semibold">
                    
                </div>
                <div className="ml-2">
                    <button className="p-2"><Trash /></button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
