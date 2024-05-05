import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NameTxt from './NameTxt';

describe('NameTxt Component', () => {
  test('renders name text correctly', () => {
    const nameTxt = 'John Doe';
    render(<NameTxt nameId={1} nameTxt={nameTxt} />);
    expect(screen.getByText(nameTxt)).toBeInTheDocument();
  });

  test('double-clicking triggers editing mode', () => {
    const nameTxt = 'John Doe';
    render(<NameTxt nameId={1} nameTxt={nameTxt} />);
    const nameElement = screen.getByText(nameTxt);
    fireEvent.doubleClick(nameElement);
    expect(screen.getByDisplayValue(nameTxt)).toBeInTheDocument();
  });

  test('hovering over triggers delete icon', async () => {
    const nameTxt = 'John Doe';
    render(<NameTxt nameId={1} nameTxt={nameTxt} deleteEvent={jest.fn()} />);
    const nameElement = screen.getByText(nameTxt);
    fireEvent.mouseEnter(nameElement);
    await waitFor(() => {
        expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
    });
  });

  test('clicking delete icon calls deleteEvent', async () => {
    const nameTxt = 'John Doe';
    const deleteEventMock = jest.fn();
    render(<NameTxt nameId={1} nameTxt={nameTxt} deleteEvent={deleteEventMock} />);
    const nameElement = screen.getByText(nameTxt);
    fireEvent.mouseEnter(nameElement);
    const deleteIcon = await screen.findByTestId('delete-icon');
    fireEvent.click(deleteIcon);
    expect(deleteEventMock).toHaveBeenCalled();
  });
});
