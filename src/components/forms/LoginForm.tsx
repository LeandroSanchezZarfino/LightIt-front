import { Button, Form, Input } from "antd";
import {
  LoginFormInterface,
  LoginResponseInterface,
} from "../../interfaces/LoginInterface";

import { AxiosResponse } from "axios";
import { loginUser } from "../../services/AuthService";
import { setKey } from "../../utils/SessionStorage";
import { useNavigate } from "react-router-dom";

const { Item } = Form;

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (formValues: LoginFormInterface) => {
    loginUser(formValues).then((res: AxiosResponse<LoginResponseInterface>) => {
      console.log(res);
      // todo agregar msj

      setKey("token", res.data.access_token);
      navigate("/home");
    });
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
        <Button htmlType="submit">Login</Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
