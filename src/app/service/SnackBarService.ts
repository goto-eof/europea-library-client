import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const snackBarErrorConfiguration: MatSnackBarConfig<any> = {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  duration: 2500,
  panelClass: ['error'],
};

const snackBarSuccessConfiguration: MatSnackBarConfig<any> = {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  duration: 2500,
  panelClass: ['success'],
};

@Injectable()
export default class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showErrorWithMessage(message: string) {
    this.snackBar.open(message, 'Close', snackBarErrorConfiguration);
  }

  showInfoWithMessage(message: string) {
    this.snackBar.open(message, 'Close', snackBarSuccessConfiguration);
  }
}
