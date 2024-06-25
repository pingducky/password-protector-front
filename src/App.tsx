import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from "./pages/ChangePassword.tsx";

const router = createBrowserRouter(
    [
        {
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: '/',
                    element: <Dashboard/>
                },
                {
                    path: '/register',
                    element: <Register/>
                },
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/dashboard',
                    element: <Dashboard/>
                },
                {
                    path: '/resetPassword',
                    element: <ResetPassword/>
                },
                {
                    path: '/reset-password',
                    element: <ChangePassword/>
                }
            ]
        }
    ]
);

function Root() {
    return (
        <div>
            <Outlet/>
        </div>
    )
}

export default function App() {
    return (
        <RouterProvider router={router}/>
    );
}
