import { Component } from '@angular/core';
import AuthService from '../../../service/AuthService';

@Component({
  selector: 'app-control-panel-large',
  templateUrl: './control-panel-large.component.html',
  styleUrl: './control-panel-large.component.css',
})
export class ControlPanelLargeComponent {
  constructor(private authService: AuthService) {}
  isAdministrator() {
    return this.authService.isAdminAuthenticated();
  }
}
