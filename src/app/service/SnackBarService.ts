import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export default class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showErrorWithMessage(message: string) {
    this.snackBar.open('Application Error', message);
  }

  showErrorWithTitleAndMessage(title: string, message: string) {
    this.snackBar.open(title, message);
  }
}
