import './index.scss'
import { Card, Form, Input, Button, Checkbox, message} from 'antd'
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin,  } from '../../store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        //触发异步action fetchLogin
        await dispatch(fetchLogin(values))
        //跳转到首页
        navigate('/')
        //提示用户登录成功
        message.success('Login successfully!')

    }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form validateTrigger="onBlur" 
                onFinish={onFinish}
                style={{ maxWidth: 1000 }}>  {/*失焦触发时机 */}
          <Form.Item
            label="Mobile number"
            name="mobile"//顺序校验 第一条通过在校验第二条
                rules={[
                    {
                        required: true,
                        message:"Please input your number!"
                    },{
                      //  pattern: /^0[4-9]\d{8}/,
                        message: "Not a valid phone number"
                    }
                ]}>
            <Input size="large" placeholder="04xxxxxxxx" />
          </Form.Item>
          <Form.Item
            label="Verification code"
            name="code"
                 rules={[
                    {
                       required: true,
                       message:"please input your Verification code!"
                    }
                ]}>
            <Input size="large" placeholder="" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login