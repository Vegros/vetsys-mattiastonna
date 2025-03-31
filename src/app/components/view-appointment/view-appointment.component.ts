import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../dto/Appointment.dto';
import {AppointmentService} from '../../services/Appointment.service';
import {Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-appointment',
  imports: [
    RouterLink
  ],
  templateUrl: './view-appointment.component.html',
  styleUrl: './view-appointment.component.css'
})
export class ViewAppointmentComponent implements OnInit {
  @Input()
  id!: number;

  appointment!: Appointment;

  constructor(private appointmentService: AppointmentService, private router: Router) {

  }
  getAppointment() {
    this.appointmentService.getAppointment(this.id).subscribe({next: (response: Appointment) => {
      if(!response){
        this.router.navigate(['/list-appointments']);
      }
      this.appointment = response;
    },
    error: (err) => {
        this.router.navigate(['/list-appointment']);
        Swal.fire('Not Found', 'Appointment not found or server error', 'error');
    }
    });

  }

  ngOnInit(): void {
    this.getAppointment();
  }

}
