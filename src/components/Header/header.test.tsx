import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '@src/utils/test-utils';
import '@testing-library/jest-dom';
import useQueryString from '@src/hooks/useQueryString';
import Header from './Header';

jest.mock('@src/hooks/useQueryString');

const mockedSetQueryParams = jest.spyOn({ useQueryString }, 'useQueryString');

describe('Header', () => {
  test('should render a search panel', async () => {
    const { container } = renderWithRouter(<Header query="" />);
    expect(container).toMatchSnapshot();
  });

  test('changes a query parameter when the search button is clicked', async () => {
    const setQueryParams = jest.fn();
    mockedSetQueryParams.mockReturnValue(setQueryParams);

    renderWithRouter(<Header query="" />);

    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'matrix' },
    });

    expect(screen.getByRole('textbox')).toHaveValue('matrix');
    expect(setQueryParams).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(setQueryParams).toHaveBeenCalledWith('query', 'matrix');
  });
});
