// import { render, screen, fireEvent } from "@testing-library/react";
// import Home from "../pages/index";
// import { SessionProvider } from "next-auth/react";

// jest.mock("next/router", () => ({
//   useRouter() {},
// }));

// jest.mock("next-auth/react", () => {
//   const originalModule = jest.requireActual('next-auth/react')w;
//   const mockSession = {
//     expires: new Date(Date.now() + 2 * 86400).toISOString(),
//     user: { username: "admin" }
//   };
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return {data: mockSession, status: 'unauthenticated'}  // return type is [] in v3 but changed to {} in v4
//     }),
//   };
// });

// jest.mock("react-i18next", () => ({
//   useTranslation: () => {
//     return {
//       t: (str: string) => str,
//       i18n: {
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
// }));

// describe("Home", () => {
//   test("renders 2 texts when users have not logged in yet", () => {
//     render(<Home />);
//     expect(screen.getByTestId("description1")).toHaveTextContent(
//       "Home.Description1"
//     );
//     expect(screen.getByTestId("description2")).toHaveTextContent(
//       "Home.Description2"
//     );
//   });
// });
