import React from "react";
import { Button, Checkbox, Form, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/slices/UserSlice";
import { MailOutlined, KeyOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const res = await axios.post("/login", values);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    dispatch(setUser(res.data));
    Notification("Successful Login!");
    navigate("/dashboard");
  };
  return (
    <div className="w-full  flex justify-center items-center p-2 bg-[url('./background.webp')] bg-cover bg-center  h-screen">
      <Form
        className="lg:w-full w-full flex-col h-full flex lg:flex-row lg:h-3/6 border border-[#707070] lg:max-w-[1000px]  rounded-2xl bg-[#00000070] "
        layout="vertical"
        // initialValues={{
        //   email: "Admin@gmail.com",
        //   password: "123456",
        //   remember: true,
        // }}
        onFinish={onFinish}>
        <div className=" bg-[#00000040] h-[50vw] w-full lg:h-full lg:w-1/2 rounded-2xl border border-[#707070]">
          <div className="flex items-center justify-center h-full">
            <Image
              src="/logo.png"
              width={120}
              preview={true}
              className="m-auto"
            />
          </div>
        </div>
        <div className="lg:w-[50%] w-full  h-1/2 lg:h-full ">
          <div className="font-bold text-[16px] justify-center py-auto px-10 lg:px-[15%] lg:py-[20%]">
            <div className="">
              <Form.Item
                label={"Email:"}
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}>
                <Input prefix={<MailOutlined />} required />
              </Form.Item>
              <Form.Item
                label={"Password:"}
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}>
                <Input.Password prefix={<KeyOutlined />} required />
              </Form.Item>
              <div className="flex justify-between px-2">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox className="text-white">Remember me</Checkbox>
                </Form.Item>
                <Form.Item name="forget">
                  <Button
                    type="link"
                    className="hover:text-yellow-500 text-blue-300">
                    Forget Password？
                  </Button>
                </Form.Item>
              </div>
              <div className="flex justify-evenly pt-4 lg:pb-10">
                <Form.Item name="login">
                  <Button type="primary" htmlType="submit">
                    ログイン
                  </Button>
                </Form.Item>
                <Form.Item name="register">
                  <Button onClick={() => navigate("/register")}>登録</Button>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default LoginPage;
