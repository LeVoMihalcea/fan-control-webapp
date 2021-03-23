import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Thresholds} from '../domain/Thresholds';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) { }

  getCurrentTemperature(): Observable<any>{
    return this.http.get<any>(environment.tempUrl + '/temperature');
  }

  getTemperatureQueue(): Observable<any>{
    return this.http.get<any>(environment.tempUrl + '/temperature/queue');
  }

  getThresholds(): Observable<any>{
    return this.http.get<any>(environment.tempUrl);
  }

  setThresholds(thresholds: any): Observable<any>{
    return this.http.post(environment.tempUrl, thresholds);
  }
}
