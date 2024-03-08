import { Form, Input, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const ForgetPassword = () => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const email = values.email;
      const res = await axios.post(
        `${url}/getForgetPassVerificationLink`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="form_container">
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Enter Registered Email</h3>
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

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Submit
                </Button>

                <a className="login-form-forgot" onClick={() => navigate("/")}>
                  Back to Login
                </a>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
