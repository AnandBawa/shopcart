import ProductCard from "@/components/ProductCard";
import PageButtons from "@/components/PageButtons";

// Product Grid component that displays all the products of a search
const ProductsGrid = ({ products, totalProducts, numPages, currentPage }) => {
  if (products.length === 0) {
    return (
      <h2 className="text-center mt-10 text-xl font-semibold tracking-wider text-destructive">
        No Products Found
      </h2>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-1 justify-between mt-5 ">
        <h2 className=" text-base font-medium tracking-wide">
          {totalProducts} product{totalProducts > 1 && "s"} found
        </h2>
        {numPages > 1 && (
          <PageButtons numPages={numPages} currentPage={currentPage} />
        )}
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
      {numPages > 1 && (
        <div className="grid justify-items-end">
          <PageButtons numPages={numPages} currentPage={currentPage} />
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
