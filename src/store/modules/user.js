//和用户相关的状态管理
import {createSlice} from '@reduxjs/toolkit'
import {getToken, request} from '../../utils'
import { _setToken, removeToken } from '../../utils/token'
import { act } from 'react'

const userStore = createSlice({
    name: "user",
    //数据状态
    initialState:{
        token: getToken() || '',
        userInfo: {} //user info in the header
    },
    //同步修改方法
    reducers:{
        setToken(state,action){
            state.token = action.payload
            //token持久化
            _setToken(action.payload)
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

//解构
const {setToken} = userStore.actions
const {setUserInfo} = userStore.actions
const {clearUserInfo} = userStore.actions
//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token loginForm是要提交给后端的用户登录信息
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //发送异步请求
        /*Axios 会自动把这个对象放进请求体（body）里，发给后端。
        后端会根据 mobile 和 code 判断你是否是合法用户，验证成功就返回一个 token */
       const res = await request.post('/authorizations', loginForm)
        //提交同步action进行token的存入
        dispatch(setToken(res.data.token))
    }
}
//获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

export { setToken , fetchLogin, fetchUserInfo, clearUserInfo }
export default userReducer