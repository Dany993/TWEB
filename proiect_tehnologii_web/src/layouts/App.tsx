import React, { useEffect, useState } from 'react';
import { Button, Layout, Spin, theme } from 'antd';
import ModalForm from '../FormaAdaugare';
import MenuContainer from './Meniu';
import TelefonCard from '../TelefonCard';
import Telefon from '../models/Telefon';
import localStorageWrapper from '../localStorage/LocalStorageWrapper';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [telefoane, setTelefoane] = useState<Telefon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Telefon | null>(null);

  const isAdmin = localStorageWrapper.hasAdminRole();

  const emptyCard: Telefon = {
    id: 0,
    nume: '',
    descriere: '',
    model: '',
    pret: 0,
    imagine: '',
    link: ''
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/products');
        const data = await response.json();
        setTelefoane(data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const showModal = () => {
    if (isAdmin) {
      setIsModalVisible(true);
    } else {
      alert("Nu aveți permisiuni pentru a adăuga produse.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const token = localStorageWrapper.getToken(); 
  
  const handleFormSubmit = async (telefon: Telefon) => {
    // Asigură-te că ai o funcție care să preia tokenul

    try {
      if (selectedProduct) {
        await fetch(`http://localhost:8080/api/products/${selectedProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(telefon),
        });
        setTelefoane(prevTelefoane => prevTelefoane.map(t => (t.id === selectedProduct.id ? telefon : t)));
      } else {
        const response = await fetch('http://localhost:8080/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(telefon),
        });
        const newProduct = await response.json();
        setTelefoane([...telefoane, newProduct]);
      }
    } catch (error) {
      console.error('Error submitting product', error);
    }

    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleEdit = (telefon: Telefon) => {
    if (isAdmin) {
      setSelectedProduct(telefon);
      showModal();
    } else {
      alert("Nu aveți permisiuni pentru a edita produsele.");
    }
  };

  const handleDelete = async (telefon: Telefon) => {
    if (isAdmin) {
      try {
        await fetch(`http://localhost:8080/api/products/${telefon.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setTelefoane(telefoane.filter(t => t.id !== telefon.id));
      } catch (error) {
        console.error('Error deleting product', error);
      }
    } else {
      alert("Nu aveți permisiuni pentru a șterge produsele.");
    }
  };

  const handleCardClick = (link: string) => {
    window.open(link, '_blank'); // Redirecționează către link-ul extern
  };

  return (
    <Layout hasSider>
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <div className="demo-logo-vertical" />
        <MenuContainer />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {isAdmin && (
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16, marginLeft: 16 }}>
              Add product
            </Button>
          )}
          <ModalForm visible={isModalVisible} onCancel={handleCancel} onSubmit={handleFormSubmit} card={selectedProduct || emptyCard} />
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {loading ? (
              <Spin size="large" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                {telefoane.map((telefon, index) => (
                  <TelefonCard
                    key={index}
                    telefon={telefon}
                    onEdit={() => handleEdit(telefon)}
                    onDelete={() => handleDelete(telefon)}
                    onCardClick={() => handleCardClick(telefon.link)} // Apelează handler-ul de click cu link-ul
                    isAdmin={isAdmin} // Poți transmite și isAdmin la TelefonCard, dacă ai nevoie
                  />
                ))}
              </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
