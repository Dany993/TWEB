import React from 'react';
import { Layout, Button, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import MenuContainer from './Meniu';
import FooterComponent from './FooterComponent';
import { Content } from 'antd/es/layout/layout';
import HeaderComponent from './HeaderComponent';
import localStorageWrapper from '../localStorage/LocalStorageWrapper'; // Asigură-te că ai importat wrapper-ul
import image from '../images/image.png';

const MainLayout: React.FC = ({ children }: any) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = () => {
        // Șterge datele din local storage
        localStorageWrapper.clearStorage(); // Adaugă această funcție în LocalStorageWrapper
        // Redirecționează utilizatorul la pagina de login sau o altă pagină
        window.location.href = '/telefoane'; // Poți ajusta ruta după cum e nevoie
    };

    // Obține detaliile utilizatorului din local storage
    const username = localStorageWrapper.getUsername(); // Asigură-te că ai implementat funcția în LocalStorageWrapper
    const role = localStorageWrapper.getRole(); // Obține rolul utilizatorului

    return (
        <Layout hasSider>
            <Sider
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className="demo-logo-vertical" />
                <MenuContainer />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <HeaderComponent />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <h3>Utilizator: {username}</h3>
                        <h4>Rol: {role}</h4>
                        <Button type="primary" onClick={handleLogout} style={{ marginTop: 16 }}>
                            Logout
                        </Button>
                        <br></br>
                        <br></br>
                        {children}
                        <img src={image} alt='User'/>

                    </div>
                </Content>
                <FooterComponent />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
