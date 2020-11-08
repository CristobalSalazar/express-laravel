export type ValidationOption = {
  required?: boolean;
  min?: number;
  max?: number;
  isString?: boolean;
  isNumber?: boolean;
  isArray?: boolean;
  isObject?: boolean;
  match?: RegExp;
};

export type ValidationOptions = {
  [key: string]: ValidationOption;
};

export function requiredValidation(val: any) {
  return val !== null && val !== undefined;
}

export function isStringValidation(val: any) {
  return typeof val === "string";
}

export function isNumberValidation(val: any) {
  return typeof val === "number";
}
