import { render, screen } from "@testing-library/react";
import CreateCustomerForm from "../components/CreateCustomerForm";

test("renders Add Customer button", () => {
  render(<CreateCustomerForm onCustomerAdded={() => {}} />);
  const button = screen.getByText("+ Add Customer");
  expect(button).toBeInTheDocument();
});
