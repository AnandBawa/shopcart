import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import { ErrorElement } from "./components";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
        action: singleProductAction,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <ErrorElement />,
        loader: ordersLoader,
      },
      {
        path: "orders/:id",
        element: <SingleOrder />,
        errorElement: <ErrorElement />,
        loader: singleOrderLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
        action: profileAction,
      },
      {
        path: "address-book",
        element: <AddressBook />,
        action: addressAction,
      },
      {
        path: "payment-methods",
        element: <Payments />,
        action: paymentAction,
      },
      {
        path: "login",
        element: <Login />,
        // errorElement: <Error />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        // errorElement: <Error />,
        action: registerAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
