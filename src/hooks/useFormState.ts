import { useReducer } from "react";
import { FormConfig, InputTypeEnum } from "../types/FormConfig";

export interface FormState {
  fields: FormConfig;
  formValues: Record<string, string | number | boolean | Date | null>; // Tracks user input
  errors: Record<string, string>; // Tracks validation errors
}

interface UpdateFieldAction {
  type: "UPDATE_FIELD";
  name: string;
  value: string | number | boolean | Date | null;
}

interface SetErrorAction {
  type: "SET_ERROR";
  name: string;
  error: string;
}

interface UpdateFormAction {
  type: "UPDATE_FORM";
  formConfig: FormConfig;
}

type FormAction = UpdateFieldAction | SetErrorAction | UpdateFormAction;

const initialFields: FormConfig = {
  title: "My Dynamic Form",
  inputs: [
    {
      name: "age",
      label: "Age",
      type: InputTypeEnum.NUMERIC,
      validation: { required: true, pattern: "^[1-9][0-9]?$|^100$" },
    },
    {
      name: "name",
      label: "Name",
      type: InputTypeEnum.STRING,
      validation: { required: true, pattern: "^[a-zA-Z ]{2,50}$" },
    },
    {
      name: "bio",
      label: "Biography",
      type: InputTypeEnum.MULTILINE,
      validation: { required: false, pattern: "^.{0,300}$" },
    },
    { name: "subscribe", label: "Subscribe to Newsletter", type: InputTypeEnum.BOOLEAN },
    {
      name: "birthday",
      label: "Birthday",
      type: InputTypeEnum.DATE,
      validation: { required: true },
    },
    {
      name: "gender",
      label: "Gender",
      type: InputTypeEnum.ENUM,
      options: ["Male", "Female", "Other"],
      validation: { required: true },
    },
  ],
  buttons: [{ text: "OK" }, { text: "Cancel" }, { text: "Apply" }],
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: action.value,
        },
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.name]: action.error,
        },
      };

    case "UPDATE_FORM":
      return {
        ...state,
        fields: action.formConfig,
        formValues: {}, 
        errors: {},
      };

    default:
      return state;
  }
}

export function useFormState() {
  const [state, dispatch] = useReducer(formReducer, {
    fields: initialFields,
    formValues: {},
    errors: {},
  });

  return { state, dispatch };
}
