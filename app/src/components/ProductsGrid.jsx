import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
import PageButtons from "./PageButtons";

const ProductsGrid = () => {
  const { products, totalProducts, numPages } = useLoaderData();

  if (products.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold tracking-wider text-destructive">
        No Products Found
      </h2>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-1 justify-between mt-5 px-1">
        <h2 className=" text-base font-medium tracking-wide">
          {totalProducts} product{totalProducts > 1 && "s"} found
        </h2>
        <PageButtons />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 my-1 bg-secondary rounded-xl">
        {products.map((product) => {
          return (
            <div key={product._id} className="border border-card rounded-none">
              <ProductCard product={product} key={product._id} />
            </div>
          );
        })}
      </div>
      <div className="grid justify-items-end px-1">
        <PageButtons />
      </div>
    </>
  );
};

export default ProductsGrid;
