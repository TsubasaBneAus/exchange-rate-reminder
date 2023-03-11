import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

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

describe("Layout Component", () => {
  test("renders Header, main, Footer components and their wrapped div tag when a user is authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
        },
      },
      status: "authenticated",
    });

    render(<Layout children />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  })

  test("renders Header, main, Footer components and their wrapped div tag when a user is unauthenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Layout children />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
})