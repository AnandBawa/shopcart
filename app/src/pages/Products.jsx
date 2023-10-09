import { useNavigation } from "react-router-dom";
import { SearchProducts, ProductsGrid } from "@/components";
import fetchData from "@/utils/fetchData";

export const productsLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const response1 = await fetchData.get("/products", { params });
    const { totalProducts, numPages, currentPage, products } = response1.data;
    return {
      totalProducts,
      numPages,
      currentPage,
      products,
      searchValues: { ...params },
    };
  } catch (error) {
    return error;
  }
};

const Products = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mx-auto w-full md:max-w-[80vw] mt-4 lg:mt-8">
          <SearchProducts />
          <ProductsGrid />
        </div>
      )}
    </>
  );
};

export default Products;
