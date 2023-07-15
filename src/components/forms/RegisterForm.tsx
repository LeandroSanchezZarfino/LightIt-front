import { Button, DatePicker, Form, Input, Select } from "antd";

import React from "react";
import { RegisterFormInterface } from "../../interfaces/LoginInterface";
import moment from "moment";
import { registerUser } from "../../services/UserService";

const { Item } = Form;
const { Option } = Select;

const RegisterForm = () => {

  const handleSubmit = (formValues: RegisterFormInterface) => {
    formValues.birthday = moment(formValues.birthday).format("YYYY-MM-DD");
    registerUser(formValues).then((res) => {
      console.log(res);
    });
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
        rules={[
          { required: true, message: "Email is required" },
          { min: 8, message: "Password must contain at least 8 characters" },
        ]}
      >
        <Input placeholder="email@email.com" type="email" />
      </Item>
      <Item
        name={"password"}
        rules={[{ required: true, message: "Password is required" }]}
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
        <Button htmlType="submit">Register</Button>
      </Item>
    </Form>
  );
};

export default RegisterForm;