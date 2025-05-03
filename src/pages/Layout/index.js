import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo,clearUserInfo } from '../../store/modules/user'
import { removeToken } from '../../utils'


const { Header, Sider } = Layout

const items = [
  {
    label: 'Dashboard',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Article Management',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Create Articles',
    key: '/create',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
    const navigate = useNavigate()

    const onMenuClick = (route) => { //route 是 Ant Design Menu 的点击事件参数对象，包含你点击的菜单项的信息
    const path = route.key
    navigate(path)
    }

    //自动高亮当前路由项
    const location = useLocation() //它用于获取当前路由的路径、参数、状态等信息。
    const currentPath = location.pathname

    //触发个人用户信息action
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    },[dispatch])

    //get user info using useselector
    const userName = useSelector(state => state.user.userInfo.mobile)

    //exit => logout 1.退出清除token和其他userinfo 2.跳到login
    const logout = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }
    return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-logout">
            <Popconfirm title="Are you sure to exit？" okText="Exit" cancelText="Cancel" onConfirm={logout}>
              <LogoutOutlined /> Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={currentPath} //现在哪个菜单项应该被“选中”并高亮显示。
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/*二级路由出口*/}
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout