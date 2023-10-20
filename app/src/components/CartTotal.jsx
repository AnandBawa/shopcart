import { Separator } from "./ui/separator";

const CartTotal = ({ cart }) => {
  const { baseTotal, tax, taxAmount, shippingCost, total } = cart;

  return (
    <div className="p-2 xl:p-4 w-full bg-secondary rounded-lg tracking-wide">
      <p className="flex justify-between text-sm font-medium">
        <span>Subtotal</span>
        <span>$ {baseTotal.toFixed(2)}</span>
      </p>
      <Separator className="my-2 bg-background" />
      <p className="flex justify-between text-sm font-medium">
        <span>Tax @ {tax}%</span>
        <span>$ {taxAmount.toFixed(2)}</span>
      </p>
      <Separator className="my-2 bg-background" />
      <p className="flex justify-between text-sm font-medium">
        <span>Shipping</span>
        <span>$ {shippingCost.toFixed(2)}</span>
      </p>
      <Separator className="my-2 bg-background" />
      <p className="flex justify-between text-base mt-4 font-medium">
        <span>Total</span>
        <span>$ {total.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default CartTotal;
