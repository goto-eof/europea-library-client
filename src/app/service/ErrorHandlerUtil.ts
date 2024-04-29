import { Router } from '@angular/router';

export default class ErrorHandlerUtil {
  static handleError(e: any, router: Router) {
    if (e.error.code === 503) {
      router.navigate(['/work-in-progress']);
      return;
    }
    if (e.error.code >= 500) {
      router.navigate(['/internal-server-error']);
    }
  }
}
