import {Component, Input, input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentService} from '../../services/Appointment.service';
import {Router} from '@angular/router';
import {ContactNumberValidator, DateTimeValidator, IdCardValidator} from '../../validators/appointment.validator';
import {AppointmentAddUpdate} from '../../dto/Appointment-Add-Update.dto';
import {Appointment} from '../../dto/Appointment.dto';

@Component({
  selector: 'app-edit-appointment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.css'
})
export class EditAppointmentComponent implements OnInit{
  appointmentForm !: FormGroup;
  @Input()
  id!: number;

  appointment!: Appointment;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router: Router) {

  }

  getAppointment() {
    this.appointmentService.getAppointment(this.id).subscribe((response: Appointment) => {
      this.appointment = response;
      const [day, month, year] = this.appointment.appointmentDate.split('/');
      const formattedTime = this.appointment.appointmentTime.length === 5 ? this.appointment.appointmentTime : this.appointment.appointmentTime.slice(0, 5);
      const datetime = `${year}-${month}-${day}T${formattedTime}`
      this.appointmentForm = this.formBuilder.group({
        animalType : [this.appointment.animalType, [Validators.required]],
        appointmentDateTime: [datetime, [Validators.required, DateTimeValidator()]],
        appointmentDuration: [this.appointment.appointmentDuration, [Validators.required]],
        ownerContactNumber: [this.appointment.ownerContactNumber, [Validators.required, ContactNumberValidator()]],
        ownerIdCardNumber : [this.appointment.ownerIdCardNumber, [Validators.required, IdCardValidator()]],
        ownerName: [this.appointment.ownerName, [Validators.required]],
        ownerSurname: [this.appointment.ownerSurname, [Validators.required]],
        patientName: [this.appointment.patientName, [Validators.required]],
        reasonForAppointment: [this.appointment.reasonForAppointment, [Validators.required]],
        vetNotes: [this.appointment.vetNotes, [Validators.required]],
      })
    });

  }

  ngOnInit(): void {
    this.getAppointment();

  }
  UpdateAppointment(): void {
    const formValue = this.appointmentForm.value;
    const [date, time] = formValue.appointmentDateTime.split('T');
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    const timeFormatted = time.slice(0, 5);
    delete formValue.appointmentDateTime;

    console.log(JSON.stringify(this.appointmentForm.value));
    const AppointmentToAdd: AppointmentAddUpdate = {...formValue, appointmentDate: formattedDate, appointmentTime: timeFormatted}
    console.log(AppointmentToAdd);
    this.appointmentService.updateAppointment(this.id, AppointmentToAdd).subscribe((addedAppointment: Appointment) => {
      console.log(JSON.stringify(addedAppointment));
      this.router.navigate(["/list-appointments"]);
    });
  }

  shouldProcessControlValidationMessages(controlName: string) {
    let control = this.appointmentForm.get(controlName);
    return ((control!.touched || control!.dirty) && control!.errors);
  }
}
