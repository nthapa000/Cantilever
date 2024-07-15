import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProduct";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/model/Product";

export default function Homepage({featuredProduct,newProducts}) {
  // console.log(product);
  return (
    <div className="roboto-regular">
      <Header />
      <Featured  product={featuredProduct}/>
      <NewProducts products={newProducts}/>
    </div>
  );
}

export async function getServerSideProps() {
  const FeaturedProductId = "668e4d317cc6e41ed18d8c4a";
  await mongooseConnect();
  const featuredProduct = await Product.findById(FeaturedProductId);
  // -1 descending, last updated product is basically the latest product
  const newProducts = await Product.find({},null,{sort:{'_id':-1},limit:10});
  return { 
    props: {
      featuredProduct:JSON.parse(JSON.stringify(featuredProduct)),
      newProducts:JSON.parse(JSON.stringify(newProducts))
    } 
  };
}
