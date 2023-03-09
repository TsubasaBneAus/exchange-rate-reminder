import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer component", () => {
  test("renders 1 text", () => {
    render(<Footer />);
    expect(screen.getByText("© 2023 Tsubasa Endo")).toBeInTheDocument();
  });
});
