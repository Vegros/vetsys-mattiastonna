import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListAppointmentsComponent} from './components/list-appointments/list-appointments.component';
import {AddAppointmentComponent} from './components/add-appointment/add-appointment.component';
import {ViewAppointmentComponent} from './components/view-appointment/view-appointment.component';
import {EditAppointmentComponent} from './components/edit-appointment/edit-appointment.component';

export const routes: Routes = [
    {path:"login", component: LoginComponent},
    {path: "list-appointments", component: ListAppointmentsComponent},
    {path: "add-appointment", component: AddAppointmentComponent},
    {path: "appointment/:id", component: ViewAppointmentComponent},
    {path: "edit-appointment/:id", component: EditAppointmentComponent},
    {path: "**", redirectTo: "/list-appointments", pathMatch: "full"},
];
