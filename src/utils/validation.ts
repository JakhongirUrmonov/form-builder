import { InputConfig, InputTypeEnum } from "../types/FormConfig";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateFormValues = (
  values: Record<string, any>,
  inputs: InputConfig[]
): ValidationResult => {
  const errors: Record<string, string> = {};
  let isValid = true;

  inputs.forEach((input) => {
    const value = values[input.name];
    const validation = input.validation;

    if (validation?.required && (value === undefined || value === "")) {
      errors[input.name] = "This field is required";
      isValid = false;
    }

    if (validation?.pattern && typeof value === "string") {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        errors[input.name] = "Invalid format";
        isValid = false;
      }
    }

    // Type-specific validation
    switch (input.type) {
      case InputTypeEnum.NUMERIC:
        if (value && isNaN(Number(value))) {
          errors[input.name] = "Must be a number";
          isValid = false;
        }
        break;
      case InputTypeEnum.DATE:
        if (value && isNaN(Date.parse(value))) {
          errors[input.name] = "Invalid date";
          isValid = false;
        }
        break;
    }
  });

  return { isValid, errors };
};

export const validateFormConfig = (config: any): string | null => {
  if (!config || typeof config !== "object") {
    return "Invalid configuration format";
  }

  if (!config.title || typeof config.title !== "string") {
    return "Title is required and must be a string";
  }

  if (!Array.isArray(config.inputs)) {
    return "Inputs must be an array";
  }

  if (!Array.isArray(config.buttons)) {
    return "Buttons must be an array";
  }

  return null;
};
