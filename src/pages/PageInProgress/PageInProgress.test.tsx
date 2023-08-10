import React from 'react';
import { render, screen } from '@testing-library/react';
import PageInProgress from './PageInProgress';

const imageSelector = /we are in progress/i;
const textSelector =
	/We are in progress yet. Please, be patient and wait for our updates./i;
const imageSRC =
	'https://i.pinimg.com/originals/97/e9/42/97e942ce7fc4e9d4ea6d844a382f251f.gif';

describe('PageInProgress', () => {
	test('it should render component with correct structure', () => {
		render(<PageInProgress />);
		const image = screen.getByAltText(imageSelector);
		expect(screen.getByText(textSelector)).toBeInTheDocument();
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', imageSRC);
	});
});
