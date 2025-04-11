import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../dto/Appointment.dto';
import {AppointmentService} from '../../services/Appointment.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {generateStatusPipe} from '../../pipes/status.pipe';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import XLSX from "xlsx-js-style"
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import {AppointmentExportDto} from '../../dto/AppointmentExport.dto';

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'This appointment will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService.deleteAppointment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The appointment has been removed.', 'success');
            this.initialiseAppointments();
          }
        });


      }
      else{
        Swal.fire('Oops...', 'Appointment deletion is canceled!', 'error');
      }
    });

  }


  exportTableToPDF() {
    const tableElement = this.appointmentTable.nativeElement;

    const elementsToHide = tableElement.querySelectorAll('.no-print');
    elementsToHide.forEach((el: any) => el.style.display = 'none');

    html2canvas(tableElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('appointments.pdf');

      elementsToHide.forEach((el: any) => el.style.display = '');
    });
  }




  exportTableToExcel() {
    const appointmentsDto: AppointmentExportDto[] = this.appointments.map((a, index) =>
      new AppointmentExportDto(
        a.appointmentId,
        a.patientName,
        a.animalType,
        `${a.ownerName} ${a.ownerSurname}`,
        a.ownerIdCardNumber,
        a.ownerContactNumber,
        a.appointmentDate,
        +a.appointmentDuration,
        a.reasonForAppointment,
        a.vetNotes ? a.vetNotes : "",
        this.getStatus(a.appointmentDate + ' ' + a.appointmentTime) ? 'Past' : 'Upcoming'
      )
    );

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      appointmentsDto.map(dto => dto.Export())
    );
    const range = XLSX.utils.decode_range(worksheet['!ref']!);
    let statusColIndex = -1;

    for (let col = 0; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      const cell = worksheet[cellAddress];
      if (cell?.v?.toString().trim().toLowerCase() === 'status') {
        statusColIndex = col;
        break;
      }
    }
    if (statusColIndex !== -1) {
      for (let row = 1; row <= range.e.r; row++) {
        const statusCellAddress = XLSX.utils.encode_cell({ r: row, c: statusColIndex });
        const statusValue = worksheet[statusCellAddress]?.v;

        if (statusValue?.toLowerCase() === 'past') {
          for (let col = 0; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            const cell = worksheet[cellAddress];

            if (cell) {
              cell.s = {
                fill: { fgColor: { rgb: 'F8D7DA' } }, // light red
                font: { color: { rgb: '000000' } },
                alignment: { horizontal: 'left' }
              };
            }
          }
        }
        else{
            for (let col = 0; col <= range.e.c; col++) {
              const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
              const cell = worksheet[cellAddress];

              if (cell) {
                cell.s = {
                  fill: { fgColor: { rgb: 'C6EFCE' } },
                  font: { color: { rgb: '000000' } },
                  alignment: { horizontal: 'left' }
                };
              }
            }
        }
      }
    }


    const workbook: XLSX.WorkBook = {
      Sheets: { 'Appointments': worksheet },
      SheetNames: ['Appointments']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });

    saveAs(blob, 'appointments.xlsx');
  }

  private getStatus(appointmentDateTime: any) {
    const [datePart, timePart] = appointmentDateTime.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    const parsedDate = new Date(+year, +month - 1, +day, +hours, +minutes);
    const now = new Date();
    return parsedDate < now
  }
}
