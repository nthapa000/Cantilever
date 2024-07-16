import { CartContext } from "@/components/CardContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext } from "react";

export default function CartPage() {
  const {cartProducts} = useContext(CartContext);
  return (
    <>
      <Header />
      {/* Displaying the products */}
      <Center>
        <div className="CartColumnsWrapper">
          <div className="CartBox">

          </div>
          <div className="CartBox">
            <h2 className="font-bold text-2xl">Order Information</h2>
            <input className="border rounded-md mb-2" type="text" placeholder="Address"/>
            <input className="border rounded-md" type="text" placeholder="Address 2" />
            <button className="rounded-md p-2  bg-black text-white  mt-2 w-[100%] block text">Continue to payment</button>
          </div>
        </div>
      </Center>
    </>
  );
}
