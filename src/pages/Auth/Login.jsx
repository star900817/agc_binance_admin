import { Form, Input, Button, Space, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/Auth';
import { toast } from 'react-toastify';
import '../../css/login.css';
import { useEffect } from 'react';

export const Login = () => {
  let navigate = useNavigate();

  useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            navigate("/main/dashboard")
        } else {
            navigate("/")
        }
  },[])

  const onFinish = async (values) => {
    let { success, message } = await login(values.email, values.password);
    console.log('data', success, message);
    if (success) {
      toast.success(message);
      navigate('/main/dashboard');
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <div className="form_container">
        <div className="card">
          <div className="img-container">
            <img src="/assets/logo1.png" />
            <img src="/assets/logo2.png" />
          </div>
          <h3
            style={{ textAlign: 'center', fontSize: '25px' }}
            className="text-dark-blue"
          >
            Login to Account
          </h3>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                // prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="forget-password ">
              <Link
                to="/forgetPassword"
                className="login-form-forgot text-blue"
              >
                Forget Password
              </Link>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="password-div"
              >
                <Checkbox style={{ marginRight: '5px' }} />
                <span> Remember Password </span>
              </div>
            </div>
            <Form.Item>
              <Space>
                <div className="loginBtm">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button blue-bg-theme"
                  >
                    Sign In
                  </Button>
                </div>

                {/* <a
              className="login-form-forgot"
              onClick={() => navigate("forgetPassword")}
            >
              Forgot password
            </a> */}
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
