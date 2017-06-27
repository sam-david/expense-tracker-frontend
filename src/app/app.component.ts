import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<h1>{{title}}</h1><h2>{{stringTest}} details!</h2>`
})

export class AppComponent {
  title = 'Expense Tracker';
  stringTest = 'HELLO';
  expenses = [];
}
