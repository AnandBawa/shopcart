import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Featured = () => {
  const products = useLoaderData();
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
    <div className="px-4 lg:py-8">
      <SectionTitle text="Featured Parts" />
      <ScrollArea ref={ref} className="">
        <div className="flex gap-4 static items-center">
          <Button
            variant="ghost"
            className="justify-start h-20 w-20 bg-secondary absolute left-0 p-0 m-0 transition-all ease-in bg-transparent hover:bg-transparent hover:scale-125 overflow:visible"
            onClick={() => scroll(-200)}
          >
            <ChevronLeft className="h-10 w-10 lg:h-14 lg:w-14 text-primary hover:bg-secondary" />
          </Button>
          {products.map((product) => {
            const { _id, name, category, subcategory, price, images } = product;
            return (
              <Link to={`/products/${_id}`} key={_id} className="space-y-3">
                <div className="overflow-hidden rounded-xl w-[200px] h-[200px] xl:w-[300px] xl:h-[300px]">
                  <img
                    src={images[0].url}
                    alt={name}
                    className="overflow h-full w-full transition-all hover:scale-110"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1 items-center">
                  <div className=" col-span-3">
                    <h2 className="capitalize truncate font-semibold">
                      {name}
                    </h2>
                    <Separator className="my-1" />
                  </div>
                  <div className="font-semibold tracking-wide text-primary mb-4">
                    ${price}
                  </div>
                  <div className=" col-span-2 font-semibold text-sm truncate mb-4">
                    {subcategory} / {category}
                  </div>
                </div>
              </Link>
            );
          })}
          <Button
            variant="ghost"
            className="justify-end h-20 w-20 bg-secondary absolute right-0 p-0 m-0 transition-all ease-in bg-transparent hover:bg-transparent hover:scale-125"
            onClick={() => scroll(200)}
          >
            <ChevronRight className="h-10 w-10 lg:h-14 lg:w-14 text-primary hover:bg-secondary" />
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Featured;
