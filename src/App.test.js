import { render, screen } from '@testing-library/react';
import App from './App';
import User from './Components/User';
import axios from 'axios';

// Mock axios to prevent actual HTTP requests during tests
jest.mock('axios');

test('renders User component inside App', () => {
  render(<App />);
  
  // Check if the User component is rendered
  // You can check for a text inside User or a role if defined
  const userElement = screen.getByText(/users/i); // change this based on what User renders
  expect(userElement).toBeInTheDocument();
});
