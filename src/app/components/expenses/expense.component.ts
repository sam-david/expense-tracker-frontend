import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-expense',
  templateUrl: './expense.component.html'
})

export class ExpenseComponent {
  id: number;
  description: string;
  amount: number;
}
