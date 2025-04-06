import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormField from "./FormField";
import { InputTypeEnum } from "../../types/FormConfig";

describe("FormField", () => {
  const mockOnChange = jest.fn();
  const baseProps = {
    field: {
      name: "testField",
      label: "Test Field",
      type: InputTypeEnum.STRING,
      validation: { required: true },
    },
    value: "",
    onChange: mockOnChange,
  };
  it("renders string input correctly", () => {
    render(<FormField {...baseProps} />);
    expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
  });
});
