import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { useChannel } from '../../hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '../../apis/article'
import { delArticleAPI } from '../../apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const navigate = useNavigate()
    const {channelList} = useChannel()
    const status = {
        1: <Tag color='warning'>unapproved</Tag>,
        2: <Tag color='success'>Approved</Tag>
    }
     // 准备列数据
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      //data - 后端返回的状态status 根据它做条件渲染 
      //根据接口看下格式 data === 1 => unapproved
      // data === 2 => approved
      render: data => status[data]
    },
    {
      title: 'Publish Time',
      dataIndex: 'pubdate'
    },
    {
      title: 'Readings',
      dataIndex: 'read_count'
    },
    {
      title: 'Comments',
      dataIndex: 'comment_count'
    },
    {
      title: 'Likes',
      dataIndex: 'like_count'
    },
    {
      title: 'Operation',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/create?id=${data.id}`)}/>
            <Popconfirm 
              title = "Delete the task"
              description = "Are you sure to delete?"
              onConfirm={() => onConfirm(data)}
              okText = "Yes"
              cancelText = "No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'A demo....'
    }
  ]

  //筛选功能实现
  //1.准备参数 根据接口文档对应
  const [reqData, setReqData] = useState({
    status:'',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4,
  })

  //获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getList(){
        const res = await getArticleListAPI(reqData)
        console.log('文章列表接口返回:', res)
        const results = res?.data?.data?.results
        setArticleList(Array.isArray(results) ? results : [])
        const total = res?.data?.data?.total_count
        setCount(total)
    }
    getList()
  }, [reqData])

  //2.获取当前的筛选数据
const onFinish = (formValue) => {
  console.log("formvalue: " + formValue)
  //3.把表单收集到的数据放到参数中
  setReqData({
    ...reqData,
    channel_id: formValue.channel_id,
    status: formValue.status,
    begin_pubdate: formValue.date?.[0]?.format('YYYY-MM-DD') || '',
    end_pubdate: formValue.date?.[1]?.format('YYYY-MM-DD') || '',
  })
  //4.重新拉取文章列表+ 渲染table 逻辑是重复的 要复用
  //reqData依赖项发生变化 重复执行副作用函数useeffect
}

  //分页逻辑
  const onPageChange = (page) => {
    console.log(page)
    //修改参数依赖项 引发数据的重新获取列表渲染
    setReqData({
      ...reqData,
      page
    })
  }

  //删除task逻辑
  const onConfirm = async(data) => {
    await delArticleAPI(data.id)
    //删除后重新渲染列表： 修改参数依赖项 引发数据的重新获取列表渲染
    setReqData({
      ...reqData,
    })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Dashboard</Link> },
            { title: 'Article List' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}> {/*onfinish获取用户选择的表单数据 */}
          <Form.Item label="status" name="status">
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={1}>Unapproved</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select article channel"
              defaultValue="lucy"
              style={{ width: 120 }}
            >
                {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            {/* 传入locale属性 控制中文显示*/}
            {<RangePicker></RangePicker>}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
        {/*表格区域*/}
    <Card title={`${count} results were found:`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{
          total: count,
          pageSize: reqData.per_page, //每页条数
          onChange: onPageChange
        }} />
      </Card>
    </div>

  )
}

export default Article