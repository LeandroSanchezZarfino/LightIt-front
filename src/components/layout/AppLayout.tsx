import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import type { MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

const menuItems = [
  { label: "Diagnosis", url: "/home", key: "home" },
  { label: "History", url: "/historic", key: "historic" },
];

const AppLayout: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }: { key: string }) => {
    const { url } = menuItems.find((item) => item.key === key) || {};
    if (url) {
      navigate(url);
    }
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          mode="horizontal"
          items={menuItems}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {props.children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AppLayout;
