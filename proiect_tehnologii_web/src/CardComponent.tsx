import React from 'react';
import { Card as AntCard } from 'antd';
import CardModel from './Model'

const CardComponent:React.FC<{value:CardModel | undefined}> = ({value}) => {
 

      if(!value ){
        console.log("card component")
        console.log(value);
        return null;
      }
   
      const { model,marca, descriere, dataFabricarii, imageUrl,price } = value;

      return (
        <AntCard style={{ marginBottom: '10px',borderColor: 'black' }}>
          <img src={imageUrl} width={'260px'} height={'200px'}></img>
          <p>Model: {model}</p>
          <p>Marca: {marca}</p>
          <p>Descriere: {descriere}</p>
          <p>Data Fabricarii: {dataFabricarii}</p>
          <p>Pret: {price}</p>
        </AntCard>
      );


  };

  export default CardComponent;