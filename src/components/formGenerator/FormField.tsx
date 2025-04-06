import React from "react";
import styles from "./FormGenerator.module.css";
import { InputConfig, InputTypeEnum } from "../../types/FormConfig";

interface FormFieldProps {
  field: InputConfig;
  value: any;
  error?: string;
  onChange: (
    name: string,
    value: string | number | boolean | Date | null,
    validation?: {
      required?: boolean;
      pattern?: string;
      min?: number;
      max?: number;
    }
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
}) => {
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow empty value or valid number
    if (newValue === "" || !isNaN(Number(newValue))) {
      onChange(
        field.name,
        newValue === "" ? "" : Number(newValue),
        field.validation
      );
    }
  };

  const commonProps = {
    id: field.name,
    name: field.name,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(
        field.name,
        (e.target as HTMLInputElement).type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
        field.validation
      ),
    className: styles.inputField,
  };

  const renderInputField = () => {
    switch (field.type) {
      case InputTypeEnum.NUMERIC:
        return (
          <input
            type="number"
            value={value === null || value === undefined ? "" : value}
            onChange={handleNumericChange}
            className={styles.inputField}
            min={field.validation?.min}
            max={field.validation?.max}
            step="any"
          />
        );
      case InputTypeEnum.STRING:
        return (
          <input
            type="text"
            {...commonProps}
            value={
              typeof value === "string" || typeof value === "number"
                ? value
                : ""
            }
          />
        );
      case InputTypeEnum.MULTILINE:
        return (
          <textarea
            {...commonProps}
            value={typeof value === "string" ? value : ""}
            className={styles.textArea}
          />
        );
      case InputTypeEnum.BOOLEAN:
        return (
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) =>
              onChange(field.name, e.target.checked, field.validation)
            }
            className={styles.checkbox}
          />
        );
      case InputTypeEnum.DATE:
        return (
          <input
            type="date"
            {...commonProps}
            value={typeof value === "string" ? value : ""}
          />
        );
      case InputTypeEnum.ENUM:
        return (
          <div className={styles.radioGroup}>
            {(field.options || []).map((option) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={value === option}
                  onChange={() =>
                    onChange(field.name, option, field.validation)
                  }
                  className={styles.radioInput}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={field.name} className={styles.label}>
        {field.label}
      </label>
      {renderInputField()}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormField;
