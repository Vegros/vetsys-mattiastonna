import { Component } from '@angular/core';
import {Appointment} from '../../dto/Appointment.dto';
import {AppointmentService} from '../../services/Appointment.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-appointments',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.css'
})
export class ListAppointmentsComponent {
  appointments: Appointment[] = []

  constructor(private appointmentService: AppointmentService) {

  }

  initialiseAppointments() {
    this.appointmentService.getAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    });
  }

  ngOnInit(): void {
    this.initialiseAppointments();
  }



}
