import { Link, Navigate, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import day from "dayjs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components";
import fetchData from "@/lib/fetchData";

const ordersQuery = {
  queryKey: ["orders"],
  queryFn: async () => {
    const { data } = await fetchData.get(`/orders/`);
    return data;
  },
};

export const ordersLoader = (queryClient) => async () => {
  try {
    const ordersData = await queryClient.ensureQueryData(ordersQuery);
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Orders = () => {
  const { user } = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" replace={true} />;
  }

  const { orders } = useQuery(ordersQuery).data;

  if (orders?.length === 0) {
    return (
      <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8 text-center">
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
    <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
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
              className="p-1 grid gap-1 bg-secondary rounded-xl"
            >
              <p className="text-base font-medium text-primary">
                # {index + 1}
              </p>
              <p className="flex justify-between text-sm tracking-wide">
                <span className="font-medium">Order ID:</span>
                <span>{order._id}</span>
              </p>
              <Separator className="bg-background" />
              <p className="flex justify-between text-sm tracking-wide">
                <span className="font-medium">Date:</span>
                <span>{date}</span>
              </p>
              <p className="text-sm ">{`${name}${
                quantity > 1 ? ` + ${quantity - 1} items` : ""
              }`}</p>
              <Separator className="bg-background" />
              <p className="flex justify-between text-sm tracking-wide mb-1 font-medium">
                <span>Total:</span>
                <span>$ {total.toFixed(2)}</span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
