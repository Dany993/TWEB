import { observable, action, makeObservable } from 'mobx';
import Model from './Model';


const setLocalStorageData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageData = (key: string): any => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

class LocalStorageWrapper {
  data: Model[] | null = null;
  users: { username: string, password: string }[] | null = null; 

  constructor() {
    makeObservable(this, {
      data: observable,
      setData: action,
      loadDataFromLocalStorage: action
    });
    this.loadDataFromLocalStorage();
  }

  setData(newData: Model[]) {
    this.data = newData;
    setLocalStorageData('models', newData);
  }
  

  async loadDataFromLocalStorage() {
    const storedData = getLocalStorageData('model');
    const storedUsers = getLocalStorageData('users'); 
    if (!storedData) {
      const initialData: Model[] = [
        {
            model: "Mercedes",
            marca: "ML",
            descriere: "300 Benzin",
            dataFabricarii: new Date(),
            // "2006-10-10",
            imageUrl: "https://cdn.motors.al/data/d9/39/2006-mercedes-ml-320-062.jpg",
            price: 10000
        },
          {
              model: "BMW",
              marca: "X5",
              descriere: "300D",
              dataFabricarii: new Date(),
            //   "2016-10-02",
              imageUrl: "https://i.gaw.to/vehicles/photos/07/56/075628_2016_bmw_X5.jpg?640x400",
              price: 20000
          },
          {
              model: "Nissan",
              marca: "Skyline",
              descriere: "url1",
              dataFabricarii: new Date(),
            //   "2005-03-03"
              imageUrl: "https://cimg0.ibsrv.net/ibimg/hgm/1920x1080-1/100/879/r34-nissan-skyline-gt-r-from-fast-and-furious-4--photo-credit-bonhams_100879624.jpg",
              price: 3000000
          }
      ]; 
      setLocalStorageData('models', initialData);
      this.data = initialData;
    } else {
      this.data = storedData;
    }
    if (!storedUsers) { 
      const initialUsers = [
        { username: 'daniel', password: 'danielb' },
        { username: 'utilizator', password: 'parola' },
      ];
      setLocalStorageData('users', initialUsers);
      this.users = initialUsers;
    } else {
      this.users = storedUsers;
    }
  }
}

const localStorageWrapper = new LocalStorageWrapper();
export default localStorageWrapper;