import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ExpenseService} from "../services/expense.service";
import {Expense} from "./expense.interface"

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {
  errorMessage: string;
  expenses: Expense[];
  mode = 'Observable';

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.expenseService.getExpenses()
                     .subscribe(
                       expenses => this.expenses = expenses,
                       error =>  this.errorMessage = <any>error);
  }

  addExpense(name: string, amount: number) {
    if (!name || !amount) { return; }
    this.expenseService.create(name)
                     .subscribe(
                       expense  => this.expenses.push(expense),
                       error =>  this.errorMessage = <any>error);
  }
}
