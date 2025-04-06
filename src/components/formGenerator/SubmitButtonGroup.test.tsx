import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SubmitButtonGroup from "./SubmitButtonGroup";

describe("SubmitButtonGroup", () => {
  const mockOnSubmit = jest.fn();
  const buttons = [{ text: "Submit" }, { text: "Cancel" }];

  it("renders all buttons", () => {
    render(<SubmitButtonGroup buttons={buttons} onSubmit={mockOnSubmit} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onSubmit when clicked", () => {
    render(<SubmitButtonGroup buttons={buttons} onSubmit={mockOnSubmit} />);
    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
