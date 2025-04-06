export const FORM_CONSTANTS = {
  VALIDATION: {
    MAX_STRING_LENGTH: 50,
    MIN_STRING_LENGTH: 2,
    MAX_NUMBER: 100,
    MIN_NUMBER: 1,
    DATE_FORMAT: "YYYY-MM-DD",
  },
  INPUT_TYPES: {
    STRING: "string",
    NUMERIC: "numeric",
    MULTILINE: "multiline",
    BOOLEAN: "boolean",
    DATE: "date",
    ENUM: "enum",
  } as const,
  ERROR_MESSAGES: {
    REQUIRED: "This field is required",
    INVALID_PATTERN: "Invalid format",
    MIN_LENGTH: (min: number) => `Minimum length is ${min} characters`,
    MAX_LENGTH: (max: number) => `Maximum length is ${max} characters`,
    MIN_NUMBER: (min: number) => `Minimum value is ${min}`,
    MAX_NUMBER: (max: number) => `Maximum value is ${max}`,
    INVALID_DATE: "Invalid date format",
  },
} as const;

export type InputType =
  (typeof FORM_CONSTANTS.INPUT_TYPES)[keyof typeof FORM_CONSTANTS.INPUT_TYPES];
