import {CanActivateFn, Router, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListAppointmentsComponent} from './components/list-appointments/list-appointments.component';
import {AddAppointmentComponent} from './components/add-appointment/add-appointment.component';
import {ViewAppointmentComponent} from './components/view-appointment/view-appointment.component';
import {EditAppointmentComponent} from './components/edit-appointment/edit-appointment.component';
import {inject} from '@angular/core';

const AuthGuardService: CanActivateFn = (route, segments) => {
  const router = inject(Router);
  if(localStorage.getItem('token')){
    const role = localStorage.getItem('role');
    const path = route.routeConfig?.path;
    if (path === 'add-appointment') {
      if (role === 'RECEPTIONIST' || role === 'ADMIN') return true;
    }

    if (path === 'edit-appointment/:id') {
      if (role === 'VET' || role === 'ADMIN') return true;
      if (role === 'RECEPTIONIST') return true;
    }
    if (path === 'list-appointments' || path === 'appointment/:id') {
      return true;
    }

    router.navigate(['/list-appointments']);
    return false;
  }
  else{
    router.navigate(['/login']);
    return false
  }
}



export const routes: Routes = [
    {path:"login", component: LoginComponent},
    {path: "list-appointments", component: ListAppointmentsComponent, canActivate: [AuthGuardService]},
    {path: "add-appointment", component: AddAppointmentComponent, canActivate: [AuthGuardService]},
    {path: "appointment/:id", component: ViewAppointmentComponent, canActivate: [AuthGuardService]},
    {path: "edit-appointment/:id", component: EditAppointmentComponent, canActivate: [AuthGuardService]},
    {path: "**", redirectTo: "/list-appointments", pathMatch: "full"},
];
