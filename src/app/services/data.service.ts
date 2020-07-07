import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private ADDRESS = environment.ADDRESS;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) { }
  // Get data from DB
  getData(param) {
    return this.http.get(this.ADDRESS + param);
  }
  // Insert and update DB
  saveData(param, data) {
    return this.http.post( this.ADDRESS + param, JSON.stringify(data) );
  }
  // Insert and update DB
  setData(param, data) {
    return this.http.put( this.ADDRESS + param, JSON.stringify(data) );
  }
  // Delete data form DB
  delete(param) {
    return this.http.delete( this.ADDRESS + param ).pipe(
      map(
        resp => console.log(resp),
        error => console.log('Erro ' + error)
        )
    );
  }

  getLastEvaluation(id: number) {
    return this.http.get(this.ADDRESS + 'clients/last/eval/' + id);
  }


  checkUser(credenciais: any, type) {
    return this.http.post(this.ADDRESS + type,
      JSON.stringify(credenciais))
      .pipe(
        map((response: any) => {
          if (response) {
            sessionStorage.setItem('token', response);
            return true;
          } else {
            return false;
          }
        })

      );
  }

  isLoggedIn() {
    const token = sessionStorage.getItem('token');
    if (token && !this.helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }
  getUserName() {
    const token = sessionStorage.getItem('token');
    return this.helper.decodeToken(token).name;
  }

  getPTId() {
    const token = sessionStorage.getItem('token');
    return this.helper.decodeToken(token).id;
  }

  getType() {
    if (this.isLoggedIn()) {
      const token = sessionStorage.getItem('token');
      return this.helper.decodeToken(token).type;
    }
  }

  getSuperEntity() {
    if (this.isLoggedIn()) {
      const token = sessionStorage.getItem('token');
      return this.helper.decodeToken(token).super_entity;
    }
  }

  getLicense() {
    if (this.isLoggedIn()) {
      const token = sessionStorage.getItem('token');
      return this.helper.decodeToken(token).license;
    }
  }

  getCountryId() {
    const token = sessionStorage.getItem('token');
    return this.helper.decodeToken(token).countryid;
  }

  logout() {
    sessionStorage.clear();
    window.location.replace('/');
  }

}
