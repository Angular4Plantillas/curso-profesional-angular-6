import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../../config/api';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  // vehicles: Array<Vehicle> = [
  //   {
  //     id: 1,
  //     manufacturer: 'Porsche',
  //     model: '911',
  //     price: 135000,
  //     wiki: 'http://en.wikipedia.org/wiki/Porsche_997',
  //     img: '2004_Porsche_911_Carrera_type_997.jpg'
  //   }, {
  //     id: 2,
  //     manufacturer: 'Nissan',
  //     model: 'GT-R',
  //     price: 80000,
  //     wiki: 'http://en.wikipedia.org/wiki/Nissan_Gt-r',
  //     img: '250px-Nissan_GT-R.jpg'
  //   }, {
  //     id: 3,
  //     manufacturer: 'BMW',
  //     model: 'M3',
  //     price: 60500,
  //     wiki: 'http://en.wikipedia.org/wiki/Bmw_m3',
  //     img: '250px-BMW_M3_E92.jpg'
  //   }, {
  //     id: 4,
  //     manufacturer: 'Audi',
  //     model: 'S5',
  //     price: 53000,
  //     wiki: 'http://en.wikipedia.org/wiki/Audi_S5#Audi_S5',
  //     img: '250px-Audi_S5.jpg'
  //   }, {
  //     id: 5,
  //     manufacturer: 'Audi',
  //     model: 'TT',
  //     price: 40000,
  //     wiki: 'http://en.wikipedia.org/wiki/Audi_TT',
  //     img: '250px-2007_Audi_TT_Coupe.jpg'
  //   }];

  constructor(
    public _http: HttpClient, public _sessionStorage: SessionStorageService) {
  }

  // getVehicles() {
  //   return {
  //     data: this.vehicles
  //   };
  // }

  getVehicles(): Observable<Array<Vehicle>> {
    const serviceURL = `${API.DATA_SERVICES_BASE_URL}/vehicles`;
    return this._http.get<Array<Vehicle>>(serviceURL);
  }

  getVehiclesByUsingToken(): Observable<Array<Vehicle>> {
    const serviceURL = `${API.DATA_SERVICES_BASE_URL}/rentals/user`;
    const user = this._sessionStorage.retrieve('user');

    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${user.token}`
      });

    return this._http.get<Array<Vehicle>>(serviceURL, {headers: headers});
  }

  getVehicle(id: number): Observable<Vehicle> {
    const serviceURL = `${API.DATA_SERVICES_BASE_URL}/vehicles/${id}`;
    return this._http.get<Vehicle>(serviceURL);
    // return this.vehicles.find(vehicle => vehicle.id === id);
  }
}
