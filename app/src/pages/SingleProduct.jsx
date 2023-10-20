import {
  redirect,
  useLoaderData,
  Link,
  useOutletContext,
  Form,
} from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import fetchData from "@/utils/fetchData";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Reviews, SimilarProducts } from "@/components";
import { generateSelectOptions } from "@/utils/utils";

export const singleProductLoader = async ({ params }) => {
  try {
    const response = await fetchData.get(`/products/${params.id}`);
    const { product } = response.data;
    const response2 = await fetchData.get(
      `/products/?subcategory=${product.subcategory}`
    );
    const { products: similarProducts } = response2.data;
    return { product, similarProducts };
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Product not found");
    return redirect("/products");
  }
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const {
    _id,
    reviews,
    addedBy,
    category,
    subcategory,
    price,
    origPrice,
    discount,
    name,
    images,
    createdAt,
    updatedAt,
    __v,
    ...rest
  } = product;

  const details = Object.entries(rest);

  const { addItem } = useOutletContext();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleClick = () => {
    addItem(product, quantity);
  };

  return (
    <div className="mx-auto w-full md:max-w-[80vw] px-2">
      <section className="mt-2 lg:mt-4">
        <div>
          <ul className="flex flex-wrap text-sm font-medium tracking-wide items-center">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="h-5 w-5" />
            </li>
            <li>
              <Link to="/products" className="hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <ChevronRight className="h-5 w-5" />
            </li>
            <li>
              <Link
                to={`/products?category=${category}`}
                className="hover:text-primary"
              >
                {category}
              </Link>
            </li>
            <li>
              <ChevronRight className="h-5 w-5" />
            </li>
            <li>
              <Link
                to={`/products?subcategory=${subcategory}`}
                className="hover:text-primary"
              >
                {subcategory}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <img
              src={images[0].url}
              alt={name}
              className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] 2xl:w-[500px] 2xl:h-[500px] rounded-lg place-self-center"
            />
            <div>
              <h1 className="text-xl font-semibold capitalize tracking-wider">
                {name}
              </h1>

              <p className="font-medium mt-1">
                <span className="line-through text-lg">${origPrice}</span>
                <span className="text-destructive text-sm">
                  {" "}
                  {Math.round(discount)}% off
                </span>
              </p>
              <p className="text-primary text-xl font-semibold tracking-wide">
                ${price}
              </p>
              <div className="mt-2">
                <select
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantity}
                  className="bg-secondary h-9 w-20 rounded-lg text-center font-semibold"
                >
                  {generateSelectOptions(10)}
                </select>
                <Button onClick={handleClick} className="ml-4 text-base">
                  Add to Cart
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
                {details.map((detail) => {
                  let [key, value] = detail;
                  if (typeof value === "boolean" && value) {
                    value = "Yes";
                  } else if (typeof value === "boolean" && !value) {
                    value = "No";
                  }
                  if (!value || value.length === 0) {
                    value = "n/a";
                  }
                  if (Array.isArray(value)) {
                    value = value.join(", ");
                  }
                  if (typeof value === "boolean" && value) {
                    value = "Yes";
                  } else if (typeof value === "boolean" && !value) {
                    value = "No";
                  }
                  key = key.replace("_", " ");
                  return (
                    <li key={key} className="capitalize text-sm tracking-wide">
                      {key}: {value}
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Separator className="mt-1 lg:mt-2" />
      {/* <section>{Similar Products}</section> */}
      <SimilarProducts />
      {/* <section>{Reviews}</section> */}
      <Reviews />
    </div>
  );
};

export default SingleProduct;
