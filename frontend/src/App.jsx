import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/authSlice";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/queryClient";

import Root from "./components/pages/Root";
import RootAuth from "./components/pages/RootAuth";
import Placeholder from "./components/UI/Others/Placeholder";

const Error = lazy(() => import("./components/pages/Error"));
const Home = lazy(() => import("./components/pages/Home"));
const Categories = lazy(() => import("./components/pages/Categories"));
const Product = lazy(() => import("./components/pages/Product"));
const Cart = lazy(() => import("./components/pages/Cart"));
const Checkout = lazy(() => import("./components/pages/Checkout"));
const Payment = lazy(() => import("./components/pages/Payment"));
const OrderSuccess = lazy(() => import("./components/pages/OrderSuccess"));
const Order = lazy(() => import("./components/pages/Order"));
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
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "/payment",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Payment />
          </Suspense>
        ),
      },
      {
        path: "/order-success",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <OrderSuccess />
          </Suspense>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Order />
          </Suspense>
        ),
      },
      {
        path: "/products/:category?",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
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
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "verify/:token",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <VerifyAccount />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "forgot",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-forgot/:token",
        element: (
          <Suspense fallback={<Placeholder type="loading" size="page" />}>
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
  const dispatch = useDispatch();

  const expirationDate = useSelector((state) => state.auth.expirationDate);

  useEffect(() => {
    const expirationTime = new Date(expirationDate);
    const currentTime = new Date();

    let timer;

    if (currentTime > expirationTime) dispatch(authActions.deauthenticate());

    if (expirationTime > currentTime) {
      const timeDifference = expirationTime - currentTime;

      timer = setTimeout(() => {
        dispatch(authActions.deauthenticate());
      }, timeDifference);
    }

    return () => clearTimeout(timer);
  }, [expirationDate]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
