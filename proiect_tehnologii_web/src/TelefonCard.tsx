import React from 'react';
import { Button, Card } from 'antd';
import Telefon from './models/Telefon';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface TelefonCardProps {
  telefon: Telefon;
  onEdit: () => void; 
  onDelete: () => void; 
  isAdmin: boolean; // Adaugă prop pentru a verifica rolul de admin
  onCardClick: () => void;
}

const TelefonCard: React.FC<TelefonCardProps> = ({ telefon, onEdit, onDelete, isAdmin, onCardClick  }) => (
  <Card
    hoverable
    style={{ width: 250 }}
    cover={<img alt={telefon.nume} src={telefon.imagine}
    onClick={onCardClick} />}
  >
    <Meta title={telefon.nume} description={telefon.descriere} />
    <div>
      <p>Model: {telefon.model}</p>
      <p>Price: {telefon.pret}</p>
    </div>
    
    {isAdmin && ( // Afișează butoanele doar dacă utilizatorul este admin
      <div>
        <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>Edit</Button>
        <Button style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }} icon={<DeleteOutlined />} onClick={onDelete}>Delete</Button>
      </div>
    )}
  </Card>
);

export default TelefonCard;
