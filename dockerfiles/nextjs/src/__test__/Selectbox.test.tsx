import { render, screen } from "@testing-library/react";
import React, { useState as useStateMock } from "react";
import Selectbox from "../components/Selectbox";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Selectbox Component", () => {
  test("renders 1 select box", async () => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, jest.fn()]);
    const [base, setBase] = useStateMock<string | null>(null);

    render(<Selectbox setCurrency={setBase} />);
    expect(screen.getByText("Selectbox.Placeholder")).toBeInTheDocument();
  });
});
