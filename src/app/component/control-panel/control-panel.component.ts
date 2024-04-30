import { Component, OnDestroy, OnInit } from '@angular/core';
import AuthService from '../../service/AuthService';
import JobService from '../../service/JobService';
import SnackBarService from '../../service/SnackBarService';
import { Router } from '@angular/router';
import User from '../../model/User';
import OperationStatus from '../../model/OperationStatus';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css',
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  user?: User;
  roles: Array<string> = [];
  intervalId?: any;
  isJobRunning: boolean = false;
  isStopRequestMade: boolean = false;
  isStartRequestMade: boolean = false;
  private checkIsJobRunningTime: number = environment.checkIsJobRunningTime;

  constructor(
    private authService: AuthService,
    private router: Router,
    private jobService: JobService,
    private snackBarService: SnackBarService
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {
    const user = this.authService.getUserFromLocal();
    this.checkJobIsRunning();
    this.user = user;
    this.roles = user?.authorityList?.map((auth) => auth.name);
  }

  checkJobIsRunning() {
    const that = this;
    this.intervalId = window.setInterval(function () {
      that.jobService.isJobRunning().subscribe({
        next: (operationStatus: OperationStatus) => {
          that.isJobRunning = operationStatus.status;
        },
        error: (e) => {
          console.log(e);
          if (e.error.code === 503) {
            that.isJobRunning = true;
            console.log(that.isJobRunning);
            return;
          }
        },
      });
    }, this.checkIsJobRunningTime);
  }

  runTheJob() {
    this.isStartRequestMade = true;
    this.jobService.runJob().subscribe({
      next: (response) => {
        this.isStartRequestMade = false;
        if (response.status) {
          this.snackBarService.showInfoWithMessage('Job started');
          return;
        }
        this.snackBarService.showInfoWithMessage('Job is not running');
      },
      error: (e) => {
        this.isStartRequestMade = false;
        if (e.error.code === 503) {
          this.snackBarService.showInfoWithMessage('Job already running');
          return;
        }
        this.snackBarService.showErrorWithMessage(
          'Unable to start the job: ' + e.message
        );
      },
    });
  }

  stopTheJob() {
    this.isStopRequestMade = true;
    this.jobService.stopJob().subscribe({
      next: (response) => {
        this.isStopRequestMade = false;
        if (response.status) {
          this.snackBarService.showInfoWithMessage('Job stopped');
          return;
        }
        this.snackBarService.showInfoWithMessage('Unable to stop the job');
      },
      error: (e: any) => {
        this.isStopRequestMade = false;
        this.snackBarService.showErrorWithMessage(
          'Unable to stop the job: ' + e.message
        );
      },
    });
  }
  isAdministrator() {
    return this.authService.isAdminAuthenticated();
  }

  gotoChangePassword() {
    this.router.navigate(['/change-password']);
  }
}