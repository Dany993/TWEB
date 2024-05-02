import { DatePickerProps } from "antd";

 interface Car{
        model: string;
        marca: string;
        descriere : string;
        dataFabricarii: Date;
    
}

interface CarModel extends Car{
    [x: string]: any;
    imageUrl: string;
    price: number;
}
export default CarModel;