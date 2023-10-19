import {
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
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
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const logout = async () => {
    await fetchData.post("/logout");
    navigate(0);
    toast.success("Logging out...");
  };

  const addItem = (product, quantity) => {
    const checkItemInCart = cart.find(
      (cartItem) => cartItem.product._id === product._id
    );
    if (checkItemInCart) {
      setCart(
        cart.map((cartItem) =>
          cartItem.product._id === product._id
            ? {
                product: cartItem.product,
                quantity: cartItem.quantity + Number(quantity),
              }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
    toast.success(`${quantity} unit${quantity > 1 ? "s" : ""} added to cart`);
  };

  const editItem = (id, quantity) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.product._id === id
          ? {
              product: cartItem.product,
              quantity: Number(quantity),
            }
          : cartItem
      )
    );
    toast.success(`Quantity updated`);
  };

  const removeItem = (id) => {
    setCart(cart.filter((cartItem) => cartItem.product._id !== id));
    toast.success(`Product removed from cart`);
  };

  const clearCart = () => {
    setCart([]);
    toast.success(`Cart cleared successfully`);
  };

  const getCartQuantity = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <HomeContext.Provider value={{ logout, getCartQuantity }}>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Outlet
          context={{
            user,
            featured,
            maxDiscount,
            addItem,
            editItem,
            removeItem,
            clearCart,
            getCartQuantity,
            getCartTotal,
            cart,
          }}
        />
      )}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Home;
