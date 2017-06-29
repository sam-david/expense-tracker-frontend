import { Component, OnInit } from '@angular/core';
import {ReportService} from "../services/report.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  errorMessage: string;
  reports: any;

  constructor(private reportService: ReportService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.userSignedIn$) {
      this.getReport()
    } else {
      var that = this;
      setTimeout(function() {
        that.getReport()
      }, 2500)
    }
  }

  getReport() {
    this.reportService.getReport()
                     .subscribe(
                       reports => this.reports = reports,
                       error =>  this.errorMessage = <any>error);
  }

}
