import React from "react";
import { Button, Checkbox, Form, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await axios.post("/register", values);
    if (res.status == 200) {
      Notification("Successful Register!");
      navigate("/login");
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-2  bg-[url('../../../public/background.webp')] bg-cover bg-center h-screen ">
      <Form
        className="w-full flex justify-between h-4/6 border border-[#707070]  max-w-[1000px] rounded-2xl bg-[#00000070]"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <div className=" bg-[#00000040] h-full w-1/2 rounded-2xl border border-[#707070]">
          <div className="flex items-center justify-center h-full">
            <Image
              src="/logo.png"
              width={120}
              preview={true}
              className="m-auto"
            />
          </div>
        </div>
        <div className="w-[50%] h-full">
          <div className="font-bold text-[16px] px-[15%] py-[20%]">
            <Form.Item
              label={"Name:"}
              name={"name"}
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}>
              <Input prefix={<UserOutlined />} required />
            </Form.Item>
            <Form.Item
              label={"Email:"}
              name={"email"}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
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
            <Form.Item
              label={"Confirm Password:"}
              name={"confirm"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!",
                      ),
                    );
                  },
                }),
              ]}>
              <Input.Password prefix={<KeyOutlined />} required />
            </Form.Item>
            <div className="flex justify-between px-2">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item name="forget">
                <Button
                  type="link"
                  className="hover:text-yellow-500 text-blue-300">
                  Forget Password？
                </Button>
              </Form.Item>
            </div>
            <div className="flex justify-evenly pt-4 pb-10">
              <Form.Item name="login">
                <Button
                  type="link"
                  className="border-none hover:text-yellow-500 text-blue-300"
                  onClick={() => navigate("/login")}>
                  Already registered?
                </Button>
              </Form.Item>
              <Form.Item name="register">
                <Button type="primary" htmlType="submit">
                  登録
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default RegisterPage;
