import React from 'react';
import { observer } from 'mobx-react';
import { Form, Input, Modal, Button, InputNumber } from 'antd';
import Telefon from './models/Telefon';

const { TextArea } = Input;

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (product: Telefon) => void;
  card: Telefon; 
}

const FormaAdaugare: React.FC<ModalFormProps> = ({ visible, onCancel, onSubmit, card }) => {
  const [form] = Form.useForm(); 

  React.useEffect(() => {
    form.setFieldsValue(card);
  }, [card, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={card.nume ? 'Edit Product' : 'Add Product'} 
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="modal_form">
      <Form.Item label="Nume" name="nume" rules={[{ required: true, message: 'Introduceti numele telefonului!' }]}>
            <Input />
           </Form.Item>

          <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Introduceti modelul telefonului!' }]}>
            <Input />
           </Form.Item>
         <Form.Item label="Imagine" name="imagine" rules={[{ required: true, message: 'Introduceti imaginea telefonului!' }]}>
          <Input />
           </Form.Item>



          <Form.Item label="Descriere" name="descriere" rules={[{ required: true, message: 'Introduceti descrierea telefonului!' }]}>
             <Input.TextArea />
           </Form.Item>
           <Form.Item label="Pret" name="pret" rules={[{ required: true, message: 'Introduceti pretul telefonului!' }]}>            
            <InputNumber />
            </Form.Item>

            <Form.Item label="Link extern" name="link" rules={[{ required: true, message: 'Introduceti specificatiile telefonului!' }]}>
          <Input />
          </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(FormaAdaugare);

