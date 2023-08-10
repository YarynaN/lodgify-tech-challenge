import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ExpandableList } from './ExpandableList';
import { mockItems, mockItems423 } from '../../fixtures/context';

const regularIcon = 'LiaClipboardListSolid';
const checkedIcon = 'LiaClipboardCheckSolid';
const angleIcon = 'LiaAngleDownSolid';
const textSelector = 'Group 1';
const showLabel = 'Show';
const hideLabel = 'Hide';
jest.mock('../ItemWithCheckbox/ItemWithCheckBox', () => ({
	ItemWithCheckBox: () => <div data-testid={'ItemWithCheckBox'}></div>,
}));
jest.mock('react-icons/lia', () => ({
	LiaClipboardListSolid: () => <div data-testid={regularIcon}></div>,
	LiaClipboardCheckSolid: () => <div data-testid={checkedIcon}></div>,
	LiaAngleDownSolid: () => <div data-testid={angleIcon}></div>,
}));

const updateTaskMock = jest.fn();
const isGroupDoneMock = jest.fn().mockReturnValue(false);

describe('ExpandableList', () => {
	test('it should render component with correct structure and icon and all subtasks', () => {
		render(
			<ExpandableList
				group={mockItems[0]}
				isGroupDone={isGroupDoneMock}
				updateTask={updateTaskMock}
			/>
		);
		const children = screen.getAllByTestId('ItemWithCheckBox');
		expect(children).toHaveLength(1);
		expect(screen.getByText(textSelector)).toBeInTheDocument();
		expect(screen.getByText(showLabel)).toBeInTheDocument();
		expect(screen.getByTestId(regularIcon)).toBeInTheDocument();
		expect(screen.getByTestId(angleIcon)).toBeInTheDocument();
	});
	test('it should render component with correct check icon if all group tasks are checked', () => {
		render(
			<ExpandableList
				group={mockItems[0]}
				isGroupDone={jest.fn().mockImplementation(() => true)}
				updateTask={updateTaskMock}
			/>
		);
		expect(screen.getByText(textSelector)).toBeInTheDocument();
		expect(screen.getByTestId(checkedIcon)).toBeInTheDocument();
	});
	test('it should change label from Show to Hide on click', () => {
		render(
			<ExpandableList
				group={mockItems423[0]}
				isGroupDone={isGroupDoneMock}
				updateTask={updateTaskMock}
			/>
		);
		expect(screen.getByText(showLabel)).toBeInTheDocument();
		const headerSelector = screen.getByText(textSelector);
		fireEvent.click(headerSelector);
		expect(screen.getByText(hideLabel)).toBeInTheDocument();
	});
});
