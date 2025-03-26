import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {AuthDto} from '../dto/Auth.dto';
import {Observable} from 'rxjs';
import {StatusDto} from '../dto/Status.dto';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = "http://localhost:8080/authenticate"

  httpHeader= {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  constructor(private httpClient: HttpClient) { }

  login( login: AuthDto): Observable<StatusDto> {
    return this.httpClient.post<StatusDto>(this.endpoint, login, this.httpHeader);
  }


}
