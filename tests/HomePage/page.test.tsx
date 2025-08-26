import {render, screen} from '@testing-library/react';
import HomePageRoute from 'HomePage/page';
import { describe, test, expect, vi } from 'vitest';
import React from 'react';

vi.mock('../../app/HomePage/Homepage', () => ({
  default: () => <div>Mocked Homepage</div>
})); 

describe('HomePageRoute component', () => {
  test('renders Homepage inside', () => {
    render(<HomePageRoute />);

    expect(screen.getByText('Mocked Homepage')).toBeInTheDocument();
  });
});