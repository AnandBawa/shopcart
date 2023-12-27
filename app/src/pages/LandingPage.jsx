import { Categories, Loading, MaxDiscount } from "@/components";
import { lazy, Suspense } from "react";
const Hero = lazy(() => import("@/components"));

// Landing page of the website
const LandingPage = () => {
  return (
    <div className="px-2 mx-auto w-full md:max-w-[80vw]">
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
      <MaxDiscount />
      <Categories />
    </div>
  );
};

export default LandingPage;
