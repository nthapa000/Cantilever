import { CartContext } from "@/components/CardContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products?.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  return (
    <>
      <Header />
      {/* Displaying the products */}
      <Center>
        <div className="CartColumnsWrapper">
          <div className="CartBox">
            <h2 className="font-bold text-3xl mb-2">Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {/* converted cartProducts to boolean */}
            {products?.length > 0 && (
              <table className="CartTable">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="pr-5">Quantity</th>
                    <th className="pl-1">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td>
                        <div className="CartProductInfoCellImagesBox">
                          <img
                            className="CartProductInfoCellImages"
                            src={product.images[0]}
                            alt=""
                          />
                        </div>
                        {product.title}
                      </td>
                      <td>
                        <button
                          onClick={() => lessOfThisProduct(product._id)}
                          className="bg-[#eee] rounded-md w-6 mr-1"
                        >
                          -
                        </button>
                        {cartProducts.filter((id) => id === product._id).length}
                        <button
                          onClick={() => moreOfThisProduct(product._id)}
                          className="bg-[#eee] rounded-md w-6 ml-1"
                        >
                          +
                        </button>
                      </td>
                      <td>
                        Rs.
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Rs. {total}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {!!cartProducts?.length && (
            <div className="CartBox">
              <h2 className="font-bold text-2xl mb-2">Order Information</h2>
              <form method="post" action="/api/checkout">
                <input
                  className="border rounded-md mb-2 CartInput"
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <input
                  className="border rounded-md CartInput"
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <div className="flex gap-1">
                  <input
                    className="border rounded-md CartInput"
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="border rounded-md CartInput"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="border rounded-md CartInput"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="border rounded-md CartInput"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <input
                  type="hidden"
                  name="products"
                  value={cartProducts.join(",")}
                />
                <button className="rounded-md p-2  bg-black text-white  mt-2 w-[100%] block text">
                  Continue to payment
                </button>
              </form>
            </div>
          )}
        </div>
      </Center>
    </>
  );
}
