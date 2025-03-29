import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from 'rxjs';
import {Appointment} from '../dto/Appointment.dto';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {AppointmentAddUpdate} from '../dto/Appointment-Add-Update.dto';

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
    return this.httpClient.get<Appointment[]>(this.endpoint, this.httpHeader);
  }
  addAppointment(appointment: AppointmentAddUpdate): Observable<Appointment> {
    return this.httpClient.post<Appointment>(this.endpoint, appointment,  this.httpHeader);
  }
  getAppointment(appointmentId: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(this.endpoint + `/${appointmentId}`,  this.httpHeader);
  }
  updateAppointment(appointmentId: number, appointment: AppointmentAddUpdate): Observable<Appointment> {
    return this.httpClient.put<Appointment>(this.endpoint + `/${appointmentId}`,appointment,  this.httpHeader);
  }


}
