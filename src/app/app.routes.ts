import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListAppointmentsComponent} from './components/list-appointments/list-appointments.component';
export const routes: Routes = [
    {path:"login", component: LoginComponent},
    {path: "list-appointments", component: ListAppointmentsComponent},
    {path: "**", redirectTo: "/list-appointments", pathMatch: "full"},
];
