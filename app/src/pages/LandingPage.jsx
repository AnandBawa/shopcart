import { Featured, Hero, Categories } from "@/components";

const LandingPage = () => {
  return (
    <div className="mx-auto w-full md:max-w-[80vw]">
      <Hero />
      <Featured />
      <Categories />
    </div>
  );
};

export default LandingPage;
