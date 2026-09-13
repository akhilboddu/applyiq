import { render, screen } from "@testing-library/react";
import Badge from "../components/ui/Badge";

it("applies the green class for an Offer status", () => {
  render(<Badge status="Offer" />);
  expect(screen.getByText("Offer").className).toContain("green");
});
