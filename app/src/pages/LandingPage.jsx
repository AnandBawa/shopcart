import { Featured, Hero, Categories } from "@/components";
import fetchData from "@/utils/fetchData";

export const landingLoader = async () => {
  const response = await fetchData.get("/products");
  const { products } = response.data;
  return products;
};

const LandingPage = () => {
  return (
    <div className="mx-auto w-full md:max-w-[90vw]">
      <Hero />
      <Featured />
      <Categories />
    </div>
  );
};

export default LandingPage;
