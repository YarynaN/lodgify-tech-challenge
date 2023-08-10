import React from 'react';
import { render, renderHook } from '@testing-library/react';
import {
	defaultContext,
	ProfileCreationProgressContextProvider,
	ProgressContextObject,
	useProgressContext,
} from './ProfileCreationProgressProvider';

describe('ProfileCreationProgressContextProvider', () => {
	test('it should return defaultContext', () => {
		render(
			<ProfileCreationProgressContextProvider context={ProgressContextObject} />
		);
		const {
			result: { current },
		} = renderHook(useProgressContext);
		expect(current).toMatchObject(defaultContext);
	});
});
