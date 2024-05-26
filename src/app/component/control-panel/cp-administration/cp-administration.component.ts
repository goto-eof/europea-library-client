import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import OperationStatus from '../../../model/OperationStatus';
import AuthService from '../../../service/AuthService';
import JobService from '../../../service/JobService';
import CacheLoaderService from '../../../service/CacheLoaderService';
import SnackBarService from '../../../service/SnackBarService';

@Component({
  selector: 'app-cp-administration',
  templateUrl: './cp-administration.component.html',
  styleUrl: './cp-administration.component.css',
})
export class CpAdministrationComponent implements OnInit, OnDestroy {
  intervalId?: any;
  isJobRunning: 'yes' | 'no' | 'checking' = 'checking';
  isStopRequestMade: boolean = false;
  isStartRequestMade: boolean = false;
  private checkIsJobRunningTime: number = environment.checkIsJobRunningTime;
  isReloadCacheRequestMade: boolean = false;
  isLoadingJobStatus: boolean = false;
  jobStepStatus: string = '';

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private snackBarService: SnackBarService,
    private reloadCacheService: CacheLoaderService
  ) {}

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {
    if (this.authService.isAdminAuthenticated()) {
      this.checkJobIsRunning();
    }
  }

  checkJobIsRunning() {
    const that = this;
    this.intervalId = window.setInterval(function () {
      that.jobService.isJobRunning().subscribe({
        next: (operationStatus: OperationStatus) => {
          that.isJobRunning = operationStatus.status ? 'yes' : 'no';
          that.jobStepStatus = operationStatus.message;
        },
        error: (e) => {
          if (e.error.code === 503) {
            that.isJobRunning = 'yes';
            that.jobStepStatus = '';
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
          this.isJobRunning = response.status ? 'yes' : 'no';
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
          this.isJobRunning = response.status ? 'yes' : 'no';
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

  reloadCache() {
    this.isReloadCacheRequestMade = true;
    this.reloadCacheService.reload().subscribe({
      next: (status) => {
        this.isReloadCacheRequestMade = false;

        if (status.status) {
          this.snackBarService.showInfoWithMessage(
            'Cache reloaded successfully'
          );
          return;
        }
        this.snackBarService.showInfoWithMessage('Cache not reloaded');
      },
      error: () => {
        this.isReloadCacheRequestMade = false;
        this.snackBarService.showErrorWithMessage(
          'Something went wrong when trying to reload cache.'
        );
      },
    });
  }
}
