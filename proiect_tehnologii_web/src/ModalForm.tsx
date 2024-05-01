import React, { useEffect, useState } from 'react';

import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,

  } from 'antd';
import CarModel from './Model';

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
  


interface ModalFormProps {
  visible: boolean;
  onSubmit: (data: CarModel) => void;
  onCancel:() => void;
  card : CarModel;
}

const ModalForm: React.FC<ModalFormProps> = ({ visible, onCancel ,onSubmit, card }) => {
  const [form] = Form.useForm();

 

  const onFinish = (values: any) => {
    const data:CarModel = {
      
        model : values.model,
        marca :values.marca,
        descriere : values.descriere,
        dataFabricarii : values.dataFabricarii.toString(),
        price : values.price,
        imageUrl : values.imageUrl
        
    }
    console.log("OnFinishMethod values");
    console.log(values);
    alert(values);
    onSubmit(data); 
    form.resetFields();
  };
  
  
  useEffect(() =>{
    form.resetFields();
  },[onCancel])



  return (
    <Modal title="Add Card" open={visible} onCancel={onCancel} footer={null}>
        <Form form={form} {...formItemLayout} onFinish={onFinish} initialValues={{}}>
 

          <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Please input your surname!' }]}>
           <Input />
          </Form.Item>

          <Form.Item label="Marca" name="marca" rules={[{ required: true, message: 'Please input your surname!' }]}>
           <Input />
          </Form.Item>
          <Form.Item label="Imagine" name="imageUrl" rules={[{ required: true, message: 'Please  path to image!' }]}>
           <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input car price!' }]}>
           <Input />
          </Form.Item>
         <Form.Item label="Descriere" name="descriere" rules={[{ required: true, message: 'Please input a description!' }]}>
            <Input.TextArea />
          </Form.Item>

           <Form.Item label="Data Fabricarii" name="dataFabricarii" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
            <DatePicker />
           </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
             <Button type="primary" htmlType="submit">
               Submit
             </Button>
           </Form.Item>
         </Form>
       </Modal>
  );
};

export default ModalForm;