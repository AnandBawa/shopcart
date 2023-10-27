import { useOutletContext } from "react-router-dom";
import ProductsScroll from "@/components/ProductsScroll";
import SectionTitle from "@/components/SectionTitle";

// a product scroll for landing page that displays highest discounted products in each category
const MaxDiscount = () => {
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

export default MaxDiscount;
