import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@/app/auth/login/page";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Login />);

    const docH = screen.getByRole("heading", {
      name: "Big goals, boring tasks - we got you!",
    });

    expect(docH).toBeInTheDocument();
  });
});
