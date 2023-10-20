import { Featured, Hero, Categories, MaxDiscount } from "@/components";

const LandingPage = () => {
  return (
    <div className="px-2 mx-auto w-full md:max-w-[80vw]">
      <Hero />
      <Featured />
      <MaxDiscount />
      <Categories />
    </div>
  );
};

export default LandingPage;
