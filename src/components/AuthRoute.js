//封装高阶组件
//有token 正常跳转 没有强制登录页

import { Navigate } from "react-router-dom";
import { getToken } from "../utils";

export function AuthRoute({children}){
    const token = getToken()
    if(token){
        return <>{children}</>
    }else{
        return <Navigate to={'/login'} replace></Navigate> //重定向到login page
    }
    /*replace 的作用是：

    用跳转后的路径（如 /login）替换掉当前这条历史记录，
    而不是在浏览器历史栈中新增一条记录。
    有 replace： 用户点击浏览器“返回”按钮，不会回到受保护的页面（
        因为它已经被替换掉了）。
    没有 replace： 用户点“返回”会回到原页面（哪怕没有权限） */
}