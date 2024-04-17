import React, { useState, useRef } from 'react';
import { Button, Modal, Form, Input, Mentions, Select, Cascader, TreeSelect, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Initialize form instance

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    setIsModalVisible(false);
    form.resetFields(); 
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add 
      </Button>
      <Modal title="Adaugare Card" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} {...formItemLayout} onFinish={onFinish} initialValues={{}}>
          <Form.Item label="Model" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Marca" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Descriere" name="Descriere" rules={[{ required: true, message: 'Please input!' }]}>
            <Input.TextArea />
          </Form.Item>


          <Form.Item label="Data Fabricarii" name="DatePicker" rules={[{ required: true, message: 'Please input!' }]}>
            <DatePicker />
          </Form.Item>

        

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;