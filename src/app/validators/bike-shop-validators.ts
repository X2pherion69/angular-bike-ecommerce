import { FormControl, ValidationErrors } from '@angular/forms';

export class BikeShopValidators {
  // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors {
    if (control.value != null && control.value.trim().length === 0) {
      // invalid return error
      return { notOnlyWhiteSpace: true };
    } else {
      // valid
      return null;
    }
  }
}
