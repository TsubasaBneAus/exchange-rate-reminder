import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Contact from "../pages/contact";

describe("Header Component", () => {
  test("renders 3 list items when a user is authenticated", () => {
    
  });

  test("renders 2 list items when a user is unauthenticated", () => {

  });
});
