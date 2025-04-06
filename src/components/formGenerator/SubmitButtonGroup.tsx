import React from "react";
import styles from "./FormGenerator.module.css";
import { ButtonConfig } from "../../types/FormConfig";

interface SubmitButtonGroupProps {
  buttons: ButtonConfig[];
  onSubmit: (e: React.FormEvent) => void;
}

const SubmitButtonGroup: React.FC<SubmitButtonGroupProps> = ({
  buttons,
  onSubmit,
}) => {
  return (
    <div className={styles.buttonGroup}>
      {buttons.map((btn, index) => (
        <button
          key={index}
          type="submit"
          className={styles.submitButton}
          onClick={onSubmit}
        >
          {btn.text}
        </button>
      ))}
    </div>
  );
};

export default SubmitButtonGroup;
