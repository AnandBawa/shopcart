import {
  Form,
  useOutletContext,
  Navigate,
  Link,
  useActionData,
} from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionTitle, CartTotal } from "@/components";
import fetchData from "@/lib/fetchData";

// React Router action to place an order at checkout page form submission
export const checkoutAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const parsedData = { ...data };
    parsedData.address = JSON.parse(parsedData.address);
    parsedData.payment = JSON.parse(parsedData.payment);
    parsedData.cart = JSON.parse(parsedData.cart);

    try {
      await fetchData.post(`/orders`, parsedData);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(`Order placed successfully`, { delay: 1000 });
      return "success";
    } catch (error) {
      toast.error("There was an error. Please try again");
      return "error";
    }
  };

const Checkout = () => {
  const { user, clearCart, cart } = useOutletContext();

  // useActionData hook to clear the cart and navigate to orders page if order is placed successfully
  const result = useActionData();
  if (result === "success") {
    clearCart();
    return <Navigate to="/orders" />;
  } else if (result === "error") {
    return <Navigate to="/cart" />;
  }

  // redirect if page is accessed without login
  if (!user) {
    toast.error("You are not logged in");
    return <Navigate to="/" replace={true} />;
  }

  if (cart?.items?.length === 0) {
    return (
      <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8 text-center">
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
    <div className="px-2 mx-auto w-full md:max-w-[65vw] mt-4 lg:mt-8">
      <SectionTitle text="Checkout" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal cart={cart} />
          <Button asChild variant="outline" className="grid">
            <Link to="/cart" className="mt-3 text-primary tracking-wide">
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
            <div className="grid place-items-center">
              <Button variant="outline" asChild>
                <Link to="/address-book" className="mt-2 text-primary">
                  Add / Edit Addresses
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-4">
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
            <div className="grid place-items-center">
              <Button variant="outline" asChild>
                <Link to="/payment-methods" className="mt-2 text-primary">
                  Add / Edit Payments
                </Link>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {user.address.length < 1 || user.payments.length < 1 ? (
            <Button
              disabled
              variant="outline"
              className="text-destructive font-semibold"
            >
              Please add{" "}
              {user.address.length < 1 && user.payments.length < 1
                ? "an address & a payment"
                : user.address.length < 1
                ? "an address"
                : "a payment"}{" "}
              to place order
            </Button>
          ) : (
            <Button type="submit" className="mt-1">
              Place Order
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
