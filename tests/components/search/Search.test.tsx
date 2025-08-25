import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Search from '@components/search/Search';

describe('Search', () => {
    test('renders input with proper attributes',() => {
        const handleChange = vi.fn();
    render(<Search value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: /search books/i });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Search books...');
    });

     test('displays passed value', () => {
    const handleChange = vi.fn();
    render(<Search value="React" onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: /search books/i });
    expect(input).toHaveValue('React');
  });

  test('calls onChange with new value in input', () => {
    const handleChange = vi.fn();
    render(<Search value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox', { name: /search books/i });
    fireEvent.change(input, { target: { value: 'JavaScript' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('JavaScript');
  });
})