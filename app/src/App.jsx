import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  AddressBook,
  Checkout,
  Error,
  Home,
  LandingPage,
  Login,
  Orders,
  Payments,
  Products,
  Profile,
  Register,
  ShoppingCart,
  SingleOrder,
  SingleProduct,
} from "./pages";
import { ErrorComponent } from "@/components";

// Loaders
import { homeLoader } from "./pages/Home";
import { productsLoader } from "./pages/Products";
import { singleProductLoader } from "./pages/SingleProduct";
import { ordersLoader } from "./pages/Orders";
import { singleOrderLoader } from "./pages/SingleOrder";

// Actions
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { addressAction } from "./pages/AddressBook";
import { paymentAction } from "./pages/Payments";
import { profileAction } from "./pages/Profile";
import { checkoutAction } from "./pages/Checkout";
import { singleProductAction } from "./pages/SingleProduct";

// default React Query Client with stale time of 5 mins
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home queryClient={queryClient} />,
    errorElement: <Error />,
    loader: homeLoader(queryClient),
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorComponent />,
        loader: productsLoader(queryClient),
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
        action: singleProductAction(queryClient),
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction(queryClient),
      },
      {
        path: "cart",
        errorElement: <ErrorComponent />,
        element: <ShoppingCart />,
      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <ErrorComponent />,
        loader: ordersLoader(queryClient),
      },
      {
        path: "orders/:id",
        element: <SingleOrder />,
        errorElement: <ErrorComponent />,
        loader: singleOrderLoader(queryClient),
      },
      {
        path: "about",
        errorElement: <ErrorComponent />,
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
        action: profileAction(queryClient),
      },
      {
        path: "address-book",
        element: <AddressBook />,
        action: addressAction(queryClient),
      },
      {
        path: "payment-methods",
        element: <Payments />,
        action: paymentAction(queryClient),
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
