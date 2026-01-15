import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('searches and displays city results', async () => {

  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  //Check if header exists
  expect(screen.getByText(/Zambia Geo Explorer/i)).toBeInTheDocument();

  // Type "Kitwe" into search
  const input = screen.getByPlaceholderText(/Search for a city/i);
  await user.type(input, 'Kitwe');

  // Click search button
  const button = screen.getByRole('button', { name: /search/i });
  await user.click(button);

  // Wait for and verify result appears
  await screen.findByText('Kitwe');

  expect(screen.getByText((content, element) => {
    const hasText = (node) => node.textContent.includes('522,000');
    const nodeHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  })).toBeInTheDocument();

  expect(screen.getByText((content, element) => {
    const hasText = (node) => node.textContent.includes('Copperbelt');
    const nodeHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  })).toBeInTheDocument();

  expect(screen.getByText((content, element) => {
    const hasText = (node) => node.textContent.includes('Provincial Capital:') && node.textContent.includes('No');
    const nodeHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  })).toBeInTheDocument();
}, 15000);


test('shows loading state while fetching', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText(/Search for a city/i);
  const button = screen.getByRole('button', { name: /search/i });

  fireEvent.change(input, { target: { value: 'Kitwe' } });
  fireEvent.click(button);

  expect(screen.getByText(/Fetching Zambian data/i)).toBeInTheDocument();
}, 10000);

