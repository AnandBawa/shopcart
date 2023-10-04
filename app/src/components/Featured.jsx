import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const Featured = () => {
  return (
    <div className="px-4 lg:py-8">
      <SectionTitle text="Featured Parts" />
      <ProductsScroll />
    </div>
  );
};

export default Featured;
