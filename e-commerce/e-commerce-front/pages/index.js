import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";

export default function Homepage({product}) {
  // console.log(product);
  return (
    <div className="roboto-regular">
      <Header />
      <Featured  product={product}/>
    </div>
  );
}

export async function getServerSideProps() {
  const FeaturedProductId = "668e4d317cc6e41ed18d8c4a";
  await mongooseConnect();
  const product = await Product.findById(FeaturedProductId);
  return { 
    props: { product:JSON.parse(JSON.stringify(product)) } 
  };
}
