import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Expense } from '../expenses/expense.interface';

@Injectable()
export class ExpenseService {
  private expensesUrl = 'expenses';  // URL to web API

  constructor (private http: Http) {}

  getExpenses(): Observable<Expense[]> {
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
    return this.http.get('http://localhost:3000/expenses', options)
                    .map(this.extractExpensesData)
                    .catch(this.handleError);
  }

  create(description: string, amount: number, transactionDate: Date): Observable<Expense> {
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

    let formData = {
      description: description,
      amount: amount,
      transaction_date: transactionDate
    }

    return this.http.post('http://localhost:3000/expenses', formData, options)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  private extractExpensesData(res: Response) {
    let body = res.json();
    console.log("EXPENSES: ", body.expenses)
    return body.expenses || { };
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
