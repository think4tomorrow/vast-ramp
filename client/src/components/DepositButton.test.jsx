import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DepositButton from "./DepositButton";
import { UserContext } from "../context/UserContext";

describe("DepositButton", () => {
  const user = {
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    email: "user@example.com",
  };

  const noWalletUser = {
    walletAddress: "",
    email: "user@example.com",
  };

  beforeEach(() => {
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders deposit button", () => {
    render(
      <UserContext.Provider value={{ user }}>
        <DepositButton />
      </UserContext.Provider>
    );
    expect(screen.getByText("Deposit with Ramp")).toBeInTheDocument();
  });

  it("disables button if no wallet address", () => {
    render(
      <UserContext.Provider value={{ user: noWalletUser }}>
        <DepositButton />
      </UserContext.Provider>
    );
    const button = screen.getByText("Deposit with Ramp");
    expect(button).toBeDisabled();
  });

  it("shows alert when clicking disabled button", () => {
    render(
      <UserContext.Provider value={{ user: noWalletUser }}>
        <DepositButton />
      </UserContext.Provider>
    );
    const button = screen.getByText("Deposit with Ramp");
    fireEvent.click(button);
    expect(window.alert).not.toHaveBeenCalled();
  });
}); 