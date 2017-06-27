import { Component } from '@angular/core';
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
}
