import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '../../assets/error.png'
import { useChannel } from '../../hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '../../apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
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
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
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

  //获取文章列表
  const [articleList, setArticleList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getList(){
        const res = await getArticleListAPI()
        console.log('文章列表接口返回:', res)
        const results = res?.data?.data?.results
        setArticleList(Array.isArray(results) ? results : [])
        const total = res?.data?.data?.total_count
        setCount(total)
    }
    getList()
  }, [])
  
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
        <Form initialValues={{ status: '' }}>
          <Form.Item label="status" name="status">
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={0}>Draft</Radio>
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
        <Table rowKey="id" columns={columns} dataSource={articleList} />
      </Card>
    </div>

  )
}

export default Article