import { CartContextProvider } from "@/components/CardContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
    <CartContextProvider>
      <Component {...pageProps} />;
      </CartContextProvider>
    </>
  );
}
