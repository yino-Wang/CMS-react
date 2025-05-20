//封装和文章相关的接口函数


import { request } from "../utils";
//获取频道列表

export function getChannelAPI(){
    return request({
        url: '/channels',
        method: 'GET',
    })
}

//
export function createArticleAPI(data){
    return request({
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

//获取文章列表

export function getArticleListAPI(params){
    return request({
        url:"/mp/articles",
        method:'GET',
        params
    })
}

//删除文章
export function delArticleAPI(id){
    return request({
        /*id = 123 时，最终 URL 是 /mp/articles/123
        你在删除某一篇文章时，需要传入这篇文章的 ID，拼接成后端对应的接口地址。 */
        url: `/mp/articles/${id}`,
        method: 'DELETE'
    })
}

//获取文章详情
export function getArticleById(id){
    return request({
        url: `/mp/articles/${id}`,
        method: 'GET'
    })
}