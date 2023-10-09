import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const ProductCard = ({ product }) => {
  const { _id, name, category, subcategory, price, origPrice, images } =
    product;
  const discount = Math.floor(((origPrice - price) * 100) / origPrice);
  return (
    <Link
      to={`/products/${_id}`}
      key={_id}
      className="space-y-3 mx-auto grid place-items-center mt-2"
    >
      <div className="overflow-hidden rounded-xl w-[200px] h-[200px] xl:w-[300px] xl:h-[300px] relative self-center">
        <h1 className="absolute bottom-0 right-0 text-lg font-semibold tracking-wider bg-secondary text-destructive rounded-tl-lg p-1">
          -{discount}
          <span className="text-base">%</span>
        </h1>
        <img
          src={images[0].url}
          alt={name}
          className="overflow h-full w-full transition-all ease-in duration-300 hover:scale-110"
        />
      </div>
      <div className="grid grid-cols-3 items-center w-[200px] xl:w-[300px]">
        <div className="col-span-3">
          <h2 className="capitalize truncate tracking-wide font-semibold">
            {name}
          </h2>
          <Separator className="my-1" />
        </div>
        <div className="font-semibold tracking-wide text-primary mb-4">
          ${price}
        </div>
        <div className="col-span-2 font-semibold text-sm tracking-wider truncate mb-4">
          {product.type ? `${product.type} / ${subcategory}` : `${subcategory}`}{" "}
          / {category}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
