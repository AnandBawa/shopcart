import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";

const subCategories = [
  "Video Cards",
  "CPUs",
  "CPU Coolers",
  "Optical Drives",
  "Memory",
  "Monitors",
  "Storage",
  "Cases",
  "Motherboards",
  "Operating Systems",
  "External Storage",
  "Power Supplies",
  "Speakers",
  "Headphones",
  "Mice",
  "Webcams",
  "Keyboards",
  "Fan Controllers",
  "Case Accessories",
  "Case Fans",
  "Thermal Compound",
  "UPS Systems",
  "Wireless Network Adapters",
  "Sound Cards",
  "Wired Network Adapters",
];

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
        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            className="justify-start h-20 w-20 absolute left-0 p-0 m-0 transition-all ease-in hover:bg-transparent hover:scale-125"
            onClick={() => scroll(-200)}
          >
            <ChevronLeft className="h-10 w-10 lg:h-14 lg:w-14 text-primary" />
          </Button>
          {subCategories.sort().map((sub) => {
            return (
              <Link
                to={`/products?subcategory="${sub}"`}
                key={sub}
                className="space-y-3"
              >
                <div className="overflow-hidden rounded-xl w-[200px] h-[200px] mb-4">
                  <Button
                    variant="secondary"
                    className="overflow h-full w-full transition-all hover:scale-110 text-xl tracking-wide hover:text-primary"
                  >
                    {sub}
                  </Button>
                </div>
              </Link>
            );
          })}
          <Button
            variant="ghost"
            className="justify-end h-20 w-20 absolute right-0 p-0 m-0 transition-all ease-in hover:bg-transparent hover:scale-125"
            onClick={() => scroll(200)}
          >
            <ChevronRight className="h-10 w-10 lg:h-14 lg:w-14 text-primary" />
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default Categories;
