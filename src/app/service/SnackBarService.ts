import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const snackBarErrorConfiguration: MatSnackBarConfig<any> = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  duration: 2500,
  panelClass: ['error'],
};

const snackBarSuccessConfiguration: MatSnackBarConfig<any> = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  duration: 2500,
  panelClass: ['success'],
};

@Injectable()
export default class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showErrorWithMessage(message: string) {
    this.snackBar.open(message, 'Close', snackBarErrorConfiguration);
  }

  showInfoWithTitleAndMessage(message: string) {
    this.snackBar.open(message, 'Close', snackBarSuccessConfiguration);
  }
}
