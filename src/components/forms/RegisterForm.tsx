import { Button, DatePicker, Form, Input, Select } from "antd";
import {
  LoginResponseInterface,
  RegisterFormInterface,
} from "../../interfaces/LoginInterface";
import { loginUser, registerUser } from "../../services/AuthService";

import { AxiosResponse } from "axios";
import moment from "moment";
import { setKey } from "../../utils/SessionStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Item } = Form;
const { Option } = Select;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (formValues: RegisterFormInterface) => {
    setLoading(true);
    formValues.birthday = moment(formValues.birthday).format("YYYY-MM-DD");
    registerUser(formValues)
      .then((res) => {
        loginUser(formValues).then(
          (res: AxiosResponse<LoginResponseInterface>) => {
            setKey("token", res.data.access_token);
            navigate("/home");
          }
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Item
        name={"name"}
        rules={[
          { required: true, message: "Name is required" },
          {
            pattern: /^[A-Za-z\s]+$/,
            message: "Name can only contain chars and spaces",
          },
        ]}
      >
        <Input placeholder="Full Name" type="text" />
      </Item>
      <Item
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input placeholder="email@email.com" type="email" />
      </Item>
      <Item
        name={"password"}
        rules={[
          { required: true, message: "Password is required" },
          {
            min: 8,
            type: "string",
            message: "Password must contain at least 8 characters",
          },
        ]}
      >
        <Input.Password placeholder="password" />
      </Item>
      <Item
        name={"birthday"}
        rules={[{ required: true, message: "Birthday is required" }]}
      >
        <DatePicker format={"YYYY-MM-DD"} placeholder="Birth Date" />
      </Item>
      <Item
        name="gender"
        rules={[{ required: true, message: "Gender is required" }]}
      >
        <Select placeholder="Select a gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Item>
      <Item>
        <Button type="primary" loading={loading} htmlType="submit">
          Register
        </Button>
      </Item>
    </Form>
  );
};

export default RegisterForm;
