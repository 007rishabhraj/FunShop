import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import routes from "./pages";
import AuthProvider from "./store/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            { index: true, element: <routes.Home /> },
            { path: "login", element: <routes.Login /> },
            { path: "register", element: <routes.Register /> },
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
