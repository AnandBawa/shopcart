import { Separator } from "@/components/ui/separator";
import day from "dayjs";

// Order Details component that shows order details for each order
const OrderDetails = ({ order }) => {
  const { _id, address, payment, createdAt } = order;
  const date = day(createdAt).format("DD/MMM/YYYY");

  return (
    <div className="p-2 xl:p-4 w-full bg-secondary rounded-xl tracking-wide">
      <p className="flex justify-between text-sm font-medium">
        <span>Order ID:</span>
        <span>{_id}</span>
      </p>
      <Separator className="my-2 bg-background" />
      <p className="flex justify-between text-sm font-medium">
        <span>Date:</span>
        <span>{date}</span>
      </p>
      <Separator className="my-2 bg-background" />
      <p className="text-sm">
        <span className="font-medium">Address: </span>
        <span>
          {address.add1}, {address.add2}, {address.location},{address.pin}
        </span>
      </p>
      <Separator className="my-2 bg-background" />
      <p className="flex justify-between text-sm">
        <span>
          <span className="font-medium">Payment: </span>
          {`${"*".repeat(12)}${payment.number.toString().slice(12)}`}
        </span>
        <span>
          <span className="font-medium ml-5">Expiry: </span>
          {payment.expiryMonth}/{payment.expiryYear}
        </span>
      </p>
    </div>
  );
};

export default OrderDetails;
