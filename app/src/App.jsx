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
import { singleProductLoader } from "./pages/SingleProduct";

// Actions
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";

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
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <SingleOrder />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "address-book",
        element: <AddressBook />,
      },
      {
        path: "payment-methods",
        element: <Payments />,
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
