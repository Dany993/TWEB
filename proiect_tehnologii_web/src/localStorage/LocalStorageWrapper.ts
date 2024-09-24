import { observable, action, makeObservable } from 'mobx';
import { jwtDecode, JwtPayload } from "jwt-decode";

class LocalStorageWrapper {
    accessToken: string | null = null; // Token de autentificare
    roles: string[] = []; 
    username: string | null = null;// Rolurile utilizatorului

    constructor() {
        makeObservable(this, {
            accessToken: observable, // Tokenul observabil
            roles: observable,
            username:observable, // Rolurile observabile
            setToken: action, // Acțiune pentru a seta tokenul
            loadTokenFromLocalStorage: action, // Acțiune pentru a încărca tokenul
            clearToken: action // Acțiune pentru a elimina tokenul
        });
        this.loadTokenFromLocalStorage(); // Încărcăm tokenul din localStorage
    }

    setToken(token: string) {
        this.accessToken = token;
        localStorage.setItem('accessToken', token); // Salvăm tokenul în localStorage
        this.setRolesFromToken(token); // Extragem și setăm rolurile din token
    }

    clearToken() {
        this.accessToken = null;
        this.roles = [];
        this.username = '';
        localStorage.removeItem('accessToken'); // Eliminăm tokenul din localStorage
    }

    loadTokenFromLocalStorage() {
        const storedToken = localStorage.getItem('accessToken'); // Obținem tokenul din localStorage
        if (storedToken) { 
            this.accessToken = storedToken; // Setăm tokenul dacă există în localStorage
            this.setRolesFromToken(storedToken); // Extragem rolurile
        }
    }

    setRolesFromToken(token: string) {
        try {
            const decodedToken: any = jwtDecode<JwtPayload>(token); // Decodificăm tokenul
            this.roles = decodedToken.roles || [];
            this.username = decodedToken.fullName || ''; 

            console.log('Roluri:',this.roles);// Presupunem că rolurile sunt stocate sub cheia "roles"
        } catch (error) {
            console.error('Invalid token:', error);
            this.roles = []; // Resetează rolurile în caz de eroare
        }
    }
    hasAdminRole() {
      return this.roles.includes('ROLE_ADMIN');
  }
  clearStorage() {
    this.clearToken();
}

getUsername() {
    return this.username || ''; 
}

getRole() {
    return this.roles || ''; 
}
getToken() {
  return this.accessToken; 
}
}

const localStorageWrapper = new LocalStorageWrapper();
export default localStorageWrapper;
