import Image from "next/image";
import Right from "@/app/components/icons/Right";

export default function Hero() {
  return (
    <section className="grid grid-cols-2">
      <div className="py-8">
        <h1 className="text-4xl font-semibold leading-12">
          Everything
          <br /> is better
          <br /> with a  <span className="text-red-600">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500">
          Pizza is the missing piece that makes every day complete a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4">
          <button className="bg-red-600 text-sm items-center uppercase text-white flex gap-2 px-8 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 font-semibold border-none">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className=" relative">
        <Image
          src={"/pizza.png"}
          alt={"pizza"}
          layout={"fill"}
          objectFit={"contain"}
        />
      </div>
    </section>
  );
}
