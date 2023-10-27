import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loading, Navbar } from "@/components";
import fetchData from "@/lib/fetchData";

// React Query object to fetch top-discounted products
const maxDiscountQuery = {
  queryKey: ["maxDiscount"],
  queryFn: async () => {
    const { data } = await fetchData.get("/products/max-discount");
    return data;
  },
};

// React Query object to fetch current user
const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await fetchData.get("/users/current-user");
    console.log(data);
    return data;
  },
};

// React Router loader to load current user and top-discounted products for landing page use and caching using React Query
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

// an empty cart object
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
  // always check the login state and get current user details
  const { user } = useQuery(userQuery).data;
  const maxDiscountProducts = useQuery(maxDiscountQuery).data.products;

  console.log(user);
  console.log(maxDiscountProducts);

  // useState hook to create and set the cart
  const [cart, setCart] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : baseCart
  );

  // useNavigate hook to navigate pages
  const navigate = useNavigate();

  // useNavigation hook to display the loading animation when navigating pages
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // logout function
  const logout = async () => {
    await fetchData.post("/logout");
    queryClient.invalidateQueries();
    navigate("/");
    toast.success("Logging out...");
  };

  // add product to cart
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

  // update product quantity
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

  // remove product from cart
  const removeItem = (id) => {
    const updatedCart = { ...cart };
    updatedCart.items = updatedCart.items.filter(
      (cartItem) => cartItem.product._id !== id
    );
    calculateCartTotals(updatedCart);
    toast.success(`Product removed from cart`);
  };

  // clear cart
  const clearCart = () => {
    setCart(baseCart);
    toast.success(`Cart cleared`);
  };

  // calculate totals based on the current products in cart
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

  // save the cart object to local storage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect hook to load the cart from storage on initial load
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <HomeContext.Provider value={{ user, logout, cart }}>
      <Navbar />
      {/* display loading animation or pages based on router state */}
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
