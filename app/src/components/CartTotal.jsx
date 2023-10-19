import { useOutletContext } from "react-router-dom";
import { Separator } from "./ui/separator";

const CartTotal = () => {
  const { getCartTotal } = useOutletContext();

  const subTotal = getCartTotal();
  const tax = (subTotal * 10) / 100;
  const shipping = 5;

  return (
    <div className="p-4 w-full bg-secondary rounded-lg">
      <p className="flex justify-between text-sm font-medium">
        <span>Subtotal</span>
        <span>$ {subTotal.toFixed(2)}</span>
      </p>
      <Separator className="my-2" />
      <p className="flex justify-between text-sm font-medium">
        <span>Tax</span>
        <span>$ {tax.toFixed(2)}</span>
      </p>
      <Separator className="my-2" />
      <p className="flex justify-between text-sm font-medium">
        <span>Shipping</span>
        <span>$ {shipping.toFixed(2)}</span>
      </p>
      <Separator className="my-2" />
      <p className="flex justify-between text-base mt-4 font-medium">
        <span>Total</span>
        <span>$ {(subTotal + tax + shipping).toFixed(2)}</span>
      </p>
    </div>
  );
};

export default CartTotal;
