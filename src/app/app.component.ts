import { Component } from '@angular/core';
import {Angular2TokenService} from "angular2-token";
import {environment} from "../environments/environment";
import { ExpenseComponent } from './components/expenses/expense.component';

const EXPENSES: ExpenseComponent[] = [
  { id: 11, description: 'Mr. Nice', amount: 20 },
  { id: 11, description: 'Mr. Nice', amount: 21 },
  { id: 11, description: 'Mr. Nice', amount: 23 },
  { id: 11, description: 'Mr. Nice', amount: 53 }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Expense Tracker';
  stringTest = 'HELLO';
  expenses = EXPENSES;

  constructor(private authToken: Angular2TokenService){
    this.authToken.init(environment.token_auth_config);

    this.authToken.signIn({email: "sfd1987@gmail.com", password: "test123"}).subscribe(

        res => {

          console.log('auth response:', res);
          console.log('auth response headers: ', res.headers.toJSON()); //log the response header to show the auth token
          console.log('auth response body:', res.json()); //log the response body to show the user
        },

        err => {
          console.error('auth error:', err);
        }
    )
  }
}
