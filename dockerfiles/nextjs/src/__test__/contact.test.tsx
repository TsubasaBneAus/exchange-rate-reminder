import { render, screen } from "@testing-library/react";
import Contact from "../pages/contact";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      basePath: "/",
      isLocaleDomain: true,
      isReady: true,
      push: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
      isPreview: false,
    };
  },
}));

describe("Header Component", () => {
  test("renders 4 texts, 3 placeholders and 1 button", () => {
    render(<Contact />);
    expect(screen.getByText("Contact.Title")).toBeInTheDocument();
    expect(screen.getByText("Contact.Label1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contact.Placeholder1")).toBeInTheDocument();
    expect(screen.getByText("Contact.Label2")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contact.Placeholder2")).toBeInTheDocument();
    expect(screen.getByText("Contact.Label3")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contact.Placeholder3")).toBeInTheDocument();
    expect(screen.getByText("Contact.Button")).toBeInTheDocument();
  });

  test("renders 2 list items when a user is unauthenticated", () => {});
});
