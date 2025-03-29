import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AppointmentService} from '../../services/Appointment.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {

  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
