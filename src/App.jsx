import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Auth/Login';
import { ErrorPage } from './pages/Main/Error-Page';
import { ForgetPassword } from './pages/Auth/ForgetPassword';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { SidePanel } from './pages/Main/SidePanel';
import { Users } from './pages/Main/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProjectedRoutes';
import Categories from './pages/Main/Categories';
import Collections from './pages/Main/Collections';
import CombinedGiftList from './pages/Main/CombinedGiftList/CombinedGiftList';
import SelectedGiftCards from './pages/Main/SelectedGiftCards';
import BitaqatyGiftCards from './pages/Main/BitaqatyGiftCards';
import Binance from './pages/Main/Binance/Binance';
import Cms from './pages/Main/CMS/Cms';
import Unauthorized from './pages/Main/Unauthorized';
import Order from './pages/Main/Order/Order';
import Customer from './pages/Main/Customer/Customer';
import BinanceOrders from './pages/Main/BinanceOrders/BinanceOrders';
import Dashboard from './pages/Main/Dashboard';

function App() {  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/forgetPassword',
      element: <ForgetPassword />,
    },
    {
      path: '/resetPassword',
      element: <ResetPassword />,
    },
    {
      path: '/main',
      element: (
        <ProtectedRoute>
          {' '}
          <SidePanel />{' '}
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'dashboard',
          element:<ProtectedRoute><Dashboard /></ProtectedRoute> ,
        },
        {
          path: 'users',
          element: <ProtectedRoute><Users /></ProtectedRoute>,
        },
        {
          path: 'collections',
          element: <ProtectedRoute><Collections /></ProtectedRoute>,
        },
        {
          path: 'categories',
          element: <ProtectedRoute><Categories /></ProtectedRoute>,
        },
        {
          path: 'giftcards',
          element:<ProtectedRoute><CombinedGiftList /></ProtectedRoute> ,
        },
        {
          path: 'selectedgiftcards',
          element: <ProtectedRoute><SelectedGiftCards /></ProtectedRoute>,
        },
        {
          path: 'bitaqatygiftcard',
          element:<ProtectedRoute> <BitaqatyGiftCards /></ProtectedRoute>,
        },
        {
          path: 'binance',
          element: <ProtectedRoute><Binance /></ProtectedRoute>,
        },
        {
          path: 'binanceOrders',
          element: <ProtectedRoute><BinanceOrders /></ProtectedRoute>,
        },
        {
          path: 'cmsManagement',
          element: <ProtectedRoute><Cms /></ProtectedRoute>,
        },
        {
          path: 'orders',
          element:<ProtectedRoute><Order /></ProtectedRoute> ,
        },
        {
          path: 'customers',
          element: <ProtectedRoute><Customer /></ProtectedRoute>,
        },
        {
          path: 'unauthorized',
          element: <Unauthorized />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      
      <RouterProvider router={router} />
    </>
  );
}

export default App;
