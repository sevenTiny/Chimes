import { useState, useEffect } from 'react';
import { ToolOutlined, HomeOutlined, LinkOutlined, BuildOutlined, BulbOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Image, Row, Col } from 'antd';
import { NavLink, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const menuItems = [
  {
    label: 'Home',
    key: '/Home',
    icon: <HomeOutlined />,
  },
  {
    label: 'JSON 工具',
    key: '/JsonTool',
    icon: <ToolOutlined />,
  },
  {
    label: '快速生成器',
    key: '/GenerateTool',
    icon: <BuildOutlined />,
  },
  {
    label: '玄学',
    key: '/XuanXue',
    icon: <BulbOutlined />,
  },
  {
    label: '快捷链接',
    key: '/Links',
    icon: <LinkOutlined />,
  },
];

const App = () => {
  const { token: { colorBgContainer } } = theme.useToken();
  const [currentMenu, setCurrentMenu] = useState({});
  // 定义selectedKeys，来控制菜单选中状态和切换页面
  const [selectedKeys, setSelectedKeys] = useState([]);
  // useLocation react-router自带hook，能获取到当前路由信息
  const location = useLocation();
  // 每次切换路由，获取当前最新的pathname,并赋给menu组件
  useEffect(() => {
    // location.pathname对应路由数据中的path属性
    setSelectedKeys([location.pathname]);
    // store current menu
    setCurrentMenu(menuItems.find((item) => item.key === location.pathname));
  }, [location]);

  return (
    <Layout className="layout">
      <Header style={{ alignItems: 'center' }}>
        <Row>
          <Col flex="130px">
            <NavLink to='/'>
              <Image src='favicon.ico' preview={false} style={{ marginLeft: 0, marginRight: 10, width: '70%' }} />
              <font size={3} color={'white'}>Chimes</font>
            </NavLink>
          </Col>
          <Col flex="auto">
            <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
              {menuItems.map((item) => (
                <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
                  <NavLink to={item.key}>{item.label}</NavLink>
                </Menu.Item>
              ))}
            </Menu>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '20px', background: colorBgContainer }}>
        {
          location.pathname != '/' &&
          location.pathname != '/Home' &&
          <Breadcrumb items={
            [
              {
                href: '/',
                title: <HomeOutlined />,
              },
              {
                title: currentMenu?.label
              }
            ]} />
        }
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center', }}>
        Chimes ©2023 Created by 7tiny<br />
        <span id="busuanzi_container_site_pv">本站总访问量 <span id="busuanzi_value_site_pv"></span> 次</span>
      </Footer>
    </Layout>
  );
};

export default App;