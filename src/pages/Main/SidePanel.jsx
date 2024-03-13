import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  CreditCardOutlined,
  PicRightOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export const SidePanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [key, setkey] = useState('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  function navigateTo(value, key) {
    setkey(key);
    navigate(value);
  }

  const logOut = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  const manageProtectionOnRouting = (pageName) => {
    let userGrantedAccessList = JSON.parse(localStorage.getItem('accessList'));
    if (userGrantedAccessList?.includes(pageName)) return true;
    else false;
  };

  const items = [
    {
      key: '1',
      label: (
        <>
          <Space size={'middle'} onClick={() => logOut()}>
            <Button size="small" icon={<LogoutOutlined />} />
            Logout
          </Space>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[key]}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => {
                manageProtectionOnRouting('dashboard')
                  ? navigateTo('/main/dashboard', '1')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Users',
              onClick: () => {
                manageProtectionOnRouting('users')
                  ? navigateTo('/main/users', '2')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              key: '11',
              icon: <AppstoreAddOutlined />,
              label: 'Collections',
              onClick: () => {
                manageProtectionOnRouting('collections')
                  ? navigateTo('/main/collections')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              key: '3',
              icon: <AppstoreAddOutlined />,
              label: 'Categories',
              onClick: () => {
                manageProtectionOnRouting('categories')
                  ? navigateTo('/main/categories', '3')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              icon: <CreditCardOutlined />,
              label: 'GiftCard',
              children: [
                {
                  key: '4',
                  label: 'Bitaqaty GiftCard',
                  onClick: () => {
                    manageProtectionOnRouting('giftCards')
                      ? navigateTo('/main/bitaqatygiftcard')
                      : navigateTo('/main/unauthorized');
                  },
                },
                {
                  key: '5',
                  label: 'Our Giftcards',
                  onClick: () => {
                    manageProtectionOnRouting('giftCards')
                      ? navigateTo('/main/selectedgiftcards')
                      : navigateTo('/main/unauthorized');
                  },
                },
              ],
            },
            {
              icon: <PicRightOutlined />,
              label: 'Binance',
              onClick: () => {
                manageProtectionOnRouting('binance')
                  ? navigateTo('/main/binance')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              key: '8',
              icon: <PicRightOutlined />,
              label: 'CMS',
              onClick: () => {
                manageProtectionOnRouting('cms')
                  ? navigateTo('/main/cmsManagement')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              key: '9',
              icon: <ProfileOutlined />,
              label: 'Orders',
              onClick: () => {
                manageProtectionOnRouting('order')
                  ? navigateTo('/main/orders')
                  : navigateTo('/main/unauthorized');
              },
            },
            {
              key: '10',
              icon: <ProfileOutlined />,
              label: 'Customers',
              onClick: () => {
                manageProtectionOnRouting('customer')
                  ? navigateTo('/main/customers')
                  : navigateTo('/main/unauthorized');
              },
            },
            // {
            //   key: "9",
            //   icon: <ProfileOutlined />,
            //   label: "Logs",
            //   onClick: () => {
            //     manageProtectionOnRouting("logs")
            //       ? navigateTo("/main/logs", "9")
            //       : navigateTo("/main/unauthorized");
            //   },
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 10px',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div>
            <Dropdown
              menu={{
                items,
              }}
            >
              <Avatar>A</Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
