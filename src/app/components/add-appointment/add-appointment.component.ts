import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentService} from '../../services/Appointment.service';
import {Router} from '@angular/router';
import {ContactNumberValidator, DateTimeValidator, IdCardValidator} from '../../validators/appointment.validator';
import {Appointment} from '../../dto/Appointment.dto';
import {AppointmentAddUpdate} from '../../dto/Appointment-Add-Update.dto';

@Component({
  selector: 'app-add-appointment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService, private router: Router) {

  }
  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      animalType : ['', [Validators.required]],
      appointmentDateTime: ['', [Validators.required, DateTimeValidator()]],
      appointmentDuration: ['', [Validators.required]],
      ownerContactNumber: ['', [Validators.required, ContactNumberValidator()]],
      ownerIdCardNumber : ['', [Validators.required, IdCardValidator()]],
      ownerName: ['', [Validators.required]],
      ownerSurname: ['', [Validators.required]],
      patientName: ['', [Validators.required]],
      reasonForAppointment: ['', [Validators.required]],
      vetNotes: ['', [Validators.required]],
    })
  }
  submitForm() {
    const formValue = this.appointmentForm.value;
    const [date, time] = formValue.appointmentDateTime.split('T');
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    const timeFormatted = time.slice(0, 5);
    delete formValue.appointmentDateTime;

    console.log(JSON.stringify(this.appointmentForm.value));
    const AppointmentToAdd: AppointmentAddUpdate = {...formValue, appointmentDate: formattedDate, appointmentTime: timeFormatted}
    console.log(AppointmentToAdd);
    this.appointmentService.addAppointment(AppointmentToAdd).subscribe((addedAppointment: Appointment) => {
      console.log(JSON.stringify(addedAppointment));
      this.router.navigate(["/list-appointments"]);
    });
  }

  shouldProcessControlValidationMessages(controlName: string) {
    let control = this.appointmentForm.get(controlName);
    return ((control!.touched || control!.dirty) && control!.errors);
  }
}
