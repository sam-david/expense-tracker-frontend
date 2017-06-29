import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ExpenseService} from "../services/expense.service";
import {Expense} from "./expense.interface";
import $ from "jquery";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})


export class ExpensesComponent implements OnInit {
  errorMessage: string;
  expenses: Expense[];
  mode = 'Observable';

  constructor(private expenseService: ExpenseService, private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.userSignedIn$) {
      this.getExpenses()
    } else {
      var that = this;
      setTimeout(function() {
        that.getExpenses()
      }, 2500)
    }
  }

  getExpenses() {
    this.expenseService.getExpenses()
                     .subscribe(
                       expenses => this.expenses = expenses,
                       error =>  this.errorMessage = <any>error);
  }

  addExpense(description: string, amount: number, transactionDate: Date) {
    this.errorMessage = null;
    // validations
    if (!$.isNumeric(amount)) {
      this.errorMessage = "Amount is not numeric"
      return;
    }
    if (!description || !amount || !transactionDate) {
      this.errorMessage = "All fields must be complete"
      return;
    }
    this.expenseService.create(description, amount, transactionDate)
                     .subscribe(
                       expense  => this.expenses.push(expense),
                       error =>  this.errorMessage = <any>error);
  }
}
