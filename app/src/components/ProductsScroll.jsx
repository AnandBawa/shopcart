import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const ProductsScroll = ({ products }) => {
  const ref = useRef(null);
  let scrollRef = {};

  useEffect(() => {
    scrollRef = ref.current.childNodes[1];
    scrollRef.style.scrollBehavior = "smooth";
  }, []);

  const scroll = (scrollOffset) => {
    scrollRef.style.scrollBehavior = "smooth";
    scrollRef.scrollLeft += scrollOffset;
  };

  return (
    <ScrollArea ref={ref}>
      <div className="flex gap-4 static">
        {products.map((product) => {
          const { _id, name, category, subcategory, price, origPrice, images } =
            product;
          const discount = Math.floor(((origPrice - price) * 100) / origPrice);
          return (
            <Link to={`/products/${_id}`} key={_id} className="space-y-3">
              <div className="overflow-hidden rounded-xl w-[200px] h-[200px] xl:w-[300px] xl:h-[300px] relative">
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
              <div className="grid grid-cols-3 items-center">
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
                  {product.type
                    ? `${product.type} / ${subcategory}`
                    : `${subcategory}`}{" "}
                  / {category}
                </div>
              </div>
            </Link>
          );
        })}
        <Button
          variant="ghost"
          className="justify-start h-20 w-20 absolute left-0 top-[4rem] xl:top-[6rem] p-0 m-0 transition-all ease-in hover:bg-transparent hover:scale-125 overflow:visible"
          onClick={() => scroll(-200)}
        >
          <ChevronLeft className="h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 text-primary hover:bg-secondary" />
        </Button>
        <Button
          variant="ghost"
          className="justify-end h-20 w-20 absolute right-0 top-[4rem] xl:top-[6rem] p-0 m-0 transition-all ease-in hover:bg-transparent hover:scale-125"
          onClick={() => scroll(200)}
        >
          <ChevronRight className="h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 text-primary hover:bg-secondary" />
        </Button>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ProductsScroll;
