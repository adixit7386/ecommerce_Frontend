import Home from "./pages/Home";
import ProductList from "./pages/ProductList.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/products/:category",
      element: <ProductList />,
    },
    { path: "/products", element: <ProductList /> },
    {
      path: "/product/:id",
      element: <Product />,
    },
    {
      path: "/login",
      element: user ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
