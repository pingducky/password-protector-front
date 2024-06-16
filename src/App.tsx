import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';

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
