import { Tabs, TabsProps } from "antd";

import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Login = () => {
  const items: TabsProps["items"] = [
    {
      key: "login",
      label: <h2 className="w-[120px] text-center">Login</h2>,
      children: <LoginForm />
    },
    {
      key: "register",
      label: <h2 className="w-[120px] text-center">Register</h2>,
      children: <RegisterForm />
    }
  ];

  return (
    <div className=" bg-login w-screen h-screen bg-cover">
      <div className="flex flex-col h-full justify-center items-center ">
        <div className="bg-white rounded-xl lg:h-4/6 min-w-[360px] p-4 lg:p-8">
            <h1 className="text-3xl m-4 text-gray-700 text-center">Welcome!</h1>
          <Tabs items={items} />
        </div>
      </div>
    </div>
  );
};

export default Login;
