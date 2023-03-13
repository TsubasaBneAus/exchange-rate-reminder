import { render, screen, waitFor } from "@testing-library/react";
import React, { useState as useStateMock } from "react";
import Modal from "../components/Modal";

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

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("Modal Component", () => {
  test("renders 1 text and 1 button", async () => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, jest.fn()]);
    const [modal, setModal] = useStateMock<boolean>(true);
    const [modalType, setModalType] = useStateMock<string>("Home");

    const mockModalType = null;
    const mockModalText = {
      text: "Modal.Text1",
      button1: "Modal.Button1",
      button2: null,
    };
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [mockModalType, () => null])
      .mockImplementationOnce(() => [mockModalText, () => null]);

    render(<Modal modal={modal} setModal={setModal} modalType={modalType} />);
    await waitFor(() => {
      expect(screen.getByText("Modal.Text1")).toBeInTheDocument();
      expect(screen.getByText("Modal.Button1")).toBeInTheDocument();
    });
  });

  test("renders 1 text and 2 buttons", async () => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, jest.fn()]);
    const [modal, setModal] = useStateMock<boolean>(true);
    const [modalType, setModalType] = useStateMock<string>("Home");

    const mockModalType = null;
    const mockModalText = {
      text: "Modal.Text5",
      button1: "Modal.Button3",
      button2: "Modal.Button4",
    };
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [mockModalType, () => null])
      .mockImplementationOnce(() => [mockModalText, () => null]);

    render(<Modal modal={modal} setModal={setModal} modalType={modalType} />);
    await waitFor(() => {
      expect(screen.getByText("Modal.Text5")).toBeInTheDocument();
      expect(screen.getByText("Modal.Button3")).toBeInTheDocument();
      expect(screen.getByText("Modal.Button4")).toBeInTheDocument();
    });
  });
});
