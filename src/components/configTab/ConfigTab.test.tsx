import { render, screen, fireEvent } from "@testing-library/react";
import ConfigTab from "./ConfigTab";
import { useFormState } from "../../hooks/useFormState";
import { describe, jest } from "@jest/globals";

jest.mock("../../hooks/useFormState");

describe("ConfigTab", () => {
  const mockDispatch = jest.fn();
  const mockFormState = {
    state: {
      fields: {
        title: "Test Form",
        inputs: [],
        buttons: [],
      },
      formValues: {},
      errors: {},
    },
    dispatch: mockDispatch,
  };

  beforeEach(() => {
    (useFormState as jest.Mock).mockReturnValue(mockFormState);
  });

  it("renders textarea with initial JSON", () => {
    render(<ConfigTab formState={mockFormState} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue(
      JSON.stringify(mockFormState.state.fields, null, 2)
    );
  });

  it("validates JSON structure", () => {
    render(<ConfigTab formState={mockFormState} />);
    const textarea = screen.getByRole("textbox");
    const invalidJson = '{ "title": "Test" }'; // Missing required fields

    fireEvent.change(textarea, { target: { value: invalidJson } });

    expect(screen.getByText(/inputs.*should be an array/i)).toBeInTheDocument();
  });

  it("applies valid JSON changes", () => {
    render(<ConfigTab formState={mockFormState} />);
    const textarea = screen.getByRole("textbox");
    const validJson = JSON.stringify({
      title: "New Form",
      inputs: [],
      buttons: [],
    });

    fireEvent.change(textarea, { target: { value: validJson } });
    fireEvent.click(screen.getByText("Apply"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_FORM",
      formConfig: JSON.parse(validJson),
    });
  });
});
