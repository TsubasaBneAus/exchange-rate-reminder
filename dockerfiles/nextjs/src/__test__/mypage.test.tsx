import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import MyPage from "../pages/mypage";

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

describe("MyPage Component", () => {
  test("renders 1 text and 1 button when a user is authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
        },
      },
      status: "authenticated",
    });

    render(<MyPage />);
    expect(screen.getByText("MyPage.Title")).toBeInTheDocument();
    expect(screen.getByText("MyPage.Button")).toBeInTheDocument();
  });

  test("renders nothing when a user is unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<MyPage />);
    expect(screen.queryByText("MyPage.Title")).not.toBeInTheDocument();
    expect(screen.queryByText("MyPage.Button")).not.toBeInTheDocument();
  });
});
