import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/queryClient";

import Root from "./components/pages/Root";
import RootAuth from "./components/pages/RootAuth";
import Placeholder from "./components/UI/Others/Placeholder";

const Home = lazy(() => import("./components/pages/Home"));
const Categories = lazy(() => import("./components/pages/Categories"));
const Product = lazy(() => import("./components/pages/Product"));
const Cart = lazy(() => import("./components/pages/Cart"));
const Checkout = lazy(() => import("./components/pages/Checkout"));
const Payment = lazy(() => import("./components/pages/Payment"));
const OrderSuccess = lazy(() => import("./components/pages/OrderSuccess"));
const Overview = lazy(() => import("./components/pages/Overview"));
const Search = lazy(() => import("./components/pages/Search"));
const Signup = lazy(() => import("./components/pages/Signup"));
const VerifyAccount = lazy(() => import("./components/pages/VerifyAccount"));
const Login = lazy(() => import("./components/pages/Login"));
const Logout = lazy(() => import("./components/pages/Logout"));
const ForgotPassword = lazy(() => import("./components/pages/ForgotPassword"));
const ResetForgotPass = lazy(() =>
  import("./components/pages/ResetForgotPass")
);
const Account = lazy(() => import("./components/pages/Account"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Payment />
          </Suspense>
        ),
      },
      {
        path: "/order-success",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <OrderSuccess />
          </Suspense>
        ),
      },
      {
        path: "/products/:category?",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Account />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <RootAuth />,
    children: [
      {
        path: "signup",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "verify/:token",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <VerifyAccount />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "forgot",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-forgot/:token",
        element: (
          <Suspense fallback={<Placeholder type="loading" />}>
            <ResetForgotPass />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/logout",
    element: (
      <Suspense fallback={<Placeholder type="loading" />}>
        <Logout />
      </Suspense>
    ),
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
