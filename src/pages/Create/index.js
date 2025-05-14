import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill'
  import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '../../apis/article'
  
  const { Option } = Select
  
  const Create = () => {
    //获取频道列表
    const [channelList,setChannelList] = useState([])
/*    useEffect(() => {
      const getChannelList = async () => {
        try {
          const res = await getChannelAPI()
          if (res?.data?.channels) {
            setChannelList(res.data.data.channels)
          } else {
            console.warn('频道列表返回为空或格式异常:', res)
          }
        } catch (error) {
          if (error.response && error.response.status) {
            console.error('频道列表请求失败，状态码:', error.response.status)
          } else {
            console.error('频道请求网络错误:', error.message)
          }
        }
      }
    
      getChannelList()
    }, [])    */
    useEffect(() => {
      const getChannelList = async () => {
        try {
          const res = await getChannelAPI()
          const channels = res?.data?.data?.channels  // ✅ 多层嵌套取出数据
    
          if (channels && Array.isArray(channels)) {
            setChannelList(channels)
          } else {
            console.warn('频道列表返回为空或格式异常:', res)
          }
        } catch (error) {
          if (error.response && error.response.status) {
            console.error('频道列表请求失败，状态码:', error.response.status)
          } else {
            console.error('频道请求网络错误:', error.message)
          }
        }
      }
    
      getChannelList()
    }, [])
     

    //提交表单
    const onFinish = async (formValue) => {
      const { title, content, channel_id } = formValue
      const reqData = {
        title,
        content,
        cover: {
          type: imageType,
          images: imageList.map(item => item.response.data.url),
        },
        channel_id
      }
    
      try {
        const res = await createArticleAPI(reqData)
        if (res?.status === 201) {
          console.log('发布成功')
        } else {
          console.warn('文章发布返回异常:', res)
        }
      } catch (error) {
        if (error.response && error.response.status) {
          console.error('发布失败，状态码:', error.response.status)
        } else {
          console.error('发布请求网络错误:', error.message)
        }
      }
    }
    

    //上传回调
    const [imageList, setImageList] = useState([])
    const onChange = (value) =>{
      setImageList(value.fileList)
    }

    //切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
      console.log('change cover',e.target.value)
      setImageType(e.target.value)
    }
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>Dashboard</Link> },
              { title: 'Publish' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 0 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input placeholder="Please input article title" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="Channel"
              name="channel_id"
              rules={[{ required: true, message: 'Please select channel' }]}
            >
              <Select placeholder="Please select channel!" style={{ width: 400 }}>
                {/*value属性 用户选中之后会自动收集起来作为接口的提交字段 */}
                {channelList.map(item => <Option key = {item.id} value = {item.id}>{item.name}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={onTypeChange}>
                  <Radio value={1}>Single picture</Radio>
                  <Radio value={3}>Triple picture</Radio>
                  <Radio value={0}>No picture</Radio>
                </Radio.Group>
              </Form.Item>
              {/**
               * listType: 决定选择文件框的外观样式
               * shouUploadList: 控制显示上传列表
               */}
              {imageType > 0 && 
                            <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'} //配置上传接口地址的
                            onChange={onChange}
                            name='image'
                            maxCount={imageType}
                          >
                            <div style={{ marginTop: 8 }}>
                              <PlusOutlined />
                            </div>
                          </Upload>
              }
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input content' }]}
            >
                <ReactQuill
                    className="publish-quill"
                    theme="snow"
                    placeholder="Please input your post content..." 
                ></ReactQuill>
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  Publish
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Create