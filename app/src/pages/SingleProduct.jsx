import fetchData from "@/utils/fetchData";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const singleProductLoader = async ({ params }) => {
  try {
    const response = await fetchData.get(`/products/${params.id}`);
    const { product } = response.data;
    return product;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Product not found");
    return redirect("/");
  }
};

const SingleProduct = () => {
  return <h1 className="text-4xl">Single Product</h1>;
};

export default SingleProduct;
