import { useOutletContext, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { generateSelectOptions } from "@/utils/utils";

const CartItems = () => {
  const { cart, editItem, removeItem } = useOutletContext();
  return (
    <div>
      {cart.map((cartItem) => {
        const { _id, name, price, images } = cartItem.product;
        const quantity = cartItem.quantity;
        const total = price * quantity;
        return (
          <div key={_id} className="">
            <div className="grid grid-cols-3 gap-4">
              <Link to={`/products/${_id}`} className="">
                <img
                  src={images[0].url}
                  alt={name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
              </Link>
              <div className="grid gap-2">
                <Link
                  to={`/products/${_id}`}
                  className="capitalize text-sm font-medium hover:underline hover:text-primary"
                >
                  {name}
                </Link>
                <select
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => {
                    editItem(_id, e.target.value);
                  }}
                  className="bg-secondary h-8 w-16 rounded-lg text-center text-sm font-semibold"
                >
                  {generateSelectOptions(quantity + 5)}
                </select>
                <Button
                  variant="link"
                  className="p-0 h-2 text-sm justify-start"
                  onClick={() => removeItem(_id)}
                >
                  Remove
                </Button>
              </div>
              <div className="text-end">
                <h1 className="font-medium text-lg">$ {total.toFixed(2)}</h1>
                <h2 className="text-sm">$ {price.toFixed(2)} ea</h2>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
