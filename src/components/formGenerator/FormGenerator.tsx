import React from "react";
import styles from "./FormGenerator.module.css";
import { useFormState } from "../../hooks/useFormState";
import FormField from "./FormField";
import SubmitButtonGroup from "./SubmitButtonGroup";
import { validateFormValues } from "../../utils/validation";

const FormGenerator: React.FC<{
  formState: ReturnType<typeof useFormState>;
}> = ({ formState }) => {
  const { state, dispatch } = formState;

  const handleChange = (
    fieldName: string,
    value: string | number | boolean | Date | null,
    validation?: { required?: boolean; pattern?: string }
  ) => {
    let error = "";

    // Required validation
    if (validation?.required && (value === "" || value === undefined)) {
      error = "This field is required";
    }

    // Pattern validation
    if (typeof value === "string" && validation?.pattern) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        error = "Invalid format";
      }
    }

    // Dispatch updates
    dispatch({ type: "UPDATE_FIELD", name: fieldName, value });

    // Dispatch validation errors
    dispatch({ type: "SET_ERROR", name: fieldName, error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateFormValues(
      state.formValues,
      state.fields.inputs
    );

    if (!validationResult.isValid) {
      // Update all validation errors
      Object.entries(validationResult.errors).forEach(([fieldName, error]) => {
        dispatch({ type: "SET_ERROR", name: fieldName, error });
      });
      return;
    }

    console.log("Form submitted with values:", state.formValues);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>{state.fields.title}</h2>
      {state.fields.inputs?.map((field) => (
        <FormField
          key={field.name}
          field={field}
          value={state.formValues[field.name]}
          error={state.errors?.[field.name]}
          onChange={handleChange}
        />
      ))}
      <SubmitButtonGroup
        buttons={state.fields.buttons}
        onSubmit={handleSubmit}
      />
    </form>
  );
};

export default FormGenerator;
