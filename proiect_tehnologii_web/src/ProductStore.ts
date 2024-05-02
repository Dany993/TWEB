import { makeObservable, observable, action } from 'mobx';
import localStorageWrapper from './LocalStorageWrapper';
import Model from './Model';


class ProductStore {
  models: Model[] = [];
  loading: boolean = true; 

  constructor() {
    makeObservable(this, {
      models: observable,
      loading: observable,
      addProduct: action,
      removeProduct: action,
      setLoading: action
    });
    this.loadData(); 
  }

  addProduct(model: Model) {
    this.models.push(model);
    this.saveData(); 
  }

  removeProduct(model: Model) {
    this.models = this.models.filter(m => m !== model);
    this.saveData(); 
  }

  async loadData() {
   
    this.setLoading(true);

    
    await new Promise(resolve => setTimeout(resolve, 2000));

    
    this.models = localStorageWrapper.data ? localStorageWrapper.data : [];

    
    this.setLoading(false);
  }

  saveData() {
    localStorageWrapper.setData(this.models);
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

}

const productStore = new ProductStore();
export default productStore;