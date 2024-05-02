import React from 'react';
import { Card, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Importăm butoanele din Ant Design
import Model from './Model';

const { Meta } = Card;

interface ProductCardProps {
  model: Model;
  onEdit: () => void; 
  onDelete: () => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ model, onEdit, onDelete }) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt={model.marca} src={model.imageUrl} width='240px' height='240px'/>}
    actions={[ // Folosim actions pentru a afișa butoanele în partea de jos a cardului
      <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>Edit</Button>,
      <Button style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }} icon={<DeleteOutlined />} onClick={onDelete}>Delete</Button>
    ]}
  >
    <Meta title={model.model} description={model.descriere} />
    <div>
      <p>Model: {model.model}</p>
      <p>Marca: {model.marca}</p>
      <p>Price: {model.price}</p>
      <p>Data fabricarii: {model.dataFabricarii.toString()}</p>
    </div>
  </Card>
);

export default ProductCard;