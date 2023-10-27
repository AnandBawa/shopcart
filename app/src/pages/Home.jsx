import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loading, Navbar } from "@/components";
import fetchData from "@/lib/fetchData";

const maxDiscountQuery = {
  queryKey: ["maxDiscount"],
  queryFn: async () => {
    const { data } = await fetchData.get("/products/max-discount");
    return data;
  },
};

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await fetchData.get("/users/current-user");
    return data;
  },
};

export const homeLoader = (queryClient) => async () => {
  try {
    const userData = await queryClient.ensureQueryData(userQuery);
    const maxDiscountData = await queryClient.ensureQueryData(maxDiscountQuery);
    return null;
  } catch (error) {
    return error;
  }
};

const HomeContext = createContext();

export const baseCart = {
  items: [],
  totalQuantity: 0,
  baseTotal: 0,
  tax: 10,
  taxAmount: 0,
  shippingCost: 5,
  total: 0,
};

const Home = ({ queryClient }) => {
  const { user } = useQuery(userQuery).data;
  const maxDiscountProducts = useQuery(maxDiscountQuery).data.products;

  const [cart, setCart] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : baseCart
  );

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const logout = async () => {
    await fetchData.post("/logout");
    queryClient.invalidateQueries();
    navigate("/");
    toast.success("Logging out...");
  };

  const addItem = (product, quantity) => {
    const updatedCart = { ...cart };
    const checkItemInCart = updatedCart.items.find(
      (cartItem) => cartItem.product._id === product._id
    );
    if (checkItemInCart) {
      updatedCart.items = updatedCart.items.map((cartItem) =>
        cartItem.product._id === product._id
          ? {
              product: cartItem.product,
              quantity: cartItem.quantity + Number(quantity),
            }
          : cartItem
      );
    } else {
      updatedCart.items.push({ product, quantity });
    }
    calculateCartTotals(updatedCart);
    toast.success(`${quantity} unit${quantity > 1 ? "s" : ""} added to cart`);
  };

  const editItem = (id, quantity) => {
    const updatedCart = { ...cart };
    updatedCart.items = updatedCart.items.map((cartItem) =>
      cartItem.product._id === id
        ? {
            product: cartItem.product,
            quantity: Number(quantity),
          }
        : cartItem
    );
    calculateCartTotals(updatedCart);
    toast.success(`Quantity updated`);
  };

  const removeItem = (id) => {
    const updatedCart = { ...cart };
    updatedCart.items = updatedCart.items.filter(
      (cartItem) => cartItem.product._id !== id
    );
    calculateCartTotals(updatedCart);
    toast.success(`Product removed from cart`);
  };

  const clearCart = () => {
    setCart(baseCart);
    toast.success(`Cart cleared`);
  };

  const calculateCartTotals = (cart) => {
    const updatedCart = { ...cart };
    updatedCart.totalQuantity = updatedCart.items.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    updatedCart.baseTotal = updatedCart.items.reduce(
      (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
      0
    );
    updatedCart.taxAmount = (updatedCart.baseTotal * updatedCart.tax) / 100;
    updatedCart.total =
      updatedCart.baseTotal + updatedCart.taxAmount + updatedCart.shippingCost;
    setCart({ ...updatedCart });
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
    <HomeContext.Provider value={{ user, logout, cart }}>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Outlet
          context={{
            user,
            maxDiscountProducts,
            addItem,
            editItem,
            removeItem,
            clearCart,
            cart,
          }}
        />
      )}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);

export default Home;
