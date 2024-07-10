import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import routes from ".";
import AuthProvider from "./store/AuthProvider";
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: "login", element: <routes.Login /> },
      { path: "signup", element: <routes.Register /> },
      { path: "cart", element: <routes.Cart /> },
      { path: "search", element: <routes.Search /> },
      { path: "account", element: <routes.Account /> },
      { path: ":productId", element: <routes.Product /> },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
