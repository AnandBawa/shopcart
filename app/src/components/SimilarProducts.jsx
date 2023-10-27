import ProductsScroll from "@/components/ProductsScroll";
import SectionTitle from "@/components/SectionTitle";

// a product scroll for product page that displays similar products in subcategory
const SimilarProducts = ({ similarProducts }) => {
  return (
    <div className="pt-4 lg:pt-8">
      <SectionTitle text="Similar Products" />
      <ProductsScroll key={similarProducts} products={similarProducts} />
    </div>
  );
};

export default SimilarProducts;
