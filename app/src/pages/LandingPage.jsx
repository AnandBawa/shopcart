import { Hero, Categories, MaxDiscount } from "@/components";

// Landing page of the website
const LandingPage = () => {
  return (
    <div className="px-2 mx-auto w-full md:max-w-[80vw]">
      <Hero />
      <MaxDiscount />
      <Categories />
    </div>
  );
};

export default LandingPage;
