import React from 'react';
import { observer } from 'mobx-react';
import { Layout, Button, theme, Spin, DatePicker } from 'antd'; 
import Model from './Model';
import productStore from './ProductStore';
import ModalForm from './ModalForm';
import CardComponent from './CardComponent';


const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = observer(() => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Model | null>(null); 
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null); 
  };

  const handleFormSubmit = (cardComponent: Model) => {
    if (selectedProduct) {
      productStore.removeProduct(selectedProduct); 
    }
    productStore.addProduct(cardComponent); 
    setIsModalVisible(false); 
    setSelectedProduct(null); 
  };

  const handleEdit = (model: Model) => {
    setSelectedProduct(model); 
    showModal();
  };

  const handleDelete = (model: Model) => {
    productStore.removeProduct(model); 
  };

  const emptyCard:Model = {
    descriere: "",
    model: "",
    marca: "",
    price: 0,
    imageUrl: "",
    dataFabricarii: new Date()
    // "2002-10-10"
  }

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button type="primary" onClick={showModal} style={{ marginBottom: 16, marginLeft: 16 }}>
            Add product
          </Button>
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
            {productStore.loading ? (
              <Spin size="large" />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                {productStore.models.map((model, index) => (
                  <CardComponent 
                    key={index} 
                    model={model} 
                    onEdit={() => handleEdit(model)}
                    onDelete={() => handleDelete(model)} 
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
});

export default App;