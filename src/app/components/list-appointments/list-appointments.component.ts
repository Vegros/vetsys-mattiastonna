import {Component, OnInit} from '@angular/core';
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
export class ListAppointmentsComponent implements OnInit {
  appointments: Appointment[] = []

  constructor(private appointmentService: AppointmentService) {

  }

  initialiseAppointments() {
    this.appointmentService.getAppointments().subscribe((response: Appointment[]) => {
      this.appointments = response;
    });
  }

  isAppointmentInPast(dateTimeStr: string): boolean {
    if(localStorage.getItem('role') == "RECEPTIONIST") {
      const [datePart, timePart] = dateTimeStr.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');

      const parsedDate = new Date(+year, +month - 1, +day, +hours, +minutes);
      const now = new Date();

      return parsedDate < now;
    }
    else{
      return false;
    }

  }

  isAdmin(): boolean {
    return localStorage.getItem('role') != "ADMIN";

  }



  ngOnInit(): void {
    this.initialiseAppointments();
  }


  deleteItem(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        alert('Appointment deleted successfully!');
        this.initialiseAppointments();
      }
    });
  }


}
