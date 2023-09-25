import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { createContext } from "react";
import { useContext } from "react";

const HomeContext = createContext();

const Home = () => {
  const user = { name: "Anand" };

  const logoutUser = async () => {
    console.log("Logout user");
  };

  return (
    <HomeContext.Provider value={{ user, logoutUser }}>
      <Navbar />
      <Outlet />
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Home;
