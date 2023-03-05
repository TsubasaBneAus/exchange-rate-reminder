import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { useSession } from "next-auth/react";

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
  test("renders 3 list items when a user is authenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test",
        },
      },
      status: "authenticated",
    });

    render(<Header />);
    expect(screen.getByText("Header.MyPage")).toBeInTheDocument();
    expect(screen.getByText("Header.Contact")).toBeInTheDocument();
    expect(screen.getByText("Header.SignOut")).toBeInTheDocument();
  });

  test("renders 2 list items when a user is unauthenticated", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Header />);
    expect(screen.getByText("Header.SignIn")).toBeInTheDocument();
    expect(screen.getByText("Header.Contact")).toBeInTheDocument();
  });
});
