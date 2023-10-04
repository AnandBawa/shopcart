import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import fetchData from "@/utils/fetchData";
import { Navbar } from "@/components";

export const homeLoader = async () => {
  try {
    const { data } = await fetchData.get("/users/current-user");
    return data;
  } catch (error) {
    return error;
  }
};

const HomeContext = createContext();

const Home = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const logout = async () => {
    await fetchData.post("/logout");
    navigate("/");
    toast.success("Logging out...");
  };

  return (
    <HomeContext.Provider value={{ user, logout }}>
      <Navbar />
      <Outlet context={{ user }} />
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Home;
