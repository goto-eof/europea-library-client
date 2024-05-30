import { Component } from '@angular/core';
import AuthService from '../../../service/AuthService';

@Component({
  selector: 'app-control-panel-small',
  templateUrl: './control-panel-small.component.html',
  styleUrl: './control-panel-small.component.css',
})
export class ControlPanelSmallComponent {
  constructor(private authService: AuthService) {}
  isAdministrator() {
    return this.authService.isAdminAuthenticated();
  }
}
