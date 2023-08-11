import { getCurrentProgress } from './calculateProgressUtil';
import {
	mockItems423,
	mockItemsAllChecked,
	mockItemsNoneChecked,
} from '../../fixtures/context';

describe('getCurrentProgress', () => {
	test('it should calculate progress for 423 total and 36 current values', () => {
		expect(getCurrentProgress(mockItems423)).toBeCloseTo(8.51, 2);
	});
	test('it should return 0 if none checked', () => {
		expect(getCurrentProgress(mockItemsNoneChecked)).toEqual(0);
	});
	test('it should return 100 if all checked', () => {
		expect(getCurrentProgress(mockItemsAllChecked)).toEqual(100);
	});
});
