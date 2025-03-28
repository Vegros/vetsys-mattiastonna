import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../dto/Appointment.dto';
import {AppointmentService} from '../../services/Appointment.service';

@Component({
  selector: 'app-view-appointment',
  imports: [],
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.css'
})
export class ViewAppointmentComponent implements OnInit {
  @Input()
  id!: number;

  appointment!: Appointment;

  constructor(private appointmentService: AppointmentService) {

  }
  getAppointment() {
    this.appointmentService.getAppointment(this.id).subscribe((response: Appointment) => {
      this.appointment = response;
    });

  }

  ngOnInit(): void {
    this.getAppointment();
  }

}
