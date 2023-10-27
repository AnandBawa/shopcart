import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { SearchProducts, ProductsGrid, SectionTitle } from "@/components";
import fetchData from "@/lib/fetchData";

// React Query object to fetch products based on search params
const productsQuery = (params) => {
  const { search, category, subcategory, sort, minPrice, maxPrice, pageNo } =
    params;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "All",
      subcategory ?? "All",
      sort ?? "New",
      minPrice ? Number(minPrice) : "",
      maxPrice ? Number(maxPrice) : "",
      pageNo ? Number(pageNo) : 1,
    ],
    queryFn: async () => {
      const { data } = await fetchData.get("/products", { params });
      return data;
    },
  };
};

// React Router loader to get products based on search query and caching using React Query
export const productsLoader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const productsData = await queryClient.ensureQueryData(
        productsQuery(params)
      );

      return {
        searchValues: { ...params },
      };
    } catch (error) {
      return error;
    }
  };

const Products = () => {
  const { searchValues } = useLoaderData();
  const { products, totalProducts, numPages, currentPage } = useQuery(
    productsQuery(searchValues)
  ).data;

  return (
    <div className="mx-auto w-full md:max-w-[80vw] mt-4 lg:mt-8 px-2">
      <SectionTitle text="Search Products" />
      <SearchProducts />
      <ProductsGrid
        products={products}
        totalProducts={totalProducts}
        numPages={numPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Products;
