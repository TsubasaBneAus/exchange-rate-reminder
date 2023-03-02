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
// jest.mock("next-auth/react", () => {
//   const originalModule = jest.requireActual("next-auth/react");
//   const mockSession = {
//     expires: new Date(Date.now() + 2 * 86400).toISOString(),
//     user: { username: "admin" },
//   };
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: mockSession, status: "authenticated" };
//     }),
//   };
// });
// jest.mock("next-auth/react", () => {
//   const originalModule = jest.requireActual("next-auth/react");
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: {}, status: "unauthenticated" };
//     }),
//   };
// });

describe("Header Component", () => {
  test("renders 3 list items when there is session", async () => {
    render(<Header />);
    expect(screen.getByText("Header.MyPage")).toBeInTheDocument();
    expect(screen.getByText("Header.Contact")).toBeInTheDocument();
    expect(screen.getByText("Header.SignOut")).toBeInTheDocument();
  });
});

describe("Header Component", () => {
  test("renders 2 list items when there is no session", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
      status: "unauthenticated",
    });
    render(<Header />);
    expect(screen.getByText("Header.SignIn")).toBeInTheDocument();
    expect(screen.getByText("Header.Contact")).toBeInTheDocument();
  });
});
