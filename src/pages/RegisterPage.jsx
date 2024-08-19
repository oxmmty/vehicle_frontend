import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await axios.post("/register", values);
    if (res.status == 200) {
      Notification('Successful Register!');
      navigate("/login");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <Form className="w-full border border-border-100 p-2 max-w-[500px] rounded-2xl bg-bg-light-dark"
        layout="vertical"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <div className="flex justify-center py-10">
          <img src="/logo.png" className="w-24" />
        </div>
        <Form.Item label={"Name:"} name={'name'}
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            }
          ]}
        >
          <Input prefix={<UserOutlined />} required />
        </Form.Item>
        <Form.Item label={"Email:"} name={"email"}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your Email!',
            }
          ]}
        >
          <Input prefix={<MailOutlined />} required />
        </Form.Item>
        <Form.Item label={"Password:"} name={"password"}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            }
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} required />
        </Form.Item>
        <Form.Item label={"Confirm Password:"} name={"confirm"}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} required />
        </Form.Item>
        <div className="flex justify-between px-2">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item name="forget">
            <Button type="link">Forget Password？</Button>
          </Form.Item>
        </div>
        <div className="flex justify-evenly pt-4 pb-10">
          <Form.Item name="login">
            <Button type="link" className="border-none" onClick={() => navigate("/login")}>
              Already registered?
            </Button>
          </Form.Item>
          <Form.Item name="register">
            <Button type="primary" htmlType="submit">
              登録
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default RegisterPage;
