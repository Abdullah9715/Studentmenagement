import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider, Space } from 'antd';
import {MdOutlineLibraryBooks} from 'react-icons/md';
import {GiCheckMark} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Routes from './Routes';
const { Header, Sider, Content } = Layout;
const initalState = { search:""}

export default function Sidbar() {
 
  const [collapsed, setCollapsed] = useState(true);

  return (




    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
        <div className="demo-logo-vertical" />
        <p className='ps-1 mt-4  fs-6' >Admin</p>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}


          items={[

            {
              key: '/student',
              icon: <UserOutlined />,
              label: <Link to="/student" className='nav-link'>Student</Link>,
            },
            {
              key: '/course',
              icon: <MdOutlineLibraryBooks />,
              label: <Link to="/course" className='nav-link'>Course's</Link>,
            },
            {
              key: '/attendence',
              icon: <GiCheckMark />,
              label: <Link to="/attendence" className='nav-link'>Attendence</Link>,
            },
          ]}
        />

        <Divider />
      </Sider>
      <Layout>
        <Header style={{ background: '#9999', padding: 0 }}>
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
          <Link to="/">
          <span className='fs-3 fw-bold ms-2'>Dashboard</span>
          </Link>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 280,
          }}
        >

          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

