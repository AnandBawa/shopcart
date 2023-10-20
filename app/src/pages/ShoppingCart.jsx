import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionTitle, CartItems, CartTotal } from "@/components";

const ShoppingCart = () => {
  const { user, cart, clearCart } = useOutletContext();

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
      <SectionTitle text="Shopping Cart" />
      <div className="mt-4 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal cart={cart} />
          {user ? (
            <Button asChild className="grid">
              <Link to="/checkout" className="mt-2 tracking-wide">
                Proceed to Checkout
              </Link>
            </Button>
          ) : (
            <Button asChild className="grid">
              <Link to="/login" className="mt-2 tracking-wide">
                Please Login
              </Link>
            </Button>
          )}
        </div>
        <div className="grid lg:col-span-8 place-items-center">
          <CartItems cart={cart} isOrder={false} />
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
