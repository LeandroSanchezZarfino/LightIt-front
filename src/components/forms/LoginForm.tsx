import React from "react";
import { Button, Form, Input } from "antd";
import { LoginFormInterface } from "../../interfaces/LoginInterface";

const { Item } = Form;

const LoginForm = () => {
  const handleSubmit = (values: LoginFormInterface) => {};

  return (
    <Form onFinish={handleSubmit}>
      <Item
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Email is invalid" }
        ]}
      >
        <Input type="email" placeholder="email@test.com" />
      </Item>
      <Item name={"password"} rules={[{ required: true, message: "Password is required" }]}>
        <Input.Password placeholder="password" />
      </Item>
      <Item>
        <Button htmlType="submit">Login</Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
