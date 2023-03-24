/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import store from '@src/store';
import { render } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

export const renderWithStore = (ui: JSX.Element, options?: Parameters<typeof render>[1]) => ({
  ...render(<Provider store={store}>{ui}</Provider>, options),
  store,
});

export const renderWithRouter = (ui: JSX.Element, options?: Parameters<typeof render>[1]) =>
  render(ui, { ...options, wrapper: MemoryRouterProvider });

export const renderWithRouterAndStore = (
  ui: JSX.Element,
  options: Parameters<typeof render>[1] = {},
) => renderWithStore(ui, { ...options, wrapper: MemoryRouterProvider });
