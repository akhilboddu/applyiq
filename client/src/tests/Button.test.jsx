import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/ui/Button";

it("does not fire onClick when disabled", async () => {
  const handleClick = vi.fn();
  render(
    <Button disabled onClick={handleClick}>
      Submit
    </Button>,
  );

  await userEvent.click(screen.getByRole("button"));

  expect(handleClick).not.toHaveBeenCalled();
});
