import { useOutletContext } from "react-router-dom";
import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const Featured = () => {
  const { featured } = useOutletContext();

  return (
    <div className="px-4 lg:py-8">
      <SectionTitle text="Featured Parts" />
      <ProductsScroll key={featured} products={featured} />
    </div>
  );
};

export default Featured;
