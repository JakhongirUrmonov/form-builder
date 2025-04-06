export enum InputTypeEnum {
  NUMERIC = "numeric",
  STRING = "string",
  MULTILINE = "multi-line",
  BOOLEAN = "boolean",
  DATE = "date",
  ENUM = "enum",
}

export type InputType = `${InputTypeEnum}`;

export interface ValidationConfig {
  required?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => string | null;
}

export interface InputConfig {
  name: string;
  label: string;
  type: InputTypeEnum;
  validation?: ValidationConfig;
  options?: string[]; // Only for enum Inputs
}

export interface ButtonConfig {
  text: string;
  type?: "submit" | "reset" | "button";
}

export interface FormConfig {
  title: string;
  inputs: InputConfig[];
  buttons: ButtonConfig[];
}
