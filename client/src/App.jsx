import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import routes from '.';
import AuthProvider from './store/AuthProvider';
import './index.css';
import Footer from './components/Footer/Footer';
import axios from 'axios';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { index: true, element: <routes.Home /> },
      { path: 'login', element: <routes.Login /> },
      { path: 'signup', element: <routes.Register /> },
      { path: 'cart', element: <routes.Cart /> },
      { path: 'checkout', element: <routes.Checkout/> },
      { path: 'search', element: <routes.Search /> },
      { path: 'account', element: <routes.Account /> },
      { path: 'product/:productId', element: <routes.Product /> },
    ],
  },
]);

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});
axiosInstance.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  );
};

export default App;
