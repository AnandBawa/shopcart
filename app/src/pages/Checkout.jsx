import {
  Form,
  useOutletContext,
  Navigate,
  redirect,
  Link,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components";
import CartTotal from "@/components/CartTotal";
import { Separator } from "@/components/ui/separator";
import fetchData from "@/utils/fetchData";

export const checkoutAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const parsedData = { ...data };
  parsedData.address = JSON.parse(parsedData.address);
  parsedData.payment = JSON.parse(parsedData.payment);
  parsedData.cart = JSON.parse(parsedData.cart);

  try {
    await fetchData.post(`/orders`, parsedData);
    toast.success(`Order placed successfully`);
    return redirect("/orders");
  } catch (error) {
    toast.error("There was an error. Please try again");
    return redirect("/");
  }
};

const Checkout = () => {
  const { user, cart, clearCart } = useOutletContext();

  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" />;
  }

  if (cart?.items?.length === 0) {
    return (
      <div className="p-1 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8 text-center">
        <h1 className="text-lg font-semibold tracking-wide mt-4">
          Your Cart is Empty
        </h1>
        <Button asChild className="mt-4">
          <Link to="/products">Shop Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-1 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Checkout" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal cart={cart} />
          <Button asChild variant="outline" className="grid">
            <Link to="/cart" className="mt-2 text-primary tracking-wide">
              Back to Cart
            </Link>
          </Button>
        </div>
        <Form method="post" className="grid lg:col-span-8">
          <div>
            <h1 className="font-semibold">Delivery Address</h1>
            <Separator className="my-2" />
            {user.address.map((address) => {
              return (
                <div key={address._id} className="px-2 my-1">
                  <input
                    type="radio"
                    id={address.nickname}
                    name="address"
                    value={JSON.stringify(address)}
                    required="required"
                    className=" align-bottom"
                  />
                  <label
                    htmlFor={address.nickname}
                    className="ml-2 text-sm align-top"
                  >
                    <span className="font-medium">{address.nickname}: </span>
                    <br></br>
                    <span className="ml-5">{`${address.add1}, ${address.add2}, ${address.location}, ${address.pin}`}</span>
                  </label>
                </div>
              );
            })}
          </div>
          <div className="mt-2">
            <h1 className="font-semibold">Payment Method</h1>
            <Separator className="my-2" />
            {user.payments.map((payment) => {
              return (
                <div key={payment._id} className="px-2 my-1">
                  <input
                    type="radio"
                    id={payment.nickname}
                    name="payment"
                    value={JSON.stringify(payment)}
                    required="required"
                    className=" align-bottom"
                  />
                  <label
                    htmlFor={payment.nickname}
                    className="ml-2 text-sm align-top"
                  >
                    <span className="font-medium">Card Number: </span>
                    {`${"*".repeat(12)}${payment.number.toString().slice(12)}`}
                    <br></br>
                    <span className="font-medium ml-5">Expiry: </span>
                    {payment.expiryMonth} / {payment.expiryYear}
                  </label>
                </div>
              );
            })}
          </div>
          <Separator className="my-1" />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="submit" className="mt-2">
            Place Order
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
