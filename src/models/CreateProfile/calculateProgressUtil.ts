import { Group } from './GroupedTasks';

const getTotalTasksValue = (groups: Group[]): number =>
	groups.reduce((acc, curr) => {
		acc += curr.tasks.reduce((sub, task) => sub + task.value, 0);
		return acc;
	}, 0);

export const getCurrentProgress = (groups: Group[]): number => {
	const doneValue = groups.reduce((acc, curr) => {
		acc += curr.tasks.reduce(
			(sub, task) => (task.checked ? sub + task.value : sub),
			0
		);
		return acc;
	}, 0);
	const totalValue = getTotalTasksValue(groups);
	return (doneValue * 100) / totalValue;
};
