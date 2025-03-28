import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ContactNumberValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    const isValid = /^[0-9]{8,}$/.test(value);
    return isValid ? null : { invalidContactNumber: true };

  }

}

export function IdCardValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    const isValid =  (/^\d+[a-zA-Z]$/.test(value))
    return isValid ? null : { invalidIdCard: true };
  }

}
export function DateTimeValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const selectedDateTime = new Date(value);
    const now = new Date();

    if (isNaN(selectedDateTime.getTime())) return null;

    return selectedDateTime >= now ? null : { invalidDate: true };

  }

}

