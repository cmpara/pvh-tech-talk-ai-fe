import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders app", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Start recording/i);
  expect(buttonElement).toBeInTheDocument();
});
