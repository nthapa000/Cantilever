import Link from "next/link";
import Center from "./Center";

export default function Header() {
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
            <Link className="navLink" href={"/cart"}>Cart (0)</Link>
          </nav>
        </div>
      </Center>
    </header>
  );
}
