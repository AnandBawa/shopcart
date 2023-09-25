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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
