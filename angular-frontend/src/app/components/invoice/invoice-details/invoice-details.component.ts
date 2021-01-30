import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../classes/doctor';
import { Patient } from '../../../classes/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { PatientService } from '../../../services/patient.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice } from '../../../classes/invoice';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: [ './invoice-details.component.css' ]
})
export class InvoiceDetailsComponent implements OnInit {

  invoiceId: string;
  doctor: Doctor;
  patient: Patient;
  invoice: Invoice;
  currentDate = new Date();

  // date: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private doctorService: DoctorService,
              private patientService: PatientService,
              private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.doctor = new Doctor();
    this.patient = new Patient();
    this.invoice = new Invoice();
    this.currentDate = new Date();

    this.invoiceId = this.route.snapshot.params['id'.toString()];
    this.invoiceService.get(this.invoiceId).subscribe(
      (invoiceData) => {
        this.invoice = invoiceData;
        console.log(this.invoice);
        this.patientService.get(this.invoice.patientid).subscribe(
          (patientData: Patient) => {
            this.patient = patientData;
          }
        );
        this.doctorService.get(this.invoice.doctorid).subscribe(
          (doctorData: Doctor) => {
            this.doctor = doctorData;
          }
        );
      }
    );
  }

  cancel() {
    this.router.navigate([ 'reports/details', this.invoiceId ]);
  }

  public downloadPDF() {
    const data = document.getElementById('pdf');
    html2canvas(data).then(canvas => {
      // Dimensions

      const imgWidth = 250;
      const pageHeight = 275;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('prescription.pdf'); // Generated PDF
    });
  }
}
