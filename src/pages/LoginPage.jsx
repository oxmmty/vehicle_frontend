import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUser } from "../redux/slices/UserSlice";
import { MailOutlined, KeyOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const res = await axios.post('/login', values);
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    dispatch(setUser(res.data));
    Notification('Successful Login!');
    navigate('/dashboard');
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <Form className="w-full border border-border-100 p-2 max-w-[500px] rounded-2xl bg-bg-light-dark"
        layout="vertical"
        initialValues={{
          email: "Admin@gmail.com",
          password: '123456',
          remember: true
        }}
        onFinish={onFinish}
      >
        <div className="flex justify-center py-10">
          <img src="/logo.png" className="w-24" />
        </div>
        <Form.Item label={"Email:"} name={"email"}
          rules={[
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
            },
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
            <Button type="primary" htmlType="submit">ログイン</Button>
          </Form.Item>
          <Form.Item name="register">
            <Button onClick={() => navigate('/register')}>登録</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
export default LoginPage;