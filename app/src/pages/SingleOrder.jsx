import {
  Link,
  useLoaderData,
  useOutletContext,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { SectionTitle, CartItems, CartTotal, OrderDetails } from "@/components";
import { Button } from "@/components/ui/button";
import fetchData from "@/utils/fetchData";

export const singleOrderLoader = async ({ params }) => {
  try {
    const response = await fetchData.get(`/orders/${params.id}`);
    const { order } = response.data;
    return order;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Order not found");
    return error;
  }
};

const SingleOrder = () => {
  const { user } = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" />;
  }

  const order = useLoaderData();
  const { cart } = order;

  return (
    <div className="p-1 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Order Details" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pl-4 grid gap-2">
          <OrderDetails order={order} />
          <CartTotal cart={cart} />
          <Button variant="outline" asChild className="grid">
            <Link to="/orders" className="mt-2 text-primary tracking-wide">
              Back to Orders
            </Link>
          </Button>
        </div>
        <div className="grid lg:col-span-8 place-items-center">
          <CartItems cart={cart} isOrder={true} />
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
