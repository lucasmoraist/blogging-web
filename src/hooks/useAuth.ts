import { action, makeObservable, observable } from 'mobx';

interface IUserResponse {
  token: string;
}

class AuthService {
  isLogged = false;
  token = '';

  constructor() {
    makeObservable(this, {
      isLogged: observable,
      token: observable,
      login: action,
      logout: action,
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
      this.token = token;
    }
  }

  login({ token }: IUserResponse) {
    this.isLogged = true;
    this.token = token;
    localStorage.setItem('token', token);
  }

  logout() {
    this.isLogged = false;
    this.token = '';
    localStorage.removeItem('token');
  }
}

const authService = new AuthService();

export { authService };
