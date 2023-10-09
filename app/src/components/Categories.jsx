import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { SUB_CATEGORY } from "@/lib/constants";

const Categories = () => {
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
    <div className="px-4">
      <SectionTitle text="Shop by Category" />
      <ScrollArea ref={ref}>
        <div className="flex gap-4 mt-2">
          {Object.values(SUB_CATEGORY)
            .sort()
            .map((sub) => {
              return (
                <Link
                  to={`/products?subcategory="${sub}"`}
                  key={sub}
                  className="space-y-3"
                >
                  <div className="overflow-hidden rounded-xl w-[200px] h-[200px] mb-4">
                    <Button
                      variant="secondary"
                      className="overflow h-full w-full transition-all ease-in duration-200 hover:scale-110 text-xl tracking-wide hover:text-primary"
                    >
                      {sub}
                    </Button>
                  </div>
                </Link>
              );
            })}
          <Button
            variant="ghost"
            className="justify-start h-20 w-20 absolute left-0 top-[4rem] p-0 m-0 transition-all ease-in hover:bg-transparent hover:scale-125"
            onClick={() => scroll(-200)}
          >
            <ChevronLeft className="h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 text-primary hover:bg-secondary" />
          </Button>
          <Button
            variant="ghost"
            className="justify-end h-20 w-20 absolute right-0 top-[4rem] p-0 m-0 transition-all ease-in hover:bg-transparent hover:scale-125"
            onClick={() => scroll(200)}
          >
            <ChevronRight className="h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 text-primary hover:bg-secondary" />
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Categories;
