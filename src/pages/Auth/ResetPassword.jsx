import { Form, Input, Button, Space } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const otp = searchParams.get("otp");
  const email = searchParams.get("email");

  const onFinish = async (values) => {
    try {
      const password = values.password;
      const confirmPassword = values.confirmPassword;

      if (password !== confirmPassword) {
        return toast.error("Password confirmation failed");
      }

      const res = await axios.post(
        `${url}/verifyOtpWithPasswordChange`,
        { otp: otp, email: email, newPassword: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form_container">
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Reset Password</h3>
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
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
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Space>
                <div className="loginBtm">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Change Password
                  </Button>
                </div>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
