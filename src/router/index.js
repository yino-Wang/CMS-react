//router setting
import { AuthRoute } from '../components/AuthRoute'
import Layout from '../pages/Layout'
import Login from '../pages/Login'
import {createBrowserRouter} from 'react-router-dom'
import Create from '../pages/Create'
import Article from '../pages/Article'
import Home from '../pages/Home'
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute>
                    <Layout></Layout>
                </AuthRoute>,
        children: [
            {
                index: true,              // 默认二级路由
                element: <Home></Home>
            },
            {
                path: "home",
                element: <Home></Home>
            },
            {
                path: "article",
                element: <Article></Article>
            },
            {
                path: "create",
                element: <Create></Create>
            }
        ]
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