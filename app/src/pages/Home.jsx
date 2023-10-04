import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import fetchData from "@/utils/fetchData";
import { Navbar } from "@/components";

export const homeLoader = async () => {
  try {
    const { data } = await fetchData.get("/users/current-user");
    const { user } = data;
    const response = await fetchData.get("/products");
    const { products } = response.data;
    return { user, products };
  } catch (error) {
    return error;
  }
};

const HomeContext = createContext();

const Home = () => {
  const { user, products } = useLoaderData();
  const navigate = useNavigate();

  const logout = async () => {
    await fetchData.post("/logout");
    navigate("/");
    toast.success("Logging out...");
  };

  return (
    <HomeContext.Provider value={{ logout }}>
      <Navbar />
      <Outlet context={{ user, products }} />
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Home;
