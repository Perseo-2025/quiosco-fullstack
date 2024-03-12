import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import AuthLayout from './layouts/AuthLayout'
import Inicio from './view/Inicio'
import Login from './view/Login'    
import Registro from './view/Registro'    
import AdminLayout from './layouts/AdminLayout'
import Ordenes from './view/Ordenes'
import Productos from './view/Productos'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]  
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            },
            {
                path:'/admin/usuarios',
                element: <Ordenes />
            }
        ]
    }
])

export default router