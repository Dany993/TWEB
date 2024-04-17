import React from 'react';
import { Card as AntCard } from 'antd';
import CardModel from './Model'

const CardComponent:React.FC<{value:CardModel | undefined}> = ({value}) => {
 

      if(!value ){
        console.log("card component")
        console.log(value);
        return null;
      }
   
      const { model,marca, descriere, dataFabricarii } = value.data;

      return (
        <AntCard style={{ marginBottom: '10px',borderColor: 'black' }}>
          <p>Model: {model}</p>
          <p>Marca: {marca}</p>
          <p>Descriere: {descriere}</p>
          <p>Data Fabricarii: {dataFabricarii}</p>
        </AntCard>
      );


  };

  export default CardComponent;