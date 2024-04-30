import { Component, Input, OnInit } from '@angular/core';
import AuthService from '../../service/AuthService';

export interface Named {
  name: string;
}

type ItemType = Named | string;

@Component({
  selector: 'app-entity-button',
  templateUrl: './entity-button.component.html',
  styleUrl: './entity-button.component.css',
})
export class EntityButtonComponent<ItemType, S> implements OnInit {
  @Input() item?: ItemType;
  @Input() that?: S;
  @Input() openParentModal?: (args: ItemType, that: S) => void;
  @Input() goToParentLink?: (args: ItemType, that: S) => void;
  name: string = '';
  @Input() isEditButtonEnabled: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.item) {
      this.name =
        typeof this.item === 'string' ? this.item : (this.item as any).name;
    }
  }

  isAdminAuthenticated(): any {
    return this.authService.isAdminAuthenticated();
  }

  openParentModalCallback() {
    if (this.openParentModal && this.item && this.that) {
      this.openParentModal(this.item, this.that);
    }
  }

  goToParentLinkCallback() {
    if (this.goToParentLink && this.item && this.that) {
      this.goToParentLink(this.item, this.that);
    }
  }
}
