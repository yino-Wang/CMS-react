//用户相关所有请求
import { request } from "../utils";
//登录请求
export function loginAPI(loginForm){
    return request({
        url: '/authorizations',
        method: 'POST',
        data: loginForm
    })
}

//获取用户信息
export function getProfileAPI(){
    return request({
        url: '/user/profile',
        method: 'GET',
    })
}