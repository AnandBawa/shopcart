import {
  redirect,
  Link,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Reviews, SimilarProducts } from "@/components";
import { generateSelectOptions } from "@/lib/generateSelectOptions";
import fetchData from "@/lib/fetchData";

// React Query object to fetch product details
const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const { data } = await fetchData.get(`/products/${id}`);
      return data;
    },
  };
};

// React Query object to fetch similar products
const similarProductsQuery = (subcategory) => {
  return {
    queryKey: ["similarProducts", subcategory],
    queryFn: async () => {
      const { data } = await fetchData.get(
        `/products/?subcategory=${subcategory}`
      );
      return data;
    },
  };
};

// React Router loader to load product details and fetch similar products for products scroll and caching using React Query
export const singleProductLoader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const productData = await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      );
      const { product } = productData;
      const similarProductsData = await queryClient.ensureQueryData(
        similarProductsQuery(product.subcategory)
      );
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Product not found");
      return redirect("/products");
    }
  };

// React Router action to handle adding, editing or deleting review for product
export const singleProductAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { action, id } = data;

    if (action === "add") {
      delete data.action;
      delete data.id;
      try {
        await fetchData.post(`/products/${params.id}/reviews`, data);
        queryClient.invalidateQueries({
          queryKey: ["singleProduct", params.id],
        });
        toast.success(`Review added successfully`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
      return redirect(`/products/${params.id}`);
    }
    if (action === "edit") {
      delete data.action;
      delete data.id;
      try {
        await fetchData.patch(`/products/${params.id}/reviews/${id}`, data);
        queryClient.invalidateQueries({
          queryKey: ["singleProduct", params.id],
        });
        toast.success(`Review updated`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
      return redirect(`/products/${params.id}`);
    }
    if (action === "delete") {
      try {
        await fetchData.delete(`/products/${params.id}/reviews/${id}`, data);
        queryClient.invalidateQueries({
          queryKey: ["singleProduct", params.id],
        });
        toast.success(`Review deleted`);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
      return redirect(`/products/${params.id}`);
    }
  };

const SingleProduct = () => {
  // useLocation hook to get the order ID from URL
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { product, hasOrdered } = useQuery(singleProductQuery(id)).data;
  const { products: similarProducts } = useQuery(
    similarProductsQuery(product.subcategory)
  ).data;

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

  // useState hook to save the quantity from select input which will be submitted when clicked on Add to Cart button
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  // add product and quantity to cart
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
              className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] 2xl:w-[500px] 2xl:h-[500px] rounded-xl place-self-center"
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
                ${price.toFixed(2)}
              </p>
              <div className="mt-2">
                <select
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantity}
                  className="bg-secondary h-9 w-20 rounded-xl text-center font-semibold"
                >
                  {generateSelectOptions(10)}
                </select>
                <Button onClick={handleClick} className="ml-4 text-base">
                  Add to Cart
                </Button>
              </div>
              <Separator className="mt-4 mb-2" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2 px-2">
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
      <Separator className="mt-2 lg:mt-2" />
      <SimilarProducts similarProducts={similarProducts} />
      <Reviews
        key={reviews}
        id={reviews}
        reviews={reviews}
        hasOrdered={hasOrdered}
      />
    </div>
  );
};

export default SingleProduct;
