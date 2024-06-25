import './App.css'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import ErrorPage from './pages/error/ErrorPage';
import Dashboard from './pages/dashboard/Dashboard';
import Login from "./pages/login/Login.tsx";
import Register from "./pages/login/Register.tsx";
import ResetPassword from "./pages/login/ResetPassword.tsx";
import Detail from "./pages/detail/DetailPanel.tsx";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import SharedPassword from "./pages/detail/SharedPassword.tsx";

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
                    path: '/detail/:id',
                    element: <Detail/>
                },
                {
                    path: '/shared-password',
                    element: <SharedPassword/>
                }
            ]
        }
    ]
);

function Root() {
    return (
        <Outlet/>
    )
}

export default function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}
