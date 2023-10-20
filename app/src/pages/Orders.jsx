import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { SectionTitle } from "@/components";
import { Button } from "@/components/ui/button";
import fetchData from "@/utils/fetchData";

export const ordersLoader = async () => {
  try {
    const response = await fetchData.get(`/orders/`);
    const { orders } = response.data;
    return orders;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Product not found");
    return error;
  }
};

const Orders = () => {
  const orders = useLoaderData();
  console.log(orders);

  if (orders?.length === 0) {
    return (
      <div className="p-1 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8 text-center">
        <h1 className="text-lg font-semibold tracking-wide mt-4">
          No Orders Placed
        </h1>
        <Button asChild className="mt-4">
          <Link to="/products">Shop Products</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="p-1 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Order History" />
      <div>{orders.map((order) => {})}</div>
    </div>
  );
};

export default Orders;
