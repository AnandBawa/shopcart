import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";

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
          return <ProductCard product={product} key={product._id} />;
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
