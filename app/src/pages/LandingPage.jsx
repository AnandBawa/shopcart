import { Categories, Loading, MaxDiscount } from "@/components";
import { Loader2 } from "lucide-react";
import { lazy, Suspense } from "react";
const Hero = lazy(() => import("@/components"));

// Landing page of the website
const LandingPage = () => {
  return (
    <div className="px-2 mx-auto w-full md:max-w-[80vw]">
      <Suspense
        fallback={
          <div className="grid place-items-center">
            <Loader2 className="text-primary h-24 w-24 animate-spin" />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <MaxDiscount />
      <Categories />
    </div>
  );
};

export default LandingPage;
