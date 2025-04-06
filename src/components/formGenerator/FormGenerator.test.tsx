import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormGenerator from "./FormGenerator";
import { useFormState } from "../../hooks/useFormState";
import { InputTypeEnum } from "../../types/FormConfig";

jest.mock("../../hooks/useFormState");

describe("FormGenerator", () => {
  const mockDispatch = jest.fn();

  const mockFormState = {
    state: {
      fields: {
        title: "Test Form",
        inputs: [
          {
            name: "testField",
            label: "Test Field",
            type: InputTypeEnum.STRING,
            validation: { required: true },
          },
        ],
        buttons: [{ text: "Submit" }],
      },
      formValues: {},
      errors: {},
    },
    dispatch: mockDispatch,
  };

  beforeEach(() => {
    (useFormState as jest.Mock).mockReturnValue(mockFormState);
  });

  it("renders form title correctly", () => {
    render(<FormGenerator formState={mockFormState} />);
    expect(screen.getByText("Test Form")).toBeInTheDocument();
  });

  it("renders input field correctly", () => {
    render(<FormGenerator formState={mockFormState} />);
    expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(<FormGenerator formState={mockFormState} />);
    const input = screen.getByLabelText("Test Field");

    fireEvent.change(input, { target: { value: "test value" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_FIELD",
      name: "testField",
      value: "test value",
    });
  });

  it("shows validation error for required field", () => {
    const stateWithError = {
      ...mockFormState,
      state: {
        ...mockFormState.state,
        errors: { testField: "This field is required" },
      },
    };

    render(<FormGenerator formState={stateWithError} />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
