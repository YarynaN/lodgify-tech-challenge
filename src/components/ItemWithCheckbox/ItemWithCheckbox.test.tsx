import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ItemWithCheckBox } from './ItemWithCheckBox';
import { mockItems } from '../../fixtures/context';

const textSelector = 'Task 1 - 1';
const updateTaskMock = jest.fn();
const mockItem = mockItems[0].tasks[0];

describe('ItemWithCheckBox', () => {
	test('it should render component with correct structure and all subtasks', () => {
		render(<ItemWithCheckBox task={mockItem} updateTask={updateTaskMock} />);
		const checkbox = screen.getByRole('checkbox');
		expect(screen.getByText(textSelector)).toBeInTheDocument();
		expect(checkbox).toBeInTheDocument();
	});
	test('it should call a callback on item click', () => {
		render(<ItemWithCheckBox task={mockItem} updateTask={updateTaskMock} />);
		const label = screen.getByText(textSelector);
		void act(() => fireEvent.click(label));
		expect(updateTaskMock).toHaveBeenCalledTimes(1);
	});
	test('it should call a callback on click with correct params', () => {
		render(<ItemWithCheckBox task={mockItem} updateTask={updateTaskMock} />);
		const label = screen.getByText(textSelector);
		void act(() => fireEvent.click(label));
		expect(updateTaskMock).toHaveBeenCalledWith(mockItem, true);
	});
});
