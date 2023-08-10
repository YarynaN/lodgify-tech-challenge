import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskProgressWidget from './TaskProgressWidget';
import { mockItems423 } from '../../fixtures/context';
import { TasksContextType } from '../../context/ProfileCreationProgressContext/ProfileCreationProgressProvider';

const textSelector = /Lodgify grouped task/i;
const linearProgressComponent = 'linearProgress';
const expendableListComponent = 'expandableList';
jest.mock('../../components', () => ({
	LinearProgress: () => <div data-testid={linearProgressComponent}></div>,
	ExpandableList: () => <div data-testid={expendableListComponent}></div>,
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('../../context', () => ({
	...jest.requireActual('../../context'),
	useProgressContext: () =>
		({
			items: mockItems423,
			isLoading: false,
			isGroupDone: jest.fn(),
			updateTask: jest.fn(),
			calculateProgress: jest.fn(),
			progress: 0,
			fetchGroupedTasks: jest.fn(),
		} as unknown as TasksContextType),
}));
describe('TaskProgressWidget', () => {
	test('it should render component with correct structure', () => {
		render(<TaskProgressWidget />);
		expect(screen.getByText(textSelector)).toBeInTheDocument();
		expect(screen.getByTestId(linearProgressComponent)).toBeInTheDocument();
		expect(screen.getAllByTestId(expendableListComponent)).toHaveLength(2);
	});
});
