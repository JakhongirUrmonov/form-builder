import React, { useState, useEffect } from "react";
import styles from "./ConfigTab.module.css";
import { useFormState } from "../../hooks/useFormState";
import { FormConfig, InputTypeEnum } from "../../types/FormConfig";

const ConfigTab: React.FC<{ formState: ReturnType<typeof useFormState> }> = ({
  formState,
}) => {
  const { state, dispatch } = formState;
  const [jsonText, setJsonText] = useState(
    JSON.stringify(state.fields, null, 2)
  );
  const [isEdited, setIsEdited] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Update textarea when state changes externally
  useEffect(() => {
    setJsonText(JSON.stringify(state.fields, null, 2));
    setIsEdited(false);
    setJsonError(null);
  }, [state.fields]);

  const validateJsonStructure = (json: FormConfig): string | null => {
    if (typeof json !== "object" || json === null) {
      return "Invalid JSON structure";
    }

    // Validate required properties
    if (!json.title || typeof json.title !== "string") {
      return "Missing or invalid 'title' field";
    }
    if (!Array.isArray(json.inputs)) {
      return "'inputs' should be an array";
    }
    if (!Array.isArray(json.buttons)) {
      return "'buttons' should be an array";
    }

    // Validate each input field
    for (const input of json.inputs) {
      if (
        !input.name ||
        typeof input.name !== "string" ||
        !input.label ||
        typeof input.label !== "string" ||
        !input.type ||
        !Object.values(InputTypeEnum).includes(input.type as InputTypeEnum)
      ) {
        return `Invalid input field: ${JSON.stringify(input)}`;
      }

      if (
        input.type === "enum" &&
        (!Array.isArray(input.options) || input.options.length === 0)
      ) {
        return `Enum input '${input.name}' must have 'options' array`;
      }

      if (input.validation) {
        if (
          input.validation.required !== undefined &&
          typeof input.validation.required !== "boolean"
        ) {
          return `Invalid 'required' validation in '${input.name}'`;
        }
        if (
          input.validation.pattern !== undefined &&
          typeof input.validation.pattern !== "string"
        ) {
          return `Invalid 'pattern' validation in '${input.name}'`;
        }
      }
    }

    // Validate buttons
    for (const button of json.buttons) {
      if (!button.text || typeof button.text !== "string") {
        return `Invalid button: ${JSON.stringify(button)}`;
      }
    }

    return null; // No errors
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setJsonText(newText);

    try {
      const parsedJson = JSON.parse(newText);
      const validationError = validateJsonStructure(parsedJson);
      if (validationError) {
        setJsonError(validationError);
      } else {
        setJsonError(null);
      }
      setIsEdited(newText !== JSON.stringify(state.fields, null, 2));
    } catch {
      setJsonError("Invalid JSON format");
      setIsEdited(true);
    }
  };

  const applyChanges = () => {
    try {
      const newConfig = JSON.parse(jsonText);
      const validationError = validateJsonStructure(newConfig);
      if (validationError) {
        setJsonError(validationError);
        return;
      }

      dispatch({ type: "UPDATE_FORM", formConfig: newConfig });
      setIsEdited(false);
      setJsonError(null);
    } catch (error) {
      setJsonError("Invalid JSON format: " + error);
    }
  };

  return (
    <div className={styles.configContainer}>
      <h2 className={styles.heading}>Form Configuration</h2>
      <textarea
        value={jsonText}
        onChange={handleJsonChange}
        rows={10}
        cols={50}
        className={styles.textarea}
      />
      {jsonError && <p className={styles.errorText}>{jsonError}</p>}
      <button
        onClick={applyChanges}
        disabled={!isEdited || jsonError !== null}
        className={`${styles.applyButton} ${
          !isEdited || jsonError ? styles.disabledButton : ""
        }`}
      >
        Apply
      </button>
    </div>
  );
};

export default ConfigTab;
