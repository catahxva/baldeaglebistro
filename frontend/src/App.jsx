import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Root from "./components/pages/Root";
import RootAuth from "./components/pages/RootAuth";
import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Payment from "./components/pages/Payment";
import OrderSuccess from "./components/pages/OrderSuccess";
import Overview from "./components/pages/Overview";
import Search from "./components/pages/Search";
import Signup from "./components/pages/Signup";
import VerifyAccount from "./components/pages/VerifyAccount";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetForgotPass from "./components/pages/ResetForgotPass";
import Account from "./components/pages/Account";

import { queryClient } from "./util/queryClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/products/:category?",
        element: <Overview />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "/auth",
    element: <RootAuth />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "verify/:token",
        element: <VerifyAccount />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "reset-forgot/:token",
        element: <ResetForgotPass />,
      },
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
