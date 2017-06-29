import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Report } from '../reports/report.interface';

@Injectable()
export class ReportService {
  constructor (private http: Http) {}

  getReport(): Observable<any> {
    let accessToken = localStorage.getItem('accessToken');
    let clientToken = localStorage.getItem('client');
    let uid = localStorage.getItem('uid');

    let headers = new Headers({
      'Content-Type': 'application/json',
      'access-token': accessToken,
      'client': clientToken,
      'token-type': 'Bearer',
      'uid': uid
     });

    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/reports', options)
                    .map(this.extractReportData)
                    .catch(this.handleError);
  }

  private extractReportData(res: Response) {
    let body = res.json();
    console.log("REPORTS: ", body)
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
