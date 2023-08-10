import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const widgetPage = 'ProfileCreationProgressPage';
const inProgressPage = 'InProgressPage';

jest.mock('./pages/TaskProgressWidget/TaskProgressWidget', () => {
	const mockedWidget = () => <div data-testid={widgetPage}></div>;
	return mockedWidget;
});
jest.mock('./pages/PageInProgress/PageInProgress', () => {
	const mockedComponent = () => <div data-testid={inProgressPage}></div>;
	return mockedComponent;
});

describe('App', () => {
	test('it should render base path', () => {
		window.history.pushState({}, 'Test', '/');
		render(<App />);
		const linkElement = screen.getByTestId(widgetPage);
		expect(linkElement).toBeInTheDocument();
	});
	test('it should render 404 route', () => {
		window.history.pushState({}, 'Test', '/404');
		render(<App />);
		const linkElement = screen.getByTestId(inProgressPage);
		expect(linkElement).toBeInTheDocument();
	});
});
