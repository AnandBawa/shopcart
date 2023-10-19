import { useOutletContext } from "react-router-dom";
import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const Featured = () => {
  const { maxDiscount } = useOutletContext();

  return (
    <div className="px-1 lg:pt-4">
      <SectionTitle text="Top Discounts" />
      <ProductsScroll key={maxDiscount} products={maxDiscount} />
    </div>
  );
};

export default Featured;
