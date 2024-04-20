import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/auth/auth1/login/page";

describe("Home", () => {
  it("renders the component", () => {
    render(<Login />);

    expect(screen.getByText("Welcome to eLab Suite")).toBeInTheDocument(); // Replace 'Your Text Here' with actual text or elements to check
  });
});
