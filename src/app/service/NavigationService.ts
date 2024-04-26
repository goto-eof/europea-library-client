import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export const UPDATE_NAV_BAR_AFTER_LOGIN = 'UPDATE_NAV_BAR_AFTER_LOGIN';
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private searchSource = new BehaviorSubject<string | undefined>(undefined);

  public setValue(value: string) {
    this.searchSource.next(value);
  }

  public getObservable() {
    return this.searchSource.asObservable();
  }
}
