import { useOutletContext } from "react-router-dom";
import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const Featured = () => {
  const { featured } = useOutletContext();

  return (
    <div className="px-4 lg:pt-8">
      <SectionTitle text="Featured Products" />
      <ProductsScroll key={featured} products={featured} />
    </div>
  );
};

export default Featured;
