import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import day from "dayjs";
import { SectionTitle } from "@/components";
import { Button } from "@/components/ui/button";
import fetchData from "@/utils/fetchData";
import { Separator } from "@/components/ui/separator";

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
      <h1 className="my-2 text-sm font-semibold tracking-wide">
        Total Orders: {orders.length}
      </h1>
      <div className="mt-2 grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
        {orders.map((order, index) => {
          const { cart, createdAt } = order;
          const date = day(createdAt).format("DD/MMM/YYYY");
          const quantity = cart.totalQuantity;
          const total = cart.total;
          const name = cart.items[0].product.name;

          return (
            <Link
              to={`/orders/${order._id}`}
              key={order._id}
              className="p-1 grid gap-1 bg-secondary rounded-lg"
            >
              <h1 className="text-base font-medium text-primary">
                # {index + 1}
              </h1>
              <h1 className="text-sm tracking-wide">
                <span className="font-medium">Order ID:</span> {order._id}
              </h1>
              <Separator />
              <h1 className="text-sm tracking-wide">
                <span className="font-medium">Date:</span> {date}
              </h1>
              <h1 className="text-sm ">{`${name}${
                quantity > 1 ? ` & ${quantity - 1} items` : ""
              }`}</h1>
              <Separator />
              <h1 className="text-sm tracking-wide">
                <span className="font-medium">Total:</span> ${total.toFixed(2)}
              </h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
