import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import userEvent from "@testing-library/user-event";
import LanguageMenu from "../components/LanguageMenu";

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

describe("LanguageMenu Component", () => {
  test("renders 2 list items when a user is authenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
        },
      },
      status: "authenticated",
    });

    render(<LanguageMenu />);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("日本語")).toBeInTheDocument();
    });
  });

  test("renders 2 list items when a user is unauthenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<LanguageMenu />);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("日本語")).toBeInTheDocument();
    });
  });
});
