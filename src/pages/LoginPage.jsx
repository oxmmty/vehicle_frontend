import React, { useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUser } from "../redux/slices/UserSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const onLogin = async () => {
    if (email.current.input.value && password.current.input.value) {
      const res = await axios.post('/login', { email: email.current.input.value, password: password.current.input.value });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      dispatch(setUser(res.data));
      Notification('Successful Login!');
      navigate('/workspace');
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <Form layout="vertical" className="w-full border border-border-100 p-2 max-w-[500px]">
        <div className="flex justify-center py-10">
          <img src="/logo.png" className="w-24" />
        </div>
        <Form.Item label={"Email:"}
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
          <Input required ref={email} />
        </Form.Item>
        <Form.Item label={"Password:"}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
          <Input.Password required ref={password} />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Checkbox>Remember me</Checkbox>
          <Button type="link">Forget Password？</Button>
        </div>
        <div className="flex justify-evenly pt-4 pb-10">
          <Button type="primary" onClick={onLogin}>ログイン</Button>
          <Button type="primary" danger onClick={() => navigate('/register')}>登録</Button>
        </div>
      </Form>
    </div>
  );
}
export default LoginPage;