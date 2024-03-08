import { Form, Input, Button, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Auth";
import { toast } from "react-toastify";

export const Login = () => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    let { success, message } = await login(values.email, values.password);
    console.log("data", success, message);
    if (success) {
      toast.success(message);
      navigate("/main/dashboard");
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <div className="form_container">
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Login</h3>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <div className="forget-password ">
              <Link to="/forgetPassword" className="login-form-forgot">
                Forget Password
              </Link>
            </div>
            <Form.Item>
              <Space>
                <div className="loginBtm">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
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
