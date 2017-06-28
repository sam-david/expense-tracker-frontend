import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ExpenseService} from "../services/expense.service";
import {Expense} from "./expense.interface";
import $ from "jquery";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})


export class ExpensesComponent implements OnInit {
  errorMessage: string;
  expenses: Expense[];
  mode = 'Observable';

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit() {
    var that = this;
    setTimeout(function() {
      that.getExpenses()
    }, 3000)
  }

  getExpenses() {
    this.expenseService.getExpenses()
                     .subscribe(
                       expenses => this.expenses = expenses,
                       error =>  this.errorMessage = <any>error);
  }

  addExpense(description: string, amount: number, transactionDate: Date) {
    console.log("Add expense")
    if (!description || !amount || !transactionDate) { return; }
    this.expenseService.create(description, amount, transactionDate)
                     .subscribe(
                       expense  => this.expenses.push(expense),
                       error =>  this.errorMessage = <any>error);
  }
}
