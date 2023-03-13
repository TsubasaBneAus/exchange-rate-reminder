import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Header from "../components/Header";

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

jest.mock("next-auth/react");

describe("Header Component", () => {
  test("renders 3 list items when a user is authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
        },
      },
      status: "authenticated",
    });

    render(<Header />);
    expect(screen.getByText("Exchange Rate Reminder")).toBeInTheDocument();
    expect(screen.getByText("Header.MyPage")).toBeInTheDocument();
    expect(screen.getByText("Header.Contact")).toBeInTheDocument();
    expect(screen.getByText("Header.SignOut")).toBeInTheDocument();
  });

  test("renders 2 list items when a user is unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Header />);
    expect(screen.getByText("Exchange Rate Reminder")).toBeInTheDocument();
    expect(screen.getByText("Header.SignIn")).toBeInTheDocument();
    expect(screen.getByText("Header.Contact")).toBeInTheDocument();
  });
});
