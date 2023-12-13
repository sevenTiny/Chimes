import { useState, useEffect } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Image } from 'antd';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import route from './route';

const { Content, Footer, Sider } = Layout;

const convertMenu = (route) => {
  return route.filter((item) => item.path != '/' && item.label).map((item) => {
    return {
      key: item.path,
      label: item.children ? item.label : <NavLink to={item.path}>{item.label}</NavLink>,
      disabled: item.disabled,
      icon: item.icon,
      children: item.children ? convertMenu(item.children) : null,
    };
  });
}

const convertMenuToSameFloor = (menuItems) => {
  const menus = [];
  menuItems.forEach((item) => {
    menus.push(item);

    if (item.children) {
      item.children.forEach((child) => menus.push(child))
    }
  });

  return menus;
}

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  // convert route to menu
  const menuItems = convertMenu(route);
  // menu same fllor
  const sameFloorMenus = convertMenuToSameFloor(menuItems);
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
    setCurrentMenu(sameFloorMenus.find((item) => item.key === location.pathname));
  }, [location]);

  return (
    // vertical layout
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ margin: 20 }} >
          <NavLink to='/'>
            <Image src='/favicon.ico' preview={false} style={{ marginLeft: 0, marginRight: 10, width: '70%' }} />
            <font size={3} color={'white'}>Chimes</font>
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ background: colorBgContainer }}>
        <Content style={{ margin: 16 }}>
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
        <Footer style={{ textAlign: 'center', height: 60, padding: 15 }}>
          Chimes ©2023 Created by 7tiny<br />
          <span id="busuanzi_container_site_pv">本站总访问量 <span id="busuanzi_value_site_pv"></span> 次</span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;