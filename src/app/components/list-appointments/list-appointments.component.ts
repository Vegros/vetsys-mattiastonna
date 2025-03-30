import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../dto/Appointment.dto';
import {AppointmentService} from '../../services/Appointment.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {generateStatusPipe} from '../../pipes/status.pipe';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-appointments',
  imports: [
    FormsModule,
    RouterLink,
    generateStatusPipe
  ],
  templateUrl: './list-appointments.component.html',
  styleUrl: './list-appointments.component.css'
})
export class ListAppointmentsComponent implements OnInit {
  @ViewChild('appointmentTable', { static: false }) appointmentTable!: ElementRef;
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


  exportTableToPDF() {
    const tableElement = this.appointmentTable.nativeElement;

    html2canvas(tableElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('appointments.pdf');
    });
  }
}
