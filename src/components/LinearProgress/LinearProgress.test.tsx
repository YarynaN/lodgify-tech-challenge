import React from 'react';
import { render, screen } from '@testing-library/react';
import { LinearProgress } from './LinearProgress';

const testId = 'progressBar';

describe('LinearProgress', () => {
	test('it should render component and show progress percentage', () => {
		const progress = 40;
		const percentage = `${progress}%`;
		render(<LinearProgress completed={progress} />);
		expect(screen.getByText(percentage)).toBeInTheDocument();
	});
	test('it should set style width according to progress', () => {
		const progress = 40;
		const percentage = `${progress}%`;
		render(<LinearProgress completed={progress} />);
		const bar = screen.getByTestId(testId);
		expect(bar).toBeInTheDocument();
		expect(bar).toHaveStyle({ width: percentage });
	});
});
