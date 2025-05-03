//router setting
import { AuthRoute } from '../components/AuthRoute'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import {createBrowserRouter} from 'react-router-dom'
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute>
                    <Layout></Layout>
                </AuthRoute>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: '*',
        element: <div>404 Not Found</div>
      }
])

export default router