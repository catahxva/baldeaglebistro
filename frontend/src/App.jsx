import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Root from "./components/pages/Root";
import Home from "./components/pages/Home";
import Categories from "./components/pages/Categories";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Payment from "./components/pages/Payment";
import OrderSuccess from "./components/pages/OrderSuccess";
import Search from "./components/pages/Search";

import { queryClient } from "./util/queryClient";
import Overview from "./components/pages/Overview";

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
    ],
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
