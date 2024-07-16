import Center from "./Center";
import ProductBox from "./ProductBox";

export default function NewProducts({ products }) {
  return (
    <Center>
      <div className="NewProductGrid">
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox {...product} />
          ))}
      </div>
    </Center>
  );
}
