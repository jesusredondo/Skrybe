import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlServidorService {

  constructor() { }

  getUrlBase(){
      return "http://localhost:3000/";
  }
}
