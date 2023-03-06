import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Home from "../pages/index";

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

describe("Home Component", () => {
  test("renders 2 labels, 1 button and 2 texts when a user is authenticated and has already set their preference", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
        },
      },
      status: "authenticated",
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            language: "ja",
            base: "rate_aud",
            converted: "rate_jpy",
            exchangeRate: 92.1,
            fetchedDatetime: "2023-03-01 10:00:00 JST",
          }),
      })
    ) as jest.Mock;

    render(<Home />);
    expect(screen.getByText("Home.Title2")).toBeInTheDocument();
    expect(screen.getByText("Home.Datetime")).toBeInTheDocument();
    expect(screen.getByText("Home.Label1")).toBeInTheDocument();
    expect(screen.getByText("Home.Label2")).toBeInTheDocument();
    expect(screen.getByText("Home.Button")).toBeInTheDocument();
    expect(screen.getByText("Home.Description3")).toBeInTheDocument();
    expect(screen.getByText("Home.Description4")).toBeInTheDocument();
  });

  test("renders 6 texts when a user is authenticated and has set their preference yet", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
        },
      },
      status: "authenticated",
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            language: null,
            base: null,
            converted: null,
            fetchedDatetime: null,
          }),
      })
    ) as jest.Mock;

    render(<Home />);
    expect(screen.getByText("Home.Title1")).toBeInTheDocument();
    expect(screen.getByText("Home.Label1")).toBeInTheDocument();
    expect(screen.getByText("Home.Label2")).toBeInTheDocument();
    expect(screen.getByText("Home.Button")).toBeInTheDocument();
    expect(screen.getByText("Home.Description3")).toBeInTheDocument();
    expect(screen.getByText("Home.Description4")).toBeInTheDocument();
  });

  test("renders 2 texts when a user is unauthenticated", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Home />);
    expect(screen.getByText("Home.Description1")).toBeInTheDocument();
    expect(screen.getByText("Home.Description2")).toBeInTheDocument();
  });
});
