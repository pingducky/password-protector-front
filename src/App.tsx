import './App.css'
import '@mantine/core/styles.css';
import Login from './pages/Login';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter(
  [
    {
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
      ]
    }
  ]
);

function Root() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
