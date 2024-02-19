import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders Face mask App", () => {
  render(<App />);
  const titleElement = screen.getByText(/Face mask App/i);
  expect(titleElement).toBeInTheDocument();
});
