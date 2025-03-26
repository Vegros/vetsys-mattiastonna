import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';
import {Appointment} from '../dto/Appointment.dto';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  endpoint: string = "http://localhost:8080/appointment"

  httpHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    })
  }
  constructor(private httpClient: HttpClient) {

  }

  getAppointments(): Observable<Appointment[]> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Appointment[]>(this.endpoint, this.httpHeader);
  }

}
