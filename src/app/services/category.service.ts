import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RME_URL_MAPPING} from './RME_URL_MAPPING';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(RME_URL_MAPPING.GET_CATEGORY_URL);
  }

}
