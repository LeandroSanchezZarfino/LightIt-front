import { Button, Form, Input } from "antd";
import {
  LoginFormInterface,
  LoginResponseInterface,
} from "../../interfaces/LoginInterface";

import { AxiosResponse } from "axios";
import { loginUser } from "../../services/AuthService";
import { setKey } from "../../utils/SessionStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Item } = Form;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (formValues: LoginFormInterface) => {
    setLoading(true);
    loginUser(formValues)
      .then((res: AxiosResponse<LoginResponseInterface>) => {
        setKey("token", res.data.access_token);
        navigate("/home");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Item
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Email is invalid" },
        ]}
      >
        <Input type="email" placeholder="email@test.com" />
      </Item>
      <Item
        name={"password"}
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password placeholder="password" />
      </Item>
      <Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Login
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
