
import axios from "axios";
jest.mock("axios", () => ({
  get: jest.fn(),
  post:jest.fn(),
}));

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import User from './User';
describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading and form", () => {
    render(<User />);
    expect(screen.getByText(/User Registration/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  test("fetches and displays users list", async () => {
    // Mock API response
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "12345" },
      ],
    });

    render(<User />);

    // Wait until user appears
    const user = await screen.findByText(/John Doe/i);
    expect(user).toBeInTheDocument();
  });

  test("adds a new user on form submit", async () => {
    // Mock GET (initial load)
    axios.get.mockResolvedValueOnce({ data: [] });

    // Mock POST request
    axios.post.mockResolvedValueOnce({});

    // After adding, mock GET again to refresh users
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          phone: "98765",
        },
      ],
    });

    render(<User />);

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "98765" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Add User"));

    // Wait for updated user list
    const user = await screen.findByText("Alice");
    expect(user).toBeInTheDocument();

    // Ensure API calls happened
    expect(axios.post).toHaveBeenCalledWith("http://localhost:8090/users", {
      name: "Alice",
      email: "alice@example.com",
      phone: "98765",
    });
  });

  test("shows alert if fields are empty", () => {
    // Mock GET for initial fetch
    axios.get.mockResolvedValueOnce({ data: [] });

    // Mock alert
    window.alert = jest.fn();

    render(<User />);

    fireEvent.click(screen.getByText("Add User"));
    expect(window.alert).toHaveBeenCalledWith("Please fill all fields");
  });
});
