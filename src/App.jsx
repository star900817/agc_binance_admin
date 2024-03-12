import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Auth/Login';
import { ErrorPage } from './pages/Main/Error-Page';
import { ForgetPassword } from './pages/Auth/ForgetPassword';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { SidePanel } from './pages/Main/SidePanel';
import { Dashboard } from './pages/Main/Dashboard';
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
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <Users />,
        },
        {
          path: 'collections',
          element: <Collections />,
        },
        {
          path: 'categories',
          element: <Categories />,
        },
        {
          path: 'giftcards',
          element: <CombinedGiftList />,
        },
        {
          path: 'selectedgiftcards',
          element: <SelectedGiftCards />,
        },
        {
          path: 'bitaqatygiftcard',
          element: <BitaqatyGiftCards />,
        },
        {
          path: 'binance',
          element: <Binance />,
        },
        {
          path: 'binanceOrders',
          element: <BinanceOrders />,
        },
        {
          path: 'cmsManagement',
          element: <Cms />,
        },
        {
          path: 'orders',
          element: <Order />,
        },
        {
          path: 'customers',
          element: <Customer />,
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
