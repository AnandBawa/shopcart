import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import fetchData from "@/utils/fetchData";
import { Loading, Navbar } from "@/components";

export const homeLoader = async () => {
  try {
    const { data } = await fetchData.get("/users/current-user");
    const { user } = data;
    const response1 = await fetchData.get("/products");
    const featured = response1.data.products;
    const response2 = await fetchData.get("/products/max-discount");
    const maxDiscount = response2.data.products;
    return { user, featured, maxDiscount };
  } catch (error) {
    return error;
  }
};

const HomeContext = createContext();

const Home = () => {
  const { user, featured, maxDiscount } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const logout = async () => {
    await fetchData.post("/logout");
    navigate("/");
    toast.success("Logging out...");
  };

  return (
    <HomeContext.Provider value={{ logout }}>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Outlet context={{ user, featured, maxDiscount }} />
      )}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Home;
