import { useOutletContext } from "react-router-dom";
import ProductsScroll from "./ProductsScroll";
import SectionTitle from "./SectionTitle";

const Featured = () => {
  const { maxDiscountProducts } = useOutletContext();

  return (
    <div className="px-1 lg:pt-4">
      <SectionTitle text="Top Discounts" />
      <ProductsScroll
        key={maxDiscountProducts}
        products={maxDiscountProducts}
      />
    </div>
  );
};

export default Featured;
