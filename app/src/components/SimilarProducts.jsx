import { useLoaderData } from "react-router-dom";
import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const SimilarProducts = () => {
  const { similarProducts } = useLoaderData();

  return (
    <div className="px-1 pt-4 lg:pt-8">
      <SectionTitle text="Similar Products" />
      <ProductsScroll key={similarProducts} products={similarProducts} />
    </div>
  );
};

export default SimilarProducts;
