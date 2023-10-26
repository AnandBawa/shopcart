import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const SimilarProducts = ({ similarProducts }) => {
  return (
    <div className="pt-4 lg:pt-8">
      <SectionTitle text="Similar Products" />
      <ProductsScroll key={similarProducts} products={similarProducts} />
    </div>
  );
};

export default SimilarProducts;
