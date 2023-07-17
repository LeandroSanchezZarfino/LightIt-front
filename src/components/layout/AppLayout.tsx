import { Button, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { removeKey } from "../../utils/SessionStorage";

const { Header } = Layout;

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const logout = () => {
    removeKey("token");
    navigate("/");
  };
  
  const menuItems = [
    { label: <Link to={"/home"}>Diagnosis</Link>, key: "home" },
    { label: <Link to={"/history"}>History</Link>, key: "history" },
    // Tailwind classes doesn't work here
    { label: <Button type="link" style={{color: "rgba(255, 255, 255, 0.65)"}} icon={<LogoutOutlined/>} onClick={logout}> Logout</Button>, key: "logout" },
  ];

  return (
    <Layout>
      <Header className="flex">
        <Menu
          className="w-full"
          theme="dark"
          mode="horizontal"
          items={menuItems}
        />
      </Header>

      <div className="p-6 md:p-12 min-h-[85vh]">{props.children}</div>
      <div className="p-4 w-full text-center bg-sky-50">
        LightIt Challenge - Leandro Sanchez Zarfino
      </div>
    </Layout>
  );
};

export default AppLayout;
