import {
  Link,
  useOutletContext,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SectionTitle, CartItems, CartTotal, OrderDetails } from "@/components";
import { Button } from "@/components/ui/button";
import fetchData from "@/utils/fetchData";

const singleOrderQuery = (id) => {
  return {
    queryKey: ["singleOrder", id],
    queryFn: async () => {
      const { data } = await fetchData.get(`/orders/${id}`);
      return data;
    },
  };
};

export const singleOrderLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const orderData = await queryClient.ensureQueryData(
        singleOrderQuery(params.id)
      );
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Order not found");
      return error;
    }
  };

const SingleOrder = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { user } = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" replace={true} />;
  }

  const { order } = useQuery(singleOrderQuery(id)).data;
  const { cart } = order;

  return (
    <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
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
