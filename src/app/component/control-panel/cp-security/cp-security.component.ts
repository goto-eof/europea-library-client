import { Component, OnInit } from '@angular/core';
import SnackBarService from '../../../service/SnackBarService';
import ApplicationSettingsService from '../../../service/ApplicationSettingsService';
import ApplicationSettings from '../../../model/ApplicationSettings';

@Component({
  selector: 'app-cp-security',
  templateUrl: './cp-security.component.html',
  styleUrl: './cp-security.component.css',
})
export class CpSecurityComponent implements OnInit {
  settings?: ApplicationSettings;

  constructor(
    private snackBarService: SnackBarService,
    private applicationSettingsService: ApplicationSettingsService
  ) {}

  ngOnInit(): void {
    this.applicationSettingsService.get().subscribe({
      next: (settings) => {
        this.settings = settings;
      },
      error: () => {
        this.snackBarService.showErrorWithMessage(
          'Something went wrong when trying to retrieve settings'
        );
      },
    });
  }

  update(propertyName: string, newValue: boolean) {
    this.applicationSettingsService
      .update({
        ...this.settings,
        [propertyName]: newValue,
      })
      .subscribe({
        next: (settings) => {
          this.settings = settings;
          this.snackBarService.showInfoWithMessage('Saved');
        },
        error: () => {
          this.snackBarService.showErrorWithMessage(
            'Something went wrong when trying to update settings'
          );
        },
      });
  }
}
