import { Validators } from '@angular/forms';

const REGEX_USERNAME = /^[A-Za-z][A-Za-z0-9_]{4,36}$/;
const REGEX_PASSWORD =
  /^(?=.*[0-9])(?=.*[!@#$%^&*_:;,.])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*_:;,.]{5,50}$/;

export default class FormValidatorService {
  static getUsernameValidator() {
    return Validators.pattern(REGEX_USERNAME);
  }
  static getPasswordValidator() {
    return Validators.pattern(REGEX_PASSWORD);
  }
}
