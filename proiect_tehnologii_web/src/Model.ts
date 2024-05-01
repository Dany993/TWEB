 interface Car{
        model: string;
        marca: string;
        descriere : string;
        dataFabricarii: string;
    
}

interface CarModel extends Car{
    imageUrl: string;
    price: number;
}
export default CarModel;