import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

    public _loading: boolean = false

    constructor(private http: HttpClient) {
    }

    get loading(): boolean {    
        return this._loading;
    }
}
