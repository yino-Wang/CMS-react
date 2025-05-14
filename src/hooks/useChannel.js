//封装获取频道列表的逻辑
import { useState, useEffect } from "react"
import { getChannelAPI } from '../apis/article'
function useChannel(){
    //1.获取频道列表所有逻辑
        //获取频道列表
        const [channelList,setChannelList] = useState([])
    
        useEffect(() => {
          const getChannelList = async () => {
            try {
              const res = await getChannelAPI()
              const channels = res?.data?.data?.channels  // ✅ 多层嵌套取出数据
        
              if (channels && Array.isArray(channels)) {
                setChannelList(channels)
              } else {
                console.warn('频道列表返回为空或格式异常:', res)
                setChannelList([])
              }
            } catch (error) {
              if (error.response && error.response.status) {
                console.error('频道列表请求失败，状态码:', error.response.status)
              } else {
                console.error('频道请求网络错误:', error.message)
              }
              setChannelList([])
            }
          }
        
          getChannelList()
        }, [])
    //2.把组件中要用到的数据return出去
    return{
        channelList
    }
}

export {useChannel}