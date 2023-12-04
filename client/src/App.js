import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useSelector } from "react-redux";
import PaymentCancel from "./pages/PaymentCancel";
import UserDetail from "./components/UserDetail";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const Layout = () => {
    return (
      <>
        <Announcement />
        <Navbar />
        <Outlet />
        <NewsLetter />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products/:category",
          element: <ProductList />,
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
          path: "/my-details/:id",
          element: <UserDetail />,
        },
        {
          path: "/paymentsuccess",
          element: <PaymentSuccess />,
        },
        {
          path: "/cancel",
          element: <PaymentCancel />,
        },
      ],
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
