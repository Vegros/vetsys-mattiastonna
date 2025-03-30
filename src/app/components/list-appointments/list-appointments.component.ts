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
    const element = this.appointmentTable.nativeElement;

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {
      raw: false
    });

    const range = XLSX.utils.decode_range(worksheet['!ref']!);
    const columnCount = range.e.c;
    const rowCount = range.e.r;

    let statusColIndex = -1;
    for (let col = 0; col <= columnCount; col++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
      const headerValue = worksheet[headerCell]?.v?.toString().trim().toLowerCase();

      if (headerValue === 'status') {
        statusColIndex = col;
        break;
      }
    }

    if (statusColIndex !== -1) {
      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        const statusCellRef = XLSX.utils.encode_cell({ r: rowIndex, c: statusColIndex });
        const statusValue = worksheet[statusCellRef]?.v?.toString().trim().toLowerCase();

        if (!statusValue) continue;

        const isUpcoming = statusValue === 'upcoming';
        const fillColor = isUpcoming ? 'D4EDDA' : 'F8D7DA'; // Green or Red

        for (let colIndex = 0; colIndex <= columnCount; colIndex++) {
          const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
          const cell = worksheet[cellRef];
          if (!cell) continue;

          cell.s = {
            fill: { fgColor: { rgb: fillColor } },
            font: { color: { rgb: '000000' } },
            alignment: { horizontal: 'left' }
          };
        }
      }
    }

    const lastCol = range.e.c;
    for (let row = range.s.r; row <= range.e.r; row++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: lastCol });
      delete worksheet[cellAddress];
    }

    range.e.c = lastCol - 1;
    worksheet['!ref'] = XLSX.utils.encode_range(range);

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Appointments': worksheet },
      SheetNames: ['Appointments']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    });

    saveAs(blob, 'appointments.xlsx');
  }
}
