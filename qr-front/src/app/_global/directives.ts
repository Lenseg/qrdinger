import { AbstractControl, ValidatorFn } from '@angular/forms';

export function patternWarningWalidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const name = control.value;
    const yes = nameRe.test(name);
    return yes ? null : {'patternWarning': {name}};
  };
}
export function isHexColor(h: string) {
  const regexp = /^[0-9A-F]{6}$/i;
  return regexp.test(h);
}
