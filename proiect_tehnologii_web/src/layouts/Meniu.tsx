import { Menu } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import localStorageWrapper from '../localStorage/LocalStorageWrapper'; // Asigură-te că ai importat wrapper-ul

const MenuContainer = () => {
  const isAuthenticated = !!localStorageWrapper.getToken(); // Verifică dacă utilizatorul este autentificat

  const items = [
    { path: isAuthenticated ? '/' : '/login', icon: <UserOutlined />, label: isAuthenticated ? 'Utilizator' : 'Login' },
    { path: '/telefoane', icon: <AppstoreOutlined />, label: 'Telefoane' },
  ];

  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
      {items.map((item, index) => (
        <Menu.Item key={String(index + 1)} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuContainer;
