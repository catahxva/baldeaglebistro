import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/pages/Root";
import Home from "./components/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
