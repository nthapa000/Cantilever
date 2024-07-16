import Link from "next/link";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CardContext";

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  return (
    <header className="bg-[#222] ">
      <Center>
        <div className="headerDiv">
          <Link className="text-white " href={"/"}>
            Ecommerce
          </Link>
          <nav className="headerNav">
            <Link className="navLink" href={"/"}>Home</Link>
            <Link className="navLink" href={"/products"}>All products</Link>
            <Link className="navLink" href={"/categories"}>Categories</Link>
            <Link className="navLink" href={"/account"}>Account</Link>
            <Link className="navLink" href={"/cart"}>Cart ({cartProducts.length})</Link>
          </nav>
        </div>
      </Center>
    </header>
  );
}
