import { Injectable }              from '@angular/core';
import { Http, Response, Headers, RequestOptions  }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Expense } from '../expenses/expense.interface';

@Injectable()
export class ExpenseService {
  private expensesUrl = 'expenses';  // URL to web API

  constructor (private http: Http) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get(this.expensesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  create(name: string): Observable<Expense> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.expensesUrl, { name }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
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
